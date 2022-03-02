import React from "react";
import { BrowserRouter as Router, useParams } from "react-router-dom";
import { ActorList } from "../../TableList/ActorList";
import { getRoot } from "../../API_config";
import "react-dropdown/style.css";
import { FilmContainer } from "../../FilmContainer";
import { RecordPage } from "./RecordPage";

class ActorListContainer extends React.Component {
  render() {
    return (
      <div>
        <h2>Actors:</h2>
        <div className="ActorsListForFilm">
          <ActorList film_id={this.props.film_id} />
        </div>
      </div>
    );
  }
}

class FilmPage extends RecordPage {
  constructor(props) {
    super(props);
    this.state = {
      filmInfo: null,
      title: null,
      rating: null,
    };

    this.sendRequest("get_film");

    this.handleTitleChanged = this.handleTitleChanged.bind(this);
    this.saveFilm = this.saveFilm.bind(this);
    this.handleRatingChanged = this.handleRatingChanged.bind(this);
  }

  onResponse(json) {
    console.log(json);
    this.setState({
      filmInfo: json,
      title: json[0].title,
    });
  }

  handleTitleChanged(new_title) {
    this.setState({
      filmInfo: this.state.filmInfo,
      title: new_title,
      rating: this.state.rating,
    });
  }

  handleRatingChanged(new_rating) {
    console.log("new_rating: " + new_rating);
    this.setState({
      filmInfo: this.state.filmInfo,
      title: this.state.title,
      rating: new_rating,
    });
    console.log("rating: " + this.state.rating);
  }

  saveFilm() {
    console.log(this.state.title);
    const id = this.props.id;
    const title = this.state.title;
    const rating = this.state.rating;
    fetch(
      `http://${getRoot()}/home/update_film?id=${id}&title=${title}&rating=${rating}`,
      {
        method: "PUT",
      }
    )
      .then((response) => response.text())
      .then((text) => {
        console.log(text);
        window.alert(text);
      });
  }

  getInfoContainer() {
    return (
      <FilmContainer
        filmInfo={this.state.filmInfo}
        titleHandler={this.handleTitleChanged}
        ratingHandler={this.handleRatingChanged}
      />
    );
  }

  getLinkContainer() {
    return <ActorListContainer film_id={this.state.filmInfo[0].film_id} />;
  }

  render() {
    if (this.state.filmInfo) {
      return (
        <div>
          <button className="saveChangesButton" onClick={this.saveFilm}>
            Save
          </button>
          {this.getInfoContainer()}
          {this.getLinkContainer()}
        </div>
      );
    } else {
      return <h1>Loading...</h1>;
    }
  }
}

export function Film() {
  const { id } = useParams();
  console.log({ id });
  return <FilmPage id={id} />;
}

export default Film;
