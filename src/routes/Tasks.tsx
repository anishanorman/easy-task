import { useContext } from "react"
import { TasksContext } from "../helpers/TasksProvider"
import "../components/styles/Tasks.css"
import Container from "../components/Container"

export default function Tasks() {

    const { tasks } = useContext(TasksContext)

    return(
        <div id="tasks">
            {tasks.map((task, index) => {
                return(
                    <Container key={index} task={task} index={index} interactive/>
                )
            })}
        </div>
    )
}