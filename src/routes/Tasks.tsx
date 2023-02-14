import Task from "../components/Task"
import { useContext } from "react"
import { TasksContext } from "../helpers/TasksProvider"
import "../components/styles/Tasks.css"

export default function Tasks() {

    const { tasks } = useContext(TasksContext)

    return(
        <div id="tasks">
            {tasks.map((task, index) => {
                return(
                    <Task key={index} task={task.task} index={index} />
                )
            })}
        </div>
    )
}