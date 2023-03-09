import DeleteBtn from "./DeleteBtn";
import { useContext, useState, useRef } from "react";
import { Button, Form } from "react-bootstrap";
import { PresetsContext } from "../helpers/PresetsProvider";

export default function SinglePreset(props: any) {
  const { newPreset, updatePresetName } = useContext(PresetsContext);

  const [editable, setEditable] = useState(false);

  const inputRef = useRef(null);

  const handleClick = (e: React.MouseEvent) => {
    if (e.detail === 2) {
      setEditable(true);
    }
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const input = form.elements[0] as HTMLInputElement;
    updatePresetName(props.path, input.value);
    setEditable(false);
  };

  const handleBlur = (e: any) => {
    updatePresetName(props.path, e.target.value);
    setEditable(false);
  };

  function handlePlusClick() {
    newPreset(props.path);
  }

  return (
    <div className="item">
            {!editable && (
        <div>
          {props.parent ? (
            <strong>
              <p
                onClick={handleClick}
              >
                {props.preset.task}
              </p>
            </strong>
          ) : (
            <p
              onClick={handleClick}
            >
              {props.preset.task}
            </p>
          )}

          <div className="icons">
            <DeleteBtn type="preset" path={props.path} />
            {!props.parent && (
              <span
                className="material-symbols-outlined"
                onClick={handlePlusClick}
                style={{ cursor: "pointer" }}
              >
                library_add
              </span>
            )}
          </div>
        </div>
      )}
      {editable && (
        <Form onSubmit={handleSubmit}>
          <Form.Control
            ref={inputRef}
            defaultValue={props.preset.task}
            placeholder="Enter Preset"
            onBlur={handleBlur}
            autoFocus
          />
          <Button type="submit">Save</Button>
        </Form>
      )}
    </div>
  );
}
