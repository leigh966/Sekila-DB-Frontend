import React from "react";
import { EditableField } from "./EditableField";
import { RatingDropdown } from "./Dropdowns/RatingDropdown";

class FilmContainerHead extends React.Component {
  constructor(props) {
    super(props);
    this.handleRatingChanged = this.handleRatingChanged.bind(this);
    this.state = {
      rating: this.props.rating,
    };
  }

  handleRatingChanged(new_rating) {
    this.setState({ rating: new_rating });
    console.log("rating updated in FilmContainerHead: " + new_rating);
    this.forceUpdate();
  }

  render() {
    console.log("render run at FilmContainerHead, rating=" + this.state.rating);
    return (
      <div className="FilmContainerHead">
        <h1>
          <EditableField
            label=""
            field={this.props.title}
            handler={this.props.titleHandler}
          />
        </h1>
        <h1>
          <EditableField
            label=""
            field={this.state.rating}
            handler={this.props.ratingHandler}
            dropDown={
              <RatingDropdown
                handler={(p) => {
                  this.props.ratingHandler(p);
                  this.handleRatingChanged(p);
                }}
                current={this.props.rating}
              />
            }
          />
        </h1>
      </div>
    );
  }
}

class FilmContainerBody extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    console.log(this);
    return (
      <div className="FilmContainerBody">
        <h3>
          <EditableField
            label="Release Year: "
            field={this.props.releaseYear}
            handler={this.props.releaseYearHandler}
          />
        </h3>
        <h3>
          <EditableField label={"Language: "} field={this.props.language} />
        </h3>
        <h3>
          <EditableField label={"Length: "} field={this.props.length} />
        </h3>
        <br />
        <br />
        <br />
        <h3>
          <EditableField
            label="Description: "
            field={<p>{this.props.description}</p>}
          />
        </h3>
      </div>
    );
  }
}

export class FilmContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log("filmInfo.title: " + this.props.filmInfo[0].title);
    const film_info = this.props.filmInfo[0];
    console.log(this);
    return (
      <div className="FilmContainer">
        <FilmContainerHead
          title={film_info.title}
          rating={film_info.rating}
          titleHandler={this.props.titleHandler}
          ratingHandler={this.props.ratingHandler}
        />
        <FilmContainerBody
          releaseYear={film_info.release_year}
          language={film_info.language.name}
          length={film_info.length}
          description={film_info.description}
          releaseYearHandler={this.props.releaseYearHandler}
        />
      </div>
    );
  }
}
