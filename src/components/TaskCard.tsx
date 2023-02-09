import { ListGroup, Form } from "react-bootstrap"
import Card from "react-bootstrap/Card"
import SubTask from "./SubTask"

export default function TaskCard(props: any) {

    return (
        <Card style={{ width: "45%", height: "fit-content" }}>
            <Card.Header style={{ border: `${(props.task.subtasks.length === 0) && "none"}` }}>{props.task.task}</Card.Header>
                <ListGroup>
                    {props.task.subtasks.map((task: any, index: string) => {
                        return (
                            <SubTask key={task.task} task={task} index={index} />
                        )
                    })}
                </ListGroup>
        </Card>
    )
}