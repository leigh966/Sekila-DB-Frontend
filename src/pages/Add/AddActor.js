import { ActorPage } from "../RecordPage/Actor";
import { getRoot } from "../../API_config";

class AddActorPage extends ActorPage {
  constructor(props) {
    super(props);
    this.startEditing = true;
  }

  getListContainer() {
    return <div></div>; // Just to override the parent and stop the filmList displaying
  }

  onResponse(json) {
    console.log("AddActor onResponse run");
    json[0].first_name = "";
    json[0].last_name = "";
    this.setState({
      first_name: "",
      last_name: "",
      actorInfo: json,
    });
  }

  saveActor() {
    console.log(this.state.first_name);
    console.log(this.state.last_name);
    const first_name = this.state.first_name;
    const last_name = this.state.last_name;
    fetch(
      `http://${getRoot()}/home/add_actor?first_name=${first_name}&last_name=${last_name}`,
      {
        method: "POST",
      }
    )
      .then((response) => response.text())
      .then((text) => {
        console.log(text);
        window.alert(text);
        window.location.assign(
          `http://${window.location.hostname}:${window.location.port}/search_actor/${first_name}%20${last_name}`
        );
      });
  }
}

function AddActor() {
  return <AddActorPage id={1} />;
}

export default AddActor;
