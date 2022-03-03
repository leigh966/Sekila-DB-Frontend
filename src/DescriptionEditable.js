import { EditableField } from "./EditableField";

export class DescriptionEditable extends EditableField {
  constructor(props) {
    super(props);
  }
  getLabelField() {
    return (
      <div className="Field">
        {this.props.label}
        <p>{this.state.field}</p>
      </div>
    );
  }
}
