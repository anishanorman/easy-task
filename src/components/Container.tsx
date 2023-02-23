import { Accordion, Card, useAccordionButton } from "react-bootstrap";
import { Task } from "../types/task";
import { useState } from "react";
import "./styles/Container.css";
import SingleTask from "./SingleTask";
import SinglePreset from "./SinglePreset";

function MinMaxButton({ children, eventKey }: any) {
  const [expanded, setExpanded] = useState(false);

  const handleClick = useAccordionButton(eventKey, () =>
    expanded ? setExpanded(false) : setExpanded(true)
  );

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
  const task = props.task || props.preset;

  if (task.subtasks.length > 0) {
    return (
      <Accordion>
        <Card style={task.done ? styles.done : styles.ongoing}>
          <Card.Header style={{ border: task.subtasks.length > 0 ? "" : 0 }}>
            {props.task ? (
              <SingleTask path={props.path} task={task} />
            ) : (
              <SinglePreset path={props.path} preset={task} />
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
                  />
                ) : (
                  <Container
                    path={[...props.path, index]}
                    key={index}
                    preset={subtask}
                  />
                );
              })}
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
