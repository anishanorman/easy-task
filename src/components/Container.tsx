import { Card } from "react-bootstrap"
import { propTypes } from "react-bootstrap/esm/Image"
import DeleteBtn from "./DeleteBtn"
import "./styles/Container.css"

export default function Container(props: any) {
    return(
        <Card>
            <Card.Header>
                {props.header}
                <DeleteBtn index={props.index}/>
            </Card.Header>
            <Card.Body>{props.body}</Card.Body>
        </Card>
    )
}