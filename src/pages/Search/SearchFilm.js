import React from "react";
import { FilmList } from "../../TableList/FilmList";
import { useParams } from "react-router-dom";
import { SearchPage } from "./SearchPage";
import { ActorFilmDropdown } from "../../Dropdowns/ActorFilmDropdown";

export class SearchFilmPage extends SearchPage {
  constructor(props) {
    super(props);
    this.searchPageName = "Search_Film";
  }

  getList() {
    return <FilmList key={this.state.query} name_query={this.state.query} />;
  }

  handleDropdown(value) {
    console.log(value + " selected");
    const currentQuery = window.document.getElementById("inputSearch").value;
    if (value == "Actor") {
      window.location.assign(
        `http://${window.location.hostname}:${window.location.port}/search_actor/${currentQuery}`
      );
    }
  }

  getDropdown() {
    console.log(this.state.query);
    return (
      <ActorFilmDropdown
        current="Film"
        handler={(value) => this.handleDropdown(value)}
      />
    );
  }
}

const SearchFilm = () => {
  const { query } = useParams();
  const page = <SearchFilmPage query={query} />;
  console.log(page);
  return page;
};

export default SearchFilm;
