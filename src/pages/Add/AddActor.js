import { ActorPage } from "../RecordPage/Actor";
import { getRoot } from "../../API_config";

class AddActorPage extends ActorPage {
  constructor(props) {
    super(props);
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
      });
  }
}

function AddActor() {
  return <AddActorPage id={1} />;
}

export default AddActor;
