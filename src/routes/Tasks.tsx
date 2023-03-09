import { useContext } from "react";
import { TasksContext } from "../helpers/TasksProvider";
import Container from "../components/Container";

export default function Tasks() {
  const { tasks } = useContext(TasksContext);

  return (
      <div id="tasks">
        {tasks.map((task, index) => {
          return (
            <Container
              className="task"
              key={index}
              index={index}
              path={[index]}
              task={task}
              outer
            />
          );
        })}
      </div>
  );
}
