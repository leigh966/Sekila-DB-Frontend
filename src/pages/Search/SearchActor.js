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

  goto() {
    console.log("going to " + this.state.query);
    this.setState({
      query: this.state.query,
      resultList: (
        <ActorList key={this.state.query} nameQuery={this.state.query} />
      ),
    });

    console.log(this.state.resultList);
  }
}

const SearchActor = () => {
  const { query } = useParams();
  const page = <SearchActorPage query={query} />;
  console.log(page);
  return page;
};

export default SearchActor;
