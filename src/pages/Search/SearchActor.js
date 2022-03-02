import { SearchBar } from "../../SearchBar";
import React from "react";
import { ActorList } from "../../TableList/ActorList";
import { useParams } from "react-router-dom";
import { SearchPage } from "./SearchPage";
import { ActorFilmDropdown } from "../../Dropdowns/ActorFilmDropdown";

export class SearchActorPage extends SearchPage {
  constructor(props) {
    super(props);
    this.searchPageName = "Search_Actor";
  }

  getList() {
    return <ActorList key={this.state.query} nameQuery={this.state.query} />;
  }

  getDropdown() {
    return <ActorFilmDropdown current="Actor" />;
  }

  handleDropdown(value) {
    console.log(value + " selected");
    if (value == "Film") {
      window.location.assign(
        `http://${window.location.hostname}:${
          window.location.port
        }/search_film/${this.state.query ? this.state.query : ""}`
      );
    }
  }

  getDropdown() {
    console.log(this.state.query);
    return (
      <ActorFilmDropdown
        current="Actor"
        handler={(value) => this.handleDropdown(value)}
      />
    );
  }
}

const SearchActor = () => {
  const { query } = useParams();
  const page = <SearchActorPage query={query} />;
  console.log(page);
  return page;
};

export default SearchActor;
