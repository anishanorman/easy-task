import { useContext } from "react";
import { TasksContext } from "../helpers/TasksProvider";
import Container from "../components/Container";
import { motion, AnimatePresence } from "framer-motion";

export default function Tasks() {
  const { tasks } = useContext(TasksContext);

  return (
    <div id="tasks">
      <motion.ul>
        <AnimatePresence initial={false}>
          {tasks.map((task, index) => {
            return (
              <motion.div
                key={task.task}
                className="task"
                initial={{ opacity: 0, scale: 0.3 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
              >
                <Container index={index} path={[index]} task={task} />
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.ul>
    </div>
  );
}
