import DeleteBtn from "./DeleteBtn";
import "./styles/Item.css";
import { useContext, useCallback, useEffect, useState } from "react";
import { TasksContext } from "../helpers/TasksProvider";
import { Button, Form, FormGroup } from "react-bootstrap";

export default function Item(props: any) {

  const { tasks, updateTaskDone, updateTaskName, updateTasks, addTask } = useContext(TasksContext);

  const [editable, setEditable] = useState(false);
  const name = useState(props.task.task)

  const handleUpdateTasks = useCallback(() => {
    updateTasks();
  }, [tasks, updateTasks]);

  useEffect(() => {
    handleUpdateTasks();
  }, [handleUpdateTasks]);

  function crossedOut() {
    if (props.task.done) {
      return "line-through";
    } else {
      return "none";
    }
  }

  function handleCheckboxChange(event: React.ChangeEvent<HTMLInputElement>) {
    updateTaskDone(props.path, event.target.checked);
  }

  const handleClick = (e: React.MouseEvent) => {
    if (e.detail === 2) {
      setEditable(true)
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.target as HTMLFormElement
    const input = form.elements[0] as HTMLInputElement;
    updateTaskName(props.path, input.value)
    setEditable(false)
  };

  function handlePlusClick() {
    addTask(props.path)
  }

  return (
    <div className="item" style={editable ? { color: "red" } : { color: "" }}>
      {!props.smallest && <p>{props.progress}</p>}
      {props.smallest && (
        <input
          type="checkbox"
          onChange={handleCheckboxChange}
          checked={props.task.done}
        ></input>
      )}
      {!editable && (
        <p onClick={handleClick} style={{ textDecorationLine: crossedOut() }}>
          {props.task.task}
        </p>
      )}
      {editable && (
        <Form onSubmit={handleSubmit}>
          <Form.Control defaultValue={props.task.task} placeholder="Enter Task" />
          <Button type="submit">Save</Button>
        </Form>
      )}
      <DeleteBtn path={props.path} />
      <span className="material-symbols-outlined" onClick={handlePlusClick}>
        add
      </span>
    </div>
  );
}
