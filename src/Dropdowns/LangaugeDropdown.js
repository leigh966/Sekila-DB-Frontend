import React from "react";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import { getRoot } from "../API_config";

export class LanguageDropdown extends React.Component {
  constructor(props) {
    super(props);
    this.sendRequest();
    this.state = {
      errorMessage: null,
    };
  }

  onResponse(json) {
    this.setState({
      languages: json,
    });
  }

  sendRequest() {
    fetch(`http://${getRoot()}/get_languages`)
      .then((response) => response.json())
      .then((json) => {
        this.onResponse(json);
      })
      .catch((e) =>
        this.setState({
          errorMessage: e.message,
        })
      );
  }

  getOptions() {
    let options = [];
    this.state.languages.forEach((language) => {
      options.push(language.name);
    });
    return options;
  }

  render() {
    if (this.state.errorMessage) return <h4>{this.state.errorMessage}</h4>;

    if (!this.state.languages) return <h4>Loading...</h4>;

    const options = this.getOptions();
    return (
      <Dropdown
        options={options}
        onChange={(event) => {
          this.props.handler(event.value);
        }}
        value={this.props.current}
        placeholder="Select an option"
      />
    );
  }
}
