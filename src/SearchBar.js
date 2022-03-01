import React from "react";
export class SearchBar extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <input
          type="text"
          placeholder="Search..."
          onChange={(event) => {
            this.props.queryHandler(event.target.value);
          }}
          value={this.props.query}
        />
        <button onClick={this.props.buttonHandler}>Search</button>
      </div>
    );
  }
}
