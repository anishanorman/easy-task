import { useState, useEffect, useContext } from "react"
import "./styles/PresetButtons.css"
import { TasksContext } from "../helpers/TasksProvider"
import { Task } from "../types/task"
import { Button } from "react-bootstrap"



export default function PresetButtons() {

    const { addTask } = useContext(TasksContext)

    const [presets, setPresets] = useState([])

    useEffect(() => {
        const storedPresets = localStorage.getItem("presets")
        if (storedPresets) {
            setPresets(JSON.parse(storedPresets))
        }
    }, [])

    const handleClick = (index: number) => (event: any) => {
        addTask(presets[index])
    }

    return(
        <div id="preset-buttons">
            {(presets) && presets.map((task: Task, index: number) => {
                return (
                    <Button key={task.task} onClick={handleClick(index)}>{task.task}</Button>
                )
            })}
        </div>
    )
}