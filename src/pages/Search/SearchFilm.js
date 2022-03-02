import { SearchBar } from "../../SearchBar";
import React from "react";
import { FilmList } from "../../TableList/FilmList";
import { useNavigate, useParams } from "react-router-dom";
import { SearchPage } from "./SearchPage";

export class SearchFilmPage extends SearchPage {
  constructor(props) {
    super(props);
    this.searchPageName = "Search_Film";
  }

  getList() {
    return <FilmList key={this.state.query} name_query={this.state.query} />;
  }
}

const SearchFilm = () => {
  const { query } = useParams();
  const page = <SearchFilmPage query={query} />;
  console.log(page);
  return page;
};

export default SearchFilm;
