import { ActorPage } from "../RecordPage/Actor";

class AddActorPage extends ActorPage {
  constructor(props) {
    super(props);
  }
}

function AddActor() {
  return <AddActorPage id={1} />;
}

export default AddActor;
