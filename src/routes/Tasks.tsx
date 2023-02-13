import NewTask from "../components/NewTask"
import { useContext, useEffect } from "react"
import { TasksContext } from "../helpers/TasksProvider"
import { presets } from "../helpers/presets"

export default function Tasks() {

    return(
        <div id="tasks">
            <NewTask />
        </div>
    )
}