import { BrowserRouter as Router, useParams } from "react-router-dom";
import React, { useState } from "react";
import { EditableField } from "../EditableField";
import { getRoot } from "../API_config";
import { FilmList } from "../FilmList";

class ActorContainer extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    console.log("Using actorInfo: ");
    console.log(this.props.first_name + " " + this.props.last_name);
    return (
      <h1>
        <EditableField label="" field={this.props.first_name} />
        <EditableField label="" field={this.props.last_name} />
      </h1>
    );
  }
}

class FilmListContainer extends React.Component {
  render() {
    return (
      <div>
        <h2>Films:</h2>
        <div className="FilmListForActor">
          <FilmList actor_id={this.props.id} />
        </div>
      </div>
    );
  }
}

class ActorPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      actorInfo: null,
    };
    console.log(this.props.id);
    var id = this.props.id;
    fetch(`http://${getRoot()}/home/get_actor?id=${id}`)
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        this.setState({
          actorInfo: json,
        });
      });
  }
  render() {
    const actorInfo = this.state.actorInfo;
    if (actorInfo) {
      console.log("ready to use actorInfo: ");
      console.log(actorInfo);
      return (
        <div>
          <ActorContainer
            first_name={actorInfo[0].first_name}
            last_name={actorInfo[0].last_name}
          />
          <br />
          <FilmListContainer id={this.props.id} />
        </div>
      );
    } else {
      return <h1>Loading...</h1>;
    }
  }
}

const Actor = () => {
  let { id } = useParams();
  return <ActorPage id={id} />;
};

export default Actor;
