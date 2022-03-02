import { FilmPage } from "../RecordPage/Film";
import { getRoot } from "../../API_config";

class AddFilmPage extends FilmPage {
  constructor(props) {
    super(props);
  }

  saveFilm() {
    console.log(this.state.title);
    const title = this.state.title;
    const rating = this.state.rating;
    const releaseYear = this.state.releaseYear;
    const languageId = 1;
    const length = 86;
    const description = "test object";

    fetch(
      `http://${getRoot()}/home/add_film?` +
        `title=${title}&rating=${rating}` +
        `&release_year=${releaseYear}&language_id=${languageId}` +
        `&rental_duration=0&rental_rate=0&` +
        `length=${length}&description=${description}` +
        `&replacement_cost=0`,
      { method: "POST" }
    );
  }
}

export function AddFilm() {
  return <AddFilmPage id={1} />;
}

export default AddFilm;
