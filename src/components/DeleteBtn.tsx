import "./styles/DeleteBtn.css"
import { TasksContext } from "../helpers/TasksProvider"
import { useContext } from "react"
import { PresetsContext } from "../helpers/PresetsProvider"

export default function DeleteBtn(props: any) {

    const { deleteTask } = useContext(TasksContext)
    const { deletePreset } = useContext(PresetsContext)

    function handleClick(event: any) {
        if (props.type==="task") {
            deleteTask(props.path)
        } else {
            deletePreset(props.path)
        }

    }

    return (
        <button aria-label="Delete" onClick={handleClick}>
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zm2.46-7.12l1.41-1.41L12 12.59l2.12-2.12 1.41 1.41L13.41 14l2.12 2.12-1.41 1.41L12 15.41l-2.12 2.12-1.41-1.41L10.59 14l-2.13-2.12zM15.5 4l-1-1h-5l-1 1H5v2h14V4h-3.5z"/>
                <path d="M0 0h24v24H0z" fill="none"/>
            </svg>
        </button>
    )
}