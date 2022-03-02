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

  render() {
    if (this.state.results) {
      let actor_entry_list = [];
      this.state.results.forEach((actor, index) => {
        const actor_name = actor.first_name + " " + actor.last_name;
        const actor_entry = (
          <ActorListEntry
            key={this.props.query + index}
            name={actor_name}
            id={actor.actor_id}
            divKey={this.props.query + index + "div"}
          />
        );
        actor_entry_list.push(actor_entry);
      });
      //console.log(this.props.query);
      return <div key={this.props.query}>{actor_entry_list}</div>;
    }
    if (this.state.failMessage) {
      return <h1>{this.state.failMessage}</h1>;
    }
    return <h1>Loading...</h1>;
  }
}
