import React from "react";
import { RatingDropdown } from "./Dropdowns/RatingDropdown";

export class EditableField extends React.Component {
  constructor(props) {
    super(props);

    let start_editing = false;
    if (this.props.start_editing) start_editing = true; // Not a good idea to just set start_editing = props.start_editing as props.start_editing might be null
    this.state = {
      field: this.props.field,
      editing: start_editing,
    };
    this.switchMode = this.switchMode.bind(this);
  }

  switchMode() {
    let newField = this.state.field;
    if (this.props.dropDown) {
      newField = this.props.field;
    }
    this.setState({
      field: newField,
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

  getLabelField() {
    return (
      <div className="Field">
        {this.props.label}
        {this.state.field}
      </div>
    );
  }

  render() {
    if (!this.state.editing) {
      return (
        <div className="EditableField">
          {this.getLabelField()}
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
