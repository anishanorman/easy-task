import { useState } from "react";
import DeleteBtn from "./DeleteBtn";
import "./styles/Item.css";
import { useContext } from "react"
import { TasksContext } from "../helpers/TasksProvider";

export default function Item(props: any) {

  const { updateTask } = useContext(TasksContext)

  function findProgress() {
    //find out how many subtasks there are
    const subtasks = props.task.subtasks.length
    //find out how many subtasks are done
    var count = 0
    for (let i in props.task.subtasks) {
        if (props.task.subtasks[i].done) {
            count++
        }
    }

    if (count/subtasks===1) {
        updateTask(props.path, true)
    } else {
        updateTask(props.path, false)
    }

    return `${count}/${subtasks}`

  }

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
        {!props.smallest && <p>{findProgress()}</p>}
      {props.smallest && <input type="checkbox" onChange={handleChange} checked={props.task.done}></input>}
      <p style={{ textDecorationLine: crossedOut() }}>{`${props.task.task}: ${props.path}`}</p>
      <DeleteBtn path={props.path} />
    </div>
  );
}
