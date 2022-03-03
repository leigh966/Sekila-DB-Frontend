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

export class FilmPage extends RecordPage {
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
    this.handleRatingChangedPage = this.handleRatingChangedPage.bind(this);
    this.handleReleaseYearChanged = this.handleReleaseYearChanged.bind(this);
    this.handleLengthChanged = this.handleLengthChanged.bind(this);
    this.handleLanguageChanged = this.handleLanguageChanged.bind(this);
    this.startEditing = false;
  }

  onResponse(json) {
    console.log(json);
    this.setState({
      filmInfo: json,
      rating: json[0].rating,
      languageId: json[0].language.language_id,
    });
  }

  handleTitleChanged(new_title) {
    let newFilmInfo = this.state.filmInfo;
    newFilmInfo[0].title = new_title;
    this.setState({
      filmInfo: this.state.filmInfo,
      rating: this.state.rating,
      languageId: this.state.languageId,
    });
  }

  handleRatingChangedPage(new_rating) {
    console.log("new_rating: " + new_rating);
    this.setState({
      filmInfo: this.state.filmInfo,
      rating: new_rating,
      languageId: this.state.languageId,
    });
    console.log("rating: " + this.state.rating);
  }

  handleReleaseYearChanged(new_release_year) {
    let newFilmInfo = this.state.filmInfo;
    newFilmInfo[0].release_year = new_release_year;
    this.setState({
      filmInfo: this.state.filmInfo,
      rating: this.state.rating,
      languageId: this.state.languageId,
    });
  }

  handleLengthChanged(new_length) {
    let newFilmInfo = this.state.filmInfo;
    newFilmInfo[0].length = new_length;
    this.setState({
      filmInfo: newFilmInfo,
      rating: this.state.rating,
      languageId: this.state.languageId,
    });
  }

  handleLanguageChanged(new_language_id) {
    console.log("Language_id changed to " + new_language_id);
    this.setState({
      filmInfo: this.state.filmInfo,
      rating: this.state.rating,
      languageId: new_language_id,
    });
  }

  validateTitle(title) {
    const MAX_LENGTH = 60;
    const BLANK = title.length < 1;
    const TOO_LONG = title.length > MAX_LENGTH;
    if (BLANK) window.alert("Title cannot be blank");
    if (TOO_LONG) window.alert("Title too long!");
    if (BLANK || TOO_LONG) return false;
    return true;
  }

  validateRelease_year(release_year) {
    console.log(release_year);
    //Make sure it is a number
    const RELEASE_YEAR_STRING = release_year.toString();
    RELEASE_YEAR_STRING.split("").forEach((place) => {
      if (!"0123456789".includes(place)) {
        window.alert("Release year must be a number");
        return false;
      }
    });
    release_year = parseInt(release_year);

    // Make sure the year is reasonable
    const FIRST_EVER_FILM_RELEASE = 1888;
    const CURRENT_YEAR = new Date().getFullYear();

    const TOO_OLD = release_year < FIRST_EVER_FILM_RELEASE;
    if (TOO_OLD) {
      window.alert("No film is that old");
    }

    const IN_FUTURE = release_year > CURRENT_YEAR;
    if (IN_FUTURE) {
      window.alert("Release year cannot be in the future");
    }

    if (TOO_OLD || IN_FUTURE) return false;
    return true;
  }

  validateFilm() {
    return (
      this.validateTitle(this.state.filmInfo[0].title) &&
      this.validateRelease_year(this.state.filmInfo[0].release_year)
    );
  }

  saveFilm() {
    if (!this.validateFilm()) return;
    console.log(this.state.release_year);
    const id = this.props.id;
    const title = this.state.filmInfo[0].title;
    const rating = this.state.rating;
    const release_year = this.state.filmInfo[0].release_year;
    const length = this.state.filmInfo[0].length;
    const languageId = this.state.languageId;
    fetch(
      `http://${getRoot()}/home/update_film?id=${id}` +
        `&title=${title}&rating=${rating}` +
        `&release_year=${release_year}&length=${length}` +
        `&language_id=${languageId}`,
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
        ratingHandler={this.handleRatingChangedPage}
        releaseYearHandler={this.handleReleaseYearChanged}
        lengthHandler={this.handleLengthChanged}
        languageHandler={this.handleLanguageChanged}
        startEditing={this.startEditing}
      />
    );
  }

  getListContainer() {
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
          {this.getListContainer()}
        </div>
      );
    }
    if (this.state.errorMessage) return <h1>{this.state.errorMessage}</h1>;
    return <h1>Loading...</h1>;
  }
}

function onDelete(id) {
  fetch(`http://${getRoot()}/home/delete_film?id=${id.toString()}`, {
    method: "DELETE",
  })
    .then((response) => response.text())
    .then((text) => {
      console.log(text);
      window.alert(text);
      window.location.assign(
        `http://${window.location.hostname}:${window.location.port}/films`
      );
    });
}

export function Film() {
  const { id } = useParams();
  console.log({ id });
  return (
    <>
      <button onClick={() => onDelete(id)}>Delete</button>
      <FilmPage id={id} />
    </>
  );
}

export default Film;
