import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Actor from "./pages/Actor";
import Film from "./pages/Film";
import NoPage from "./pages/NoPage";
import "./index.css";
import { AllFilms } from "./pages/All/AllFilms";
import { AllActors } from "./pages/All/AllActors";
import { SearchActor } from "./pages/Search/SearchActor";

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
          <Route path="Search_Actor" element={<SearchActor />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
