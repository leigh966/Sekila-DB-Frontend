import { SearchBar } from "../../SearchBar";
import React from "react";
import { FilmList } from "../../TableList/FilmList";
import { useNavigate, useParams } from "react-router-dom";

export class SearchFilmPage extends React.Component {
  constructor(props) {
    super(props);
    this.updateQuery = this.updateQuery.bind(this);
    this.goto = this.goto.bind(this);
    this.state = {
      query: this.props.query,
    };
  }

  updateQuery(newQuery) {
    this.setState({
      query: newQuery,
    });
  }

  goto() {
    console.log("going to " + this.state.query);
    this.setState({
      query: this.state.query,
      resultList: (
        <FilmList key={this.state.query} name_query={this.state.query} />
      ),
    });

    console.log(this.state.resultList);
  }

  render() {
    const searchBar = (
      <SearchBar
        query={this.state.query}
        queryHandler={this.updateQuery}
        searchPageName="Search_Film"
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
}

const SearchFilm = () => {
  const { query } = useParams();
  const page = <SearchFilmPage query={query} />;
  console.log(page);
  return page;
};

export default SearchFilm;
