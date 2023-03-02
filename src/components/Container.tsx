import {
  Accordion,
  AccordionContext,
  Card,
  ListGroup,
  ProgressBar,
  useAccordionButton,
} from "react-bootstrap";
import { Task } from "../types/task";
import { useContext, useState, useEffect } from "react";
import SingleTask from "./SingleTask";
import SinglePreset from "./SinglePreset";
import { TasksContext } from "../helpers/TasksProvider";

function MinMaxButton({ children, eventKey, callback }: any) {
  const { activeEventKey } = useContext(AccordionContext);

  const handleClick = useAccordionButton(
    eventKey,
    () => callback && callback(eventKey)
  );

  const expanded = activeEventKey === eventKey;

  return (
    <button type="button" onClick={handleClick}>
      {expanded ? (
        <span className="material-symbols-outlined">expand_less</span>
      ) : (
        <span className="material-symbols-outlined">expand_more</span>
      )}
      {children}
    </button>
  );
}

const styles = {
  done: {
    backgroundColor: "rgba(150, 150, 150, 0.5)",
  },
  ongoing: { backgroundColor: "" },
};

export default function Container(props: any) {
  const { newTask } = useContext(TasksContext);
  const task = props.task || props.preset;
  const [totalProgress, setTotalProgress] = useState<number>(0);

  // Calculates the total progress of a task and all its subtasks
  const calculateTotalProgress = (task: Task): number => {
    if (task.subtasks.length === 0) {
      return task.done ? 100 : 0;
    }

    let totalProgress = 0;
    task.subtasks.forEach((subtask) => {
      totalProgress += calculateTotalProgress(subtask);
    });

    return Math.round(totalProgress / task.subtasks.length);
  };

  // Update the total progress when the task or any of its subtasks change
  useEffect(() => {
    setTotalProgress(calculateTotalProgress(task));
  }, [task]);

  function handlePlusClick() {
    newTask(props.path);
  }

  if (task.subtasks.length > 0) {
    return (
      <Accordion defaultActiveKey={task.task}>
        <Card style={task.done ? styles.done : styles.ongoing}>
          {!props.child && (
            <ProgressBar now={totalProgress} label={`${totalProgress}%`} />
          )}
          <Card.Header style={{ border: task.subtasks.length > 0 ? "" : 0 }}>
            {props.task ? (
              <SingleTask path={props.path} task={task} parent />
            ) : (
              <SinglePreset path={props.path} preset={task} parent />
            )}
            <MinMaxButton eventKey={task.task} />
          </Card.Header>
          <Accordion.Collapse eventKey={task.task}>
            <Card.Body>
                {task.subtasks.map((subtask: Task, index: number) => {
                  return props.task ? (
                      <Container
                        path={[...props.path, index]}
                        key={index}
                        task={subtask}
                        child
                      />
                  ) : (
                    <Container
                      path={[...props.path, index]}
                      key={index}
                      preset={subtask}
                      child
                    />
                  );
                })}
              <span
                className="material-symbols-outlined"
                onClick={handlePlusClick}
                style={{ cursor: "pointer" }}
              >
                add
              </span>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    );
  }
  return props.task ? (
    <SingleTask path={props.path} task={task} smallest />
  ) : (
    <SinglePreset path={props.path} preset={task} smallest />
  );
}
