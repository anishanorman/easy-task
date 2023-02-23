import DeleteBtn from "./DeleteBtn";
import "./styles/Item.css";
import { useContext, useCallback, useEffect, useState, useRef } from "react";
import { Button, Form, FormGroup } from "react-bootstrap";
import { PresetsContext } from "../helpers/PresetsProvider";

export default function SinglePreset(props: any) {

  const { presets, newPreset, updatePresetName, deletePreset } = useContext(PresetsContext)

  const [editable, setEditable] = useState(false);

  const inputRef = useRef(null)

  const handleClick = (e: React.MouseEvent) => {
    if (e.detail === 2) {
      setEditable(true)
    }
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()
    const form = e.target as HTMLFormElement
    const input = form.elements[0] as HTMLInputElement;
    updatePresetName(props.path, input.value)
    setEditable(false)
  }

  const handleBlur = (e: any) => {
    console.log(e.target.value)
    updatePresetName(props.path, e.target.value)
    setEditable(false)
  }

  function handlePlusClick() {
    newPreset(props.path)
  }

  return (
    <div className="item" >
      {!editable && (
        <p onClick={handleClick}>
          {props.preset.task}
        </p>
      )}
      {editable && (
        <Form onSubmit={handleSubmit}>
          <Form.Control ref={inputRef} defaultValue={props.preset.task} placeholder="Enter Task" onBlur={handleBlur} autoFocus/>
          <Button type="submit">Save</Button>
        </Form>
      )}
      <DeleteBtn type="preset" path={props.path} />
      <span className="material-symbols-outlined" onClick={handlePlusClick} style={{cursor: "pointer"}}>
        add
      </span>
    </div>
  )
}
