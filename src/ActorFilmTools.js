import React from "react";

export class EditableField extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      field: this.props.field,
    };
  }

  render() {
    return (
      <div>
        <div className="Field">
          {this.props.label}
          {this.state.field}
        </div>
        <button className="EditButton">Edit</button>
      </div>
    );
  }
}
