import { Card, ProgressBar } from "react-bootstrap"
import DeleteBtn from "./DeleteBtn"
import "./styles/Container.css"

export default function Container(props: any) {
    const task = props.task
    console.log(task)
    return(
        <Card>
            <Card.Header>
                {task.task}
                <DeleteBtn index={props.index}/>
            </Card.Header>
            <Card.Body>

            </Card.Body>
        </Card>
    )
}