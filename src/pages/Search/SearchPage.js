import React from "react";
import { SearchBar } from "../../SearchBar";

export class SearchPage extends React.Component {
  constructor(props) {
    super(props);
    this.updateQuery = this.updateQuery.bind(this);
    this.goto = this.goto.bind(this);
    this.state = {
      query: this.props.query,
    };
    this.searchPageName = null;
  }

  updateQuery(newQuery) {
    this.setState({
      query: newQuery,
    });
  }
  render() {
    const searchBar = (
      <SearchBar
        query={this.state.query}
        queryHandler={this.updateQuery}
        searchPageName={this.searchPageName}
        buttonHandler={this.goto}
      />
    );
    console.log(this.state);
    return (
      <div key={this.state.resultList + "list"}>
        {searchBar}
        {this.state.resultList}
      </div>
    );
  }

  goto() {
    console.log("going to " + this.state.query);
    this.setState({
      query: this.state.query,
      resultList: this.getList(),
    });

    console.log(this.state.resultList);
  }
}
