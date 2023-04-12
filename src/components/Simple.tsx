import { useState, useContext, useEffect } from "react";
import {
  Accordion,
  AccordionContext,
  Button,
  Modal,
  ProgressBar,
  useAccordionButton,
} from "react-bootstrap";
import { TasksContext } from "../helpers/TasksProvider";
import { Task } from "../types/task";
import SingleTask from "./SingleTask";
import Container from "./Container";

export default function Simple(props: any) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { newTask } = useContext(TasksContext);

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
      <Accordion
        defaultActiveKey={task.task}
        style={{
          backgroundColor:
            totalProgress === 100 ? "rgba(104, 131, 155, 0.2)" : "",
        }}
      >
        {props.task && (
          <>
            <ProgressBar
              now={totalProgress}
              style={props.child ? { height: 5 + "px" } : { height: 10 + "px" }}
              variant={totalProgress === 100 ? "secondary" : ""}
            />
            <span
              className="material-symbols-outlined"
              onClick={handleShow}
              style={{ cursor: "pointer" }}
            >
              open_in_full
            </span>

            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>
                  <SingleTask path={props.path} task={task} parent />
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
              {task.subtasks.map((subtask: Task, index: number) => {
              return(
                <Container
                  path={[...props.path, index]}
                  key={index}
                  task={subtask}
                  child
                />
            )})}
              </Modal.Body>
            </Modal>
          </>
        )}

        <div className="header">
          <SingleTask path={props.path} task={task} parent />
          <MinMaxButton eventKey={task.task} />
        </div>
        <Accordion.Collapse eventKey={task.task}>
          <div className="content">
            {task.subtasks.map((subtask: Task, index: number) => {
              return (
                <Container
                  path={[...props.path, index]}
                  key={index}
                  task={subtask}
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
    return (
      <div className="single">
        <SingleTask path={props.path} task={task} smallest />
      </div>
    );
  }

  return <SingleTask path={props.path} task={task} smallest />;
}