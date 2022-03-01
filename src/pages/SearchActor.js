import { SearchBar } from "../SearchBar";
import React from "react";

export class SearchActor extends React.Component {
  constructor(props) {
    super(props);
    this.updateNameQuery = this.updateNameQuery.bind(this);
    this.state = {
      nameQuery: "",
    };
  }

  updateNameQuery(newQuery) {
    this.setState({
      nameQuery: newQuery,
    });
  }

  search() {
    console.log("Searching " + this.state.nameQuery);
  }

  render() {
    return (
      <SearchBar
        query={this.state.nameQuery}
        queryHandler={this.updateNameQuery}
        buttonHandler={() => {
          this.search();
        }}
      />
    );
  }
}
