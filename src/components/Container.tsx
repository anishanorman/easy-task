import { Accordion, Card } from "react-bootstrap";
import CardHeader from "react-bootstrap/esm/CardHeader";
import { Task } from "../types/task";
import DeleteBtn from "./DeleteBtn";
import Item from "./Item";
import "./styles/Container.css";

export default function Container(props: any) {
  const task = props.task;
  return (
    <Card>
      <Card.Header style={{ border: task.subtasks.length > 0 ? "" : 0 }}>
        <Item task={task} />
      </Card.Header>

      {task.subtasks.length > 0 && (
        <Card.Body>
          {task.subtasks.length === 1 ? (
            <Item task={task.subtasks[0]} />
          ) : (
            task.subtasks.map((subtask: Task) => {
                return(<Container key={subtask} task={subtask} />)
            })
          )}
        </Card.Body>
      )}
    </Card>
  );
}
