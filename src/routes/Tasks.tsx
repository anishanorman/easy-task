import { useContext } from "react";
import { TasksContext } from "../helpers/TasksProvider";
import Container from "../components/Container";
import Navigation from "../components/Navigation";
import Simple from "../components/Simple";


export default function Tasks() {
  const { tasks } = useContext(TasksContext);

  return (
    <div>
      <Navigation tasks/>
      <div id="tasks">
        {tasks.map((task, index) => {
          return (
            <Simple
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
    </div>
  );
}
