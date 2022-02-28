import React from "react";

export class EditableField extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      field: this.props.field,
      editing: false,
    };
    this.switchMode = this.switchMode.bind(this);
  }

  switchMode() {
    this.setState({
      field: this.state.field,
      editing: !this.state.editing,
    });
  }

  handleFieldChanged(fieldInput) {
    this.setState({
      field: fieldInput,
      editing: this.state.editing,
    });
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
            <input
              type="text"
              value={this.state.field}
              onChange={(event) => this.handleFieldChanged(event.target.value)}
            />
          </div>
          <button className="EditButton" onClick={this.switchMode}>
            Close
          </button>
        </div>
      );
    }
  }
}
