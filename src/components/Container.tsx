import { Accordion, Card, useAccordionButton } from "react-bootstrap";
import { Task } from "../types/task";
import Item from "./Item";
import { useState } from "react";
import "./styles/Container.css";

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

export default function Container(props: any) {
  const task = props.task;

  function findProgress() {
    //find out how many subtasks there are
    const subtasks = props.task.subtasks.length
    //find out how many subtasks are done
    var count = 0
    for (let i in props.task.subtasks) {
        if (props.task.subtasks[i].done) {
            count++
        }
    }

    // if (count/subtasks===1) {
    //     updateTask(props.path, true)
    // } else {
    //     updateTask(props.path, false)
    // }

    return `${count}/${subtasks}`

  }

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
                <Item
                  path={[...props.path, 0]}
                  task={task.subtasks[0]}
                  smallest
                />
              ) : (
                task.subtasks.map((subtask: Task, index: number) => {
                  return (
                    <Container
                      path={[...props.path, index]}
                      key={subtask.task}
                      task={subtask}
                    />
                  );
                })
              )}
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    );
  }
  return <Item path={props.path} task={task} smallest />;
}
