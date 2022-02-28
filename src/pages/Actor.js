import { BrowserRouter as Router, useParams } from "react-router-dom";
import React, { useState } from "react";
import { EditableField } from "../EditableField";
import { getRoot } from "../API_config";
import { FilmList } from "../TableList/FilmList";

class ActorContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log("Using actorInfo: ");
    console.log(this.props.first_name + " " + this.props.last_name);
    return (
      <h1>
        <EditableField
          label=""
          field={this.props.first_name}
          handler={this.props.firstNameHandler}
        />
        <EditableField
          label=""
          field={this.props.last_name}
          handler={this.props.lastNameHandler}
        />
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
      first_name: null,
      last_name: null,
    };
    console.log(this.props.id);
    var id = this.props.id;
    fetch(`http://${getRoot()}/home/get_actor?id=${id}`)
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        this.setState({
          actorInfo: json,
          first_name: json[0].first_name,
          last_name: json[0].last_name,
        });
      });
    this.saveActor = this.saveActor.bind(this);
    this.handleFirstNameChanged = this.handleFirstNameChanged.bind(this);
    this.handleLastNameChanged = this.handleLastNameChanged.bind(this);
  }

  handleFirstNameChanged(new_first_name) {
    this.setState({
      filmInfo: this.state.filmInfo,
      last_name: this.state.last_name,
      first_name: new_first_name,
    });
  }

  handleLastNameChanged(new_last_name) {
    this.setState({
      filmInfo: this.state.filmInfo,
      first_name: this.state.first_name,
      last_name: new_last_name,
    });
  }

  saveActor() {
    console.log(this.state.first_name);
    console.log(this.state.last_name);
    const id = this.props.id;
    const first_name = this.state.first_name;
    const last_name = this.state.last_name;
    fetch(
      `http://${getRoot()}/home/update_actor?id=${id}&first_name=${first_name}&last_name=${last_name}`,
      {
        method: "PUT",
      }
    )
      .then((response) => response.text())
      .then((text) => {
        console.log(text);
        window.alert(text);
      });
  }

  render() {
    const actorInfo = this.state.actorInfo;
    if (actorInfo) {
      console.log("ready to use actorInfo: ");
      console.log(actorInfo);
      return (
        <div>
          <button className="saveChangesButton" onClick={this.saveActor}>
            Save
          </button>
          <ActorContainer
            first_name={actorInfo[0].first_name}
            last_name={actorInfo[0].last_name}
            firstNameHandler={this.handleFirstNameChanged}
            lastNameHandler={this.handleLastNameChanged}
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
