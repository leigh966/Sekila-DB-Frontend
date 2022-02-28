import React from "react";
import { Outlet, Link } from "react-router-dom";
import { getRoot } from "./API_config.js";
import { TableList } from "./TableList.js";

class ActorListEntry extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log(
      `ActorListEntry caled with id ${this.props.id} and name ${this.props.name}`
    );
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

    const name_query = this.props.name_query;
    if (name_query) {
      params = this.addParam("name_query", name_query, params);
    }

    const film_id = this.props.film_id;
    if (film_id) {
      params = this.addParam("film_id", film_id, params);
    }

    return params;
  }

  onResponse(json) {
    this.setState({
      actors: json,
    });
  }

  constructor(props) {
    super(props);
    this.state = {
      actors: null,
    };
    const paramString = this.getParamString();
    this.sendRequest("get_actor", paramString);
  }

  render() {
    if (this.state.actors) {
      let actor_entry_list = [];
      this.state.actors.forEach((actor) => {
        const actor_name = actor.first_name + " " + actor.last_name;
        const actor_entry = (
          <ActorListEntry name={actor_name} id={actor.actor_id} />
        );
        actor_entry_list.push(actor_entry);
      });
      return actor_entry_list;
    }
    return <h1>Loading...</h1>;
  }
}
