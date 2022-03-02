import React from "react";
import { Link } from "react-router-dom";
import { TableList } from "./TableList.js";

class ActorListEntry extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        •
        <Link className="ActorListEntry" to={`/actor/${this.props.id}`}>
          {this.props.name}
        </Link>
      </>
    );
  }
}

export class ActorList extends TableList {
  getParamString() {
    let params = "";

    const id = this.props.id;
    if (id) {
      params = this.addParam("id", id, params);
    }

    const query = this.props.nameQuery;
    if (query) {
      params = this.addParam("nameQuery", query, params);
    }

    const film_id = this.props.film_id;
    if (film_id) {
      params = this.addParam("film_id", film_id, params);
    }

    console.log(params);
    return params;
  }

  constructor(props) {
    super(props);
    const paramString = this.getParamString();
    this.sendRequest("get_actor", paramString);
  }

  getListEntry(actor) {
    const actor_name = actor.first_name + " " + actor.last_name;
    return (
      <ActorListEntry
        key={this.props.query}
        name={actor_name}
        id={actor.actor_id}
        divKey={this.props.query + "div"}
      />
    );
  }
}
