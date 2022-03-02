import { SearchBar } from "../../SearchBar";
import React from "react";
import { ActorList } from "../../TableList/ActorList";
import { useNavigate, useParams } from "react-router-dom";
import { SearchPage } from "./SearchPage";

export class SearchActorPage extends SearchPage {
  constructor(props) {
    super(props);
    this.searchPageName = "Search_Actor";
  }

  getList() {
    return <ActorList key={this.state.query} nameQuery={this.state.query} />;
  }
}

const SearchActor = () => {
  const { query } = useParams();
  const page = <SearchActorPage query={query} />;
  console.log(page);
  return page;
};

export default SearchActor;
