import { FilmPage } from "../RecordPage/Film";
import { getRoot } from "../../API_config";

class AddFilmPage extends FilmPage {
  constructor(props) {
    super(props);
    this.startEditing = true;
  }

  getListContainer() {
    return <div></div>; // Just to override the parent and stop the actorList displaying
  }

  // Override parent to blank out fields
  onResponse(json) {
    console.log(json);
    json[0].title = "";
    json[0].rating = "";
    //json[0].description = "";
    json[0].release_year = "";
    json[0].length = "";
    json[0].language_id = -1;
    json[0].description = "";
    this.setState({
      filmInfo: json,
      title: json[0].title,
      rating: json[0].rating,
    });
  }

  saveFilm() {
    console.log(this.state.title);
    const title = this.state.title;
    const rating = this.state.rating;
    const releaseYear = this.state.releaseYear;
    const languageId = 1;
    const length = this.state.length;
    const description = "test object";

    fetch(
      `http://${getRoot()}/home/add_film?` +
        `title=${title}&rating=${rating}` +
        `&release_year=${releaseYear}&language_id=${languageId}` +
        `&rental_duration=0&rental_rate=0&` +
        `length=${length}&description=${description}` +
        `&replacement_cost=0`,
      { method: "POST" }
    )
      .then((response) => response.text())
      .then((text) => {
        console.log(text);
        window.alert(text);
        if (text == "saved") {
          window.location.assign(
            `http://${window.location.hostname}:${window.location.port}/search_film/${title}`
          );
        }
      });
  }
}

export function AddFilm() {
  return <AddFilmPage id={1} />;
}

export default AddFilm;
