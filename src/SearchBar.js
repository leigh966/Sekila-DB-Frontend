import React from "react";
import { Outlet, Link } from "react-router-dom";

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
        <button
          onClick={() => {
            this.props.buttonHandler();
          }}
        >
          <Link to={`/${this.props.searchPageName}/` + this.props.query}>
            Search
          </Link>
        </button>
      </div>
    );
  }
}
