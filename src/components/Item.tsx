import DeleteBtn from "./DeleteBtn";
import "./styles/Item.css";
import { useContext, useCallback, useEffect } from "react"
import { TasksContext } from "../helpers/TasksProvider";

export default function Item(props: any) {

  const { tasks, updateTask, updateTasks } = useContext(TasksContext)

  const handleUpdateTasks = useCallback(() => {
    updateTasks();
  }, [tasks, updateTasks]);

  useEffect(() => {
    handleUpdateTasks();
  }, [handleUpdateTasks]);

  function crossedOut() {
    if (props.task.done) {
        return "line-through"
    } else {
        return "none"
    }
  }

  function handleCheckboxChange(event: React.ChangeEvent<HTMLInputElement>) {
    updateTask(props.path, event.target.checked)
  }
  return (
    <div className="item">
        {!props.smallest && <p>{props.progress}</p>}
      {props.smallest && <input type="checkbox" onChange={handleCheckboxChange} checked={props.task.done}></input>}
      <p style={{ textDecorationLine: crossedOut() }}>{`${props.task.task}: ${props.path}`}</p>
      <DeleteBtn path={props.path} />
    </div>
  );
}
