import { FilmPage } from "../RecordPage/Film";

class AddFilmPage extends FilmPage {
  constructor(props) {
    super(props);
  }
}

export function AddFilm() {
  return <AddFilmPage id={1} />;
}

export default AddFilm;
