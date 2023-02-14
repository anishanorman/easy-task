import Container from "./Container";

export default function Task(props: any) {

    return(
        <Container header={props.task} index={props.index}/>
    )
}