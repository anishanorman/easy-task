import { Accordion, Card, useAccordionButton } from "react-bootstrap";
import { Task } from "../types/task";
import Item from "./Item";
import { useState } from "react";
import "./styles/Container.css";

function MinMaxButton({ children, eventKey }: any) {
  const [expanded, setExpanded] = useState(false);


  const handleClick = useAccordionButton(eventKey, () =>
    expanded? setExpanded(false) : setExpanded(true)
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

export default function Container(props: any) {

  const [progress, setProgress] = useState(0);

  const task = props.task;

  if (task.subtasks.length > 0) {
    return (
      <Accordion>
        <Card>
          <Card.Header style={{ border: task.subtasks.length > 0 ? "" : 0 }}>
            <Item path={props.path} task={task} />
            <MinMaxButton eventKey={props.task.task} />
          </Card.Header>
          <Accordion.Collapse eventKey={props.task.task}>
            <Card.Body>
              {task.subtasks.length === 1 ? (
                <Item path={[...props.path, 0]} task={task.subtasks[0]} smallest/>
              ) : (
                task.subtasks.map((subtask: Task, index: number) => {
                  return <Container path={[...props.path, index]} key={subtask.task} task={subtask} />
                })
              )}
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    );
  }
  return <Item path={props.path} task={task} smallest/>;
}
