import { SearchBar } from "../../SearchBar";
import React from "react";
import { ActorList } from "../../TableList/ActorList";

export class SearchActor extends React.Component {
  constructor(props) {
    super(props);
    this.updateNameQuery = this.updateNameQuery.bind(this);
    this.state = {
      nameQuery: "",
      actorList: null,
    };
  }

  updateNameQuery(newQuery) {
    this.setState({
      nameQuery: newQuery,
      actorList: this.state.actorList,
    });
  }

  search() {
    console.log("Searching " + this.state.nameQuery);
    this.setState({
      nameQuery: this.state.nameQuery,
      actorList: <ActorList nameQuery={this.state.nameQuery} />,
    });
  }

  render() {
    const returnObject = [
      <SearchBar
        query={this.state.nameQuery}
        queryHandler={this.updateNameQuery}
        buttonHandler={() => {
          this.search();
        }}
      />,
    ];
    if (this.state.actorList) {
      returnObject.push(this.state.actorList);
    }
    return returnObject;
  }
}
