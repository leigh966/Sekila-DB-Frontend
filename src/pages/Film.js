import React from "react";
import { BrowserRouter as Router, useParams } from "react-router-dom";
import { EditableField } from "../ActorFilmTools";
import { ActorList } from "../ActorList";

class FilmContainerHead extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="FilmContainerHead">
        <h1>
          <EditableField label="" field={this.props.title} />
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
        <FilmContainerHead title={film_info.title} rating={film_info.rating} />
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

class FilmPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filmInfo: null,
    };
    console.log(this.props.id);
    var id = this.props.id;
    fetch(`http://18.130.52.142:8080/home/get_film?id=${id}`)
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        this.setState({
          filmInfo: json,
        });
      });
  }

  render() {
    if (this.state.filmInfo) {
      return (
        <div>
          <FilmContainer filmInfo={this.state.filmInfo} />
          <ActorList film_id={this.state.filmInfo[0].film_id} />
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
  return <FilmPage id={id[0]} />;
}

export default Film;
