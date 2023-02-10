import { ListGroup, Form, Accordion, ProgressBar } from "react-bootstrap"
import { useState } from "react"
import { formatPath, getTasks, searchTasks } from "../helpers/useLocalStorage"

export default function Task(props: any) {

    const progress = 90

    function handleCheckboxChange() {
        console.log(searchTasks( getTasks(), props.task.task))
    }

    if(props.task.subtasks.length >= 1) {
        return(
<Accordion defaultActiveKey="null">
                <Accordion.Item eventKey={props.index}>
                    <Accordion.Header>
                        {props.task.task}
                        
                    </Accordion.Header>
                    <ProgressBar now={progress} />
                    <Accordion.Body>
                    {props.task.subtasks.map((task: any, index: string) => {
                        return(
                    <Task key={task.task} task={task} index={index} />
                )
            })}
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion> 
        )
    }

    return(
        <ListGroup.Item>
            <Form.Check type="checkbox" id={props.task.task} label={props.task.task} onChange={handleCheckboxChange}/>
        </ListGroup.Item>
    )
}