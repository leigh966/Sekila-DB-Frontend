import React from "react";
import { BrowserRouter as Router, useParams } from "react-router-dom";
import { EditableField } from "../ActorFilmTools";

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

class FilmContainer extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    console.log("filmInfo.title: " + this.props.filmInfo[0].title);
    return (
      <FilmContainerHead
        title={this.props.filmInfo[0].title}
        rating={this.props.filmInfo[0].rating}
      />
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
      return <FilmContainer filmInfo={this.state.filmInfo} />;
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
