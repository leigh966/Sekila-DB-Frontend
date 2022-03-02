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

    const nameQuery = this.props.nameQuery;
    if (nameQuery) {
      params = this.addParam("nameQuery", nameQuery, params);
    }

    const film_id = this.props.film_id;
    if (film_id) {
      params = this.addParam("film_id", film_id, params);
    }

    console.log(params);
    return params;
  }

  onResponse(json) {
    this.setState({
      actors: json,
      nameQuery: this.state.nameQuery,
    });
    this.forceUpdate();
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
      this.state.actors.forEach((actor, index) => {
        const actor_name = actor.first_name + " " + actor.last_name;
        const actor_entry = (
          <ActorListEntry
            key={this.props.nameQuery + index}
            name={actor_name}
            id={actor.actor_id}
            divKey={this.props.nameQuery + index + "div"}
          />
        );
        actor_entry_list.push(actor_entry);
      });
      //console.log(this.props.nameQuery);
      return <div key={this.props.nameQuery}>{actor_entry_list}</div>;
    }
    if (this.state.failMessage) {
      return <h1>{this.state.failMessage}</h1>;
    }
    return <h1>Loading...</h1>;
  }
}
