import React from "react";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";

export class ActorFilmDropdown extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const options = ["Actor", "Film"];
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
