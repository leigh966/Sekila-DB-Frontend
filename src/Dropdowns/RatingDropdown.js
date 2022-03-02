import React from "react";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";

export class RatingDropdown extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const options = ["G", "PG", "NC-17"];
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
