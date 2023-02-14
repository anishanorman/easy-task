import { Nav, Navbar, NavDropdown } from "react-bootstrap"
import { useContext } from "react"
import { TasksContext } from "../helpers/TasksProvider"
import { PresetsContext } from "../helpers/PresetsProvider"
import { Task } from "../types/task"

export default function Navigation() {

    const { addTask } = useContext(TasksContext)
    const { presets } = useContext(PresetsContext)
  
    const handleClick = (index: number) => (event: any) => {
        addTask(presets[index])
    }

    return (
        <Navbar bg="dark" variant="dark">
            <Navbar.Brand href="/">Easy Task</Navbar.Brand>
            <Nav>
                <Nav.Link href="/">My Tasks</Nav.Link>
                <NavDropdown title="Presets" id="nav-dropdown">
                {(presets) && presets.map((task: Task, index: number) => {
                    return (
                        <NavDropdown.Item key={index} eventKey={task.task} onClick={handleClick(index)}>{task.task}</NavDropdown.Item>
                    )
                })}
                </NavDropdown>
            </Nav>
        </Navbar>
    )
}