import { SearchBar } from "../../SearchBar";
import React from "react";
import { ActorList } from "../../TableList/ActorList";
import { useNavigate, useParams } from "react-router-dom";

export class SearchActorPage extends React.Component {
  constructor(props) {
    super(props);
    this.updateNameQuery = this.updateNameQuery.bind(this);
    this.goto = this.goto.bind(this);
    this.state = {
      nameQuery: this.props.query,
    };
  }

  updateNameQuery(newQuery) {
    this.setState({
      nameQuery: newQuery,
    });
  }

  goto() {
    console.log("going to " + this.state.nameQuery);
    this.setState({
      nameQuery: this.state.nameQuery,
      actorList: (
        <ActorList
          key={this.state.nameQuery}
          nameQuery={this.state.nameQuery}
        />
      ),
    });

    console.log(this.state.actorList);
  }

  render() {
    const searchBar = (
      <SearchBar
        query={this.state.nameQuery}
        queryHandler={this.updateNameQuery}
        searchPageName="Search_Actor"
        buttonHandler={this.goto}
      />
    );
    console.log(this.state);
    return (
      <div key={this.state.actorList + "list"}>
        {searchBar}
        {this.state.actorList}
      </div>
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
