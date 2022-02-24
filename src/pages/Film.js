import React from "react";
import { BrowserRouter as Router, useParams } from "react-router-dom";

class FilmPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filmInfo: null,
    };
    console.log(this.props.id);
    var id = this.props.id;
    fetch(`http://18.170.34.114:8080/home/get_film?id=${id}`)
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
      console.log("filmInfo.title: " + this.state.filmInfo[0].title);
      return <h1>{this.state.filmInfo[0].title}</h1>;
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
