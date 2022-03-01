import { SearchBar } from "../../SearchBar";
import React from "react";
import { ActorList } from "../../TableList/ActorList";
import { useNavigate, useParams } from "react-router-dom";

export class SearchActorPage extends React.Component {
  constructor(props) {
    super(props);
    this.updateNameQuery = this.updateNameQuery.bind(this);
    this.state = {
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
  }

  render() {
    const returnObject = [
      <SearchBar
        query={this.state.nameQuery}
        queryHandler={this.updateNameQuery}
        searchPageName="Search_Actor"
      />,
    ];

    if (this.props.query) {
      returnObject.push(<ActorList nameQuery={this.props.query} />);
    }

    return returnObject;
  }
}

const SearchActor = () => {
  const { query } = useParams();
  return <SearchActorPage query={query} />;
};

export default SearchActor;
