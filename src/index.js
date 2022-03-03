import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Actor from "./pages/RecordPage/Actor";
import Film from "./pages/RecordPage/Film";
import NoPage from "./pages/NoPage";
import "./index.css";
import { AllFilms } from "./pages/All/AllFilms";
import { AllActors } from "./pages/All/AllActors";
import SearchActor from "./pages/Search/SearchActor";
import SearchFilm from "./pages/Search/SearchFilm";
import AddFilm from "./pages/Add/AddFilm";
import AddActor from "./pages/Add/AddActor";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="actor/:id" element={<Actor />} />
          <Route path="film/:id" element={<Film />} />
          <Route path="films" element={<AllFilms />} />
          <Route path="actors" element={<AllActors />} />
          <Route path="Search_Actor/:query" element={<SearchActor />} />
          <Route path="Search_Actor" element={<SearchActor />} />
          <Route path="Search_Film" element={<SearchFilm />} />
          <Route path="Search_Film/:query" element={<SearchFilm />} />
          <Route path="add_film" element={<AddFilm />} />
          <Route path="add_actor" element={<AddActor />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
