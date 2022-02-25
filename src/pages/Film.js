import React from "react";
import { BrowserRouter as Router, useParams } from "react-router-dom";

class EditableField extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      field: this.props.field,
    };
  }

  render() {
    return (
      <div>
        <h1 className="Field">
          {this.props.label}
          {this.state.field}
        </h1>
        <button className="EditButton">Edit</button>
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
    return <EditableField label="" field={this.props.filmInfo[0].title} />;
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
