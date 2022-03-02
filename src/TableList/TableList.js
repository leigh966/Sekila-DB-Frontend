import React from "react";
import { getRoot } from "../API_config";

export class TableList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      results: null,
    };
  }

  addParam(name, value, params) {
    if (params) {
      params += "&";
    } else {
      params += "?";
    }
    params += `${name}=${value}`;
    return params;
  }

  onResponse(json) {
    this.setState({
      results: json,
    });
  }

  sendRequest(path, params) {
    fetch(`http://${getRoot()}/home/${path}${params}`)
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        this.onResponse(json);
      })
      .catch((reason) => {
        this.setState({ failMessage: reason.message });
      });
  }

  render() {
    if (this.state.results) {
      let entry_list = [];
      this.state.results.forEach((result) => {
        const entry = this.getListEntry(result);
        entry_list.push(entry);
      });
      return entry_list;
    }
    if (this.state.failMessage) {
      return <h1>{this.state.failMessage}</h1>;
    }
    return <h1>Loading...</h1>;
  }
}
