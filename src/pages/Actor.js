import { BrowserRouter as Router, useParams } from "react-router-dom";

const Actor = () => {
  let { id } = useParams();
  return <h1>Actor:{id}</h1>;
};

export default Actor;
