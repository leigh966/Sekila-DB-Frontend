import React from "react";
import { SearchBar } from "../../SearchBar";
import { ActorFilmDropdown } from "../../Dropdowns/ActorFilmDropdown";

export class SearchPage extends React.Component {
  constructor(props) {
    super(props);
    this.updateQuery = this.updateQuery.bind(this);
    this.onSearch = this.onSearch.bind(this);
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

  getSearchBar() {
    return (
      <SearchBar
        query={this.state.query}
        queryHandler={this.updateQuery}
        searchPageName={this.searchPageName}
        buttonHandler={this.onSearch}
      />
    );
  }

  render() {
    const searchBar = this.getSearchBar();
    console.log(this.state);
    return (
      <div key={this.state.resultList + "list"}>
        {searchBar}
        {this.getDropdown()}
        {this.state.resultList}
      </div>
    );
  }

  onSearch() {
    console.log("going to " + this.state.query);
    this.setState({
      query: this.state.query,
      resultList: this.getList(),
    });

    console.log(this.state.resultList);
  }
}
