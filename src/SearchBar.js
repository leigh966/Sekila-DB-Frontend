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
        <Link to={`/${this.props.searchPageName}/` + this.props.query}>
          <button>Search</button>
        </Link>
      </div>
    );
  }
}
