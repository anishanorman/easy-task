import DeleteBtn from "./DeleteBtn";
import { useContext, useCallback, useEffect, useState, useRef } from "react";
import { TasksContext } from "../helpers/TasksProvider";
import { Button, Form } from "react-bootstrap";
import editIcon from "../assets/editIcon";

export default function SingleTask(props: any) {
  const { tasks, updateTaskDone, updateTaskName, updateTasks, newTask } =
    useContext(TasksContext);

  const [editable, setEditable] = useState(false);

  const inputRef = useRef(null);

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
    console.log(e);
    if (e.detail === 2) {
      setEditable(true);
    }
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const input = form.elements[0] as HTMLInputElement;
    if (input.value.length > 0) {
      updateTaskName(props.path, input.value);
    }
    setEditable(false);
  };

  const handleBlur = (e: any) => {
    if (e.target.value.length > 0) {
      updateTaskName(props.path, e.target.value);
    }
    setEditable(false);
  };

  function handlePlusClick() {
    newTask(props.path);
  }

  return (
    <div className="item">
      {props.smallest && (
        <input
          type="checkbox"
          onChange={handleCheckboxChange}
          checked={props.task.done}
        ></input>
      )}
      {!editable && (
        <div>
          {props.parent ? (
            <strong>
              <p
                onClick={handleClick}
                style={{
                  textDecorationLine: crossedOut(),
                  cursor: `url(${editIcon}), auto`,
                }}
              >
                {props.task.task}
              </p>
            </strong>
          ) : (
            <p
              onClick={handleClick}
              style={{ textDecorationLine: crossedOut() }}
            >
              {props.task.task}
            </p>
          )}

          <div className="icons">
            <DeleteBtn type="task" path={props.path} />
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
        <Form onSubmit={handleSubmit} onBlur={handleBlur}>
          <Form.Control
            ref={inputRef}
            defaultValue={props.task.task}
            placeholder="Enter Task"
            autoFocus
          />
          <Button type="submit">Save</Button>
        </Form>
      )}
    </div>
  );
}
