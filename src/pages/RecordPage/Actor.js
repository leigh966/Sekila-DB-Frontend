import { BrowserRouter as Router, useParams } from "react-router-dom";
import React, { useState } from "react";
import { EditableField } from "../../EditableField";
import { getRoot } from "../../API_config";
import { FilmList } from "../../TableList/FilmList";
import { RecordPage } from "./RecordPage";

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
          label="Forename: "
          field={this.props.first_name}
          handler={this.props.firstNameHandler}
        />
        <EditableField
          label="Surname: "
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

export class ActorPage extends RecordPage {
  constructor(props) {
    super(props);
    this.state = {
      actorInfo: null,
      first_name: null,
      last_name: null,
    };
    console.log(this.props.id);
    this.sendRequest("get_actor");
    this.saveActor = this.saveActor.bind(this);
    this.handleFirstNameChanged = this.handleFirstNameChanged.bind(this);
    this.handleLastNameChanged = this.handleLastNameChanged.bind(this);
  }

  onResponse(json) {
    console.log(json);
    this.setState({
      actorInfo: json,
      first_name: json[0].first_name,
      last_name: json[0].last_name,
    });
  }

  handleFirstNameChanged(new_first_name) {
    this.setState({
      actorInfo: this.state.actorInfo,
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

  getInfoContainer(actorInfo) {
    return (
      <ActorContainer
        first_name={actorInfo[0].first_name}
        last_name={actorInfo[0].last_name}
        firstNameHandler={this.handleFirstNameChanged}
        lastNameHandler={this.handleLastNameChanged}
      />
    );
  }

  getListContainer() {
    return <FilmListContainer id={this.props.id} />;
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
          {this.getInfoContainer(actorInfo)}
          <br />
          {this.getListContainer()}
        </div>
      );
    }
    if (this.state.errorMessage) return <h1>{this.state.errorMessage}</h1>;
    return <h1>Loading...</h1>;
  }
}

function onDelete(id) {
  fetch(`http://${getRoot()}/home/delete_actor?id=${id.toString()}`, {
    method: "DELETE",
  })
    .then((response) => response.text())
    .then((text) => {
      console.log(text);
      window.alert(text);
      window.location.assign(
        `http://${window.location.hostname}:${window.location.port}/actors`
      );
    });
}

const Actor = () => {
  let { id } = useParams();
  console.log("id: " + id);
  return (
    <>
      <button onClick={() => onDelete(id)}>Delete</button>
      <ActorPage id={id} />
    </>
  );
};

export default Actor;
