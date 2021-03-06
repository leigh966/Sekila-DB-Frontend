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

    const query = this.props.name_query;
    if (query) {
      params = this.addParam("titleQuery", query, params);
    }

    const actor_id = this.props.actor_id;
    if (actor_id) {
      params = this.addParam("actor_id", actor_id, params);
    }

    return params;
  }

  constructor(props) {
    super(props);
    this.sendRequest("get_film", this.getParamString());
  }

  getListEntry(film) {
    return (
      <FilmListEntry
        title={film.title}
        id={film.film_id}
        description={film.description}
      />
    );
  }
}
