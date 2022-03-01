import React from "react";
import { RatingDropdown } from "./RatingDropdown";

export class EditableField extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      field: this.props.field,
      editing: false,
    };
    this.switchMode = this.switchMode.bind(this);
  }

  // Create handle dropdown value changed

  switchMode() {
    this.setState({
      field: this.props.field,
      editing: !this.state.editing,
    });
  }

  handleFieldChanged(fieldInput) {
    this.setState({
      field: fieldInput,
      editing: this.state.editing,
    });
  }

  getInput() {
    return (
      <input
        type="text"
        value={this.state.field}
        onChange={(event) => {
          this.props.handler(event.target.value);
          this.handleFieldChanged(event.target.value);
        }}
      />
    );
  }

  render() {
    if (!this.state.editing) {
      return (
        <div className="EditableField">
          <div className="Field">
            {this.props.label}
            {this.state.field}
          </div>
          <button className="EditButton" onClick={this.switchMode}>
            Edit
          </button>
        </div>
      );
    } else {
      return (
        <div className="EditableField">
          <div className="Field">
            {this.props.label}
            {this.props.dropDown ? this.props.dropDown : this.getInput()}
          </div>
          <button className="EditButton" onClick={this.switchMode}>
            Close
          </button>
        </div>
      );
    }
  }
}
