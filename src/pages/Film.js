import React from "react";
import { BrowserRouter as Router, useParams } from "react-router-dom";
import { EditableField } from "../EditableField";
import { ActorList } from "../TableList/ActorList";
import { getRoot } from "../API_config";

class FilmContainerHead extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="FilmContainerHead">
        <h1>
          <EditableField
            label=""
            field={this.props.title}
            handler={this.props.titleHandler}
          />
        </h1>
        <h1>
          <EditableField label="" field={this.props.rating} />
        </h1>
      </div>
    );
  }
}

class FilmContainerBody extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="FilmContainerBody">
        <h3>
          <EditableField
            label="Release Year: "
            field={this.props.releaseYear}
          />
        </h3>
        <h3>
          <EditableField label={"Language: "} field={this.props.language} />
        </h3>
        <h3>
          <EditableField label={"Length: "} field={this.props.length} />
        </h3>
        <br />
        <h3>
          <EditableField
            label="Description: "
            field={<p>{this.props.description}</p>}
          />
        </h3>
      </div>
    );
  }
}

class FilmContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log("filmInfo.title: " + this.props.filmInfo[0].title);
    const film_info = this.props.filmInfo[0];
    return (
      <div className="FilmContainer">
        <FilmContainerHead
          title={film_info.title}
          rating={film_info.rating}
          titleHandler={this.props.titleHandler}
        />
        <FilmContainerBody
          releaseYear={film_info.release_year}
          language={film_info.language.name}
          length={film_info.length}
          description={film_info.description}
        />
      </div>
    );
  }
}

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

class FilmPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filmInfo: null,
      title: null,
    };
    console.log(this.props.id);
    var id = this.props.id;
    fetch(`http://${getRoot()}/home/get_film?id=${id}`)
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        this.setState({
          filmInfo: json,
          title: json[0].title,
        });
      });
    this.handleTitleChanged = this.handleTitleChanged.bind(this);
    this.saveFilm = this.saveFilm.bind(this);
  }

  handleTitleChanged(new_title) {
    this.setState({
      filmInfo: this.state.filmInfo,
      title: new_title,
    });
  }

  saveFilm() {
    console.log(this.state.title);
    const id = this.props.id;
    const title = this.state.title;
    fetch(`http://${getRoot()}/home/update_film?id=${id}&title=${title}`, {
      method: "PUT",
    })
      .then((response) => response.text())
      .then((text) => {
        console.log(text);
        window.alert(text);
      });
  }

  render() {
    if (this.state.filmInfo) {
      return (
        <div>
          <button className="saveChangesButton" onClick={this.saveFilm}>
            Save
          </button>
          <FilmContainer
            filmInfo={this.state.filmInfo}
            titleHandler={this.handleTitleChanged}
          />
          <ActorListContainer film_id={this.state.filmInfo[0].film_id} />
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
