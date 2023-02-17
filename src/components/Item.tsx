import DeleteBtn from "./DeleteBtn";
import "./styles/Item.css"

export default function Item(props: any) {
    return(
        <div className="item">
            <p>{props.task.task}</p>
            <DeleteBtn path={props.path}/>
        </div>
    )
}