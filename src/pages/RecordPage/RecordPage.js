import React from "react";
import { getRoot } from "../../API_config";

export class RecordPage extends React.Component {
  constructor(props) {
    super(props);
  }
  sendRequest(func) {
    var id = this.props.id;
    fetch(`http://${getRoot()}/home/${func}?id=${id}`)
      .then((response) => response.json())
      .then((json) => {
        this.onResponse(json);
      });
  }
}
