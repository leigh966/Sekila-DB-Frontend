import React from "react";
import { Link } from "react-router-dom";
import { TableList } from "./TableList.js";

class FilmListEntry extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <dl>
        <dt>
          <Link className="FilmListEntry" to={`/film/${this.props.id}`}>
            {this.props.title}
          </Link>
        </dt>
        <dd>{this.props.description}</dd>
      </dl>
    );
  }
}

export class FilmList extends TableList {
  getParamString() {
    let params = "";

    const id = this.props.id;
    if (id) {
      params = this.addParam("id", id, params);
    }

    const title_query = this.props.name_query;
    if (title_query) {
      params = this.addParam("titleQuery", title_query, params);
    }

    const actor_id = this.props.actor_id;
    if (actor_id) {
      params = this.addParam("actor_id", actor_id, params);
    }

    return params;
  }

  onResponse(json) {
    this.setState({
      films: json,
    });
  }

  constructor(props) {
    super(props);
    this.state = {
      films: null,
    };
    this.sendRequest("get_film", this.getParamString());
  }

  render() {
    if (this.state.films) {
      let film_entry_list = [];
      this.state.films.forEach((film) => {
        const film_entry = (
          <FilmListEntry
            title={film.title}
            id={film.film_id}
            description={film.description}
          />
        );
        film_entry_list.push(film_entry);
      });
      return film_entry_list;
    }
    return <h1>Loading...</h1>;
  }
}
