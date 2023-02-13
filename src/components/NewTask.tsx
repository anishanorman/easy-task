import Container from "./Container";
import PresetButtons from "./PresetButtons";

export default function NewTask() {
    return(
        <div>
            <Container header="New Task" body={<PresetButtons />}/>
        </div>
    )
}