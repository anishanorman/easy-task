import { Form, ListGroup, ProgressBar } from "react-bootstrap"
import Accordion from "react-bootstrap/Accordion"
import { useState } from "react"

export default function SubTask(props: any) {

    const [progress, setProgress] = useState(50)

    console.log(props)

    if(props.task.subtasks.length > 1) {
        return(
            <Accordion defaultActiveKey="null">
                <Accordion.Item eventKey={props.key}>
                    <Accordion.Header>
                        {props.task.task}
                        
                    </Accordion.Header>
                    <ProgressBar now={progress} />
                    <Accordion.Body>
                    {props.task.subtasks.map((task: any, index: string) => {
                        return(
                    <SubTask key={task.task} task={task} index={index} />
                )
            })}
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        )
    }

    return(
        <ListGroup.Item>
            <Form.Check type="checkbox" label={props.task.task} />
        </ListGroup.Item>
    )

    // {props.task.subtasks.map((task: any) => {
    //     return(
    //         <SubTask key={task.task} task={task.task}/>
    //     )
    // })}
}