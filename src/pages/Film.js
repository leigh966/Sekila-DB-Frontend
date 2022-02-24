import { BrowserRouter as Router, useParams } from "react-router-dom";

function Film() {
  let { id } = useParams();
  return <h1>Film:{id}</h1>;
}

export default Film;
