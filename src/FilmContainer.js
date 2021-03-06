import React from "react";
import { EditableField } from "./EditableField";
import { RatingDropdown } from "./Dropdowns/RatingDropdown";
import { LanguageDropdown } from "./Dropdowns/LanguageDropdown";
import { DescriptionEditable } from "./DescriptionEditable";

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
            start_editing={this.props.startEditing}
          />
        </h1>
        <h1>
          <EditableField
            label=""
            field={this.state.rating}
            handler={this.props.ratingHandler}
            start_editing={this.props.startEditing}
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
    this.state = {
      languageName: this.props.language,
    };
  }
  handleLanguageChanged(new_language_name) {
    this.setState({ languageName: new_language_name });
    console.log("language updated in FilmContainerBody: " + new_language_name);
    this.forceUpdate();
  }
  render() {
    console.log(this);
    console.log(
      "render run at FilmContainerBody, languageName: " +
        this.state.languageName
    );
    return (
      <div className="FilmContainerBody">
        <h3>
          <EditableField
            label="Release Year: "
            field={this.props.releaseYear}
            handler={this.props.releaseYearHandler}
            start_editing={this.props.startEditing}
          />
        </h3>
        <h3>
          <EditableField
            label={"Language: "}
            field={this.state.languageName}
            start_editing={this.props.startEditing}
            dropDown={
              <LanguageDropdown
                handler={(option) => {
                  this.props.languageHandler(option.value);
                  this.handleLanguageChanged(option.label);
                }}
                current={this.props.language}
              />
            }
          />
        </h3>
        <h3>
          <EditableField
            label={"Length: "}
            field={this.props.length}
            handler={this.props.lengthHandler}
            start_editing={this.props.startEditing}
          />
        </h3>
        <br />
        <br />
        <br />
        <h3>
          <DescriptionEditable
            label="Description: "
            field={this.props.description}
            start_editing={this.props.startEditing}
            handler={this.props.descriptionHandler}
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
          startEditing={this.props.startEditing}
        />
        <FilmContainerBody
          releaseYear={film_info.release_year}
          language={film_info.language.name}
          length={film_info.length}
          description={film_info.description}
          releaseYearHandler={this.props.releaseYearHandler}
          lengthHandler={this.props.lengthHandler}
          languageHandler={this.props.languageHandler}
          startEditing={this.props.startEditing}
          descriptionHandler={this.props.descriptionHandler}
        />
      </div>
    );
  }
}
