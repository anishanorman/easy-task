import { Card } from "react-bootstrap"
import "./styles/Container.css"

export default function Container(props: any) {
    return(
        <Card>
            <Card.Header>{props.header}</Card.Header>
            <Card.Body>{props.body}</Card.Body>
        </Card>
    )
}