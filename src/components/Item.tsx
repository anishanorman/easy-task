import { useState } from "react";
import DeleteBtn from "./DeleteBtn";
import "./styles/Item.css";
import { useContext } from "react"
import { TasksContext } from "../helpers/TasksProvider";

export default function Item(props: any) {

  const { updateTask } = useContext(TasksContext)

  function crossedOut() {
    if (props.task.done) {
        return "line-through"
    } else {
        return "none"
    }
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    updateTask(props.path, event.target.checked)
  }
  return (
    <div className="item">
        {!props.smallest && <p>{props.progress}</p>}
      {props.smallest && <input type="checkbox" onChange={handleChange} checked={props.task.done}></input>}
      <p style={{ textDecorationLine: crossedOut() }}>{`${props.task.task}: ${props.path}`}</p>
      <DeleteBtn path={props.path} />
    </div>
  );
}
