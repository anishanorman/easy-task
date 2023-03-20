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
import { PresetsContext } from "../helpers/PresetsProvider";

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
  const { newPreset } = useContext(PresetsContext);

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
    if (props.task) {
      newTask(props.path);
    } else {
      newPreset(props.path);
    }
  }

  if (task.subtasks.length > 0) {
    return (
      <Accordion
        defaultActiveKey={task.task}
        style={{ backgroundColor: totalProgress==100? "rgba(104, 131, 155, 0.2)" : "" }}
      >
        {props.task && (
          <ProgressBar
            now={totalProgress}
            style={props.child ? { height: 5 + "px" } : { height: 10 + "px" }}
            variant={totalProgress == 100 ? "secondary" : ""}
          />
        )}

        <div className="header">
          {props.task ? (
            <SingleTask path={props.path} task={task} parent />
          ) : (
            <SinglePreset path={props.path} preset={task} parent />
          )}
          <MinMaxButton eventKey={task.task} />
        </div>
        <Accordion.Collapse eventKey={task.task}>
          <div className="content">
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
          </div>
        </Accordion.Collapse>
      </Accordion>
    );
  }

  if (props.outer) {
    return props.task ? (
      <div className="single">
        <SingleTask path={props.path} task={task} smallest />
      </div>
    ) : (
      <div className="single">
        <SinglePreset path={props.path} preset={task} smallest />
      </div>
    );
  }

  return props.task ? (
    <SingleTask path={props.path} task={task} smallest />
  ) : (
    <SinglePreset path={props.path} preset={task} smallest />
  );
}
