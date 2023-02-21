import { useContext } from "react";
import { TasksContext } from "../helpers/TasksProvider";
import "../components/styles/Tasks.css";
import Container from "../components/Container";

export default function Tasks() {
  const { tasks } = useContext(TasksContext)

  return (
    <div id="tasks">
      {tasks.map((task, index) => {
        let path=[]
        return (
          <div key={task.task} className="task">
            <Container index={index} path={[index]} task={task} />
          </div>
        )
      })}
    </div>
  );
}
