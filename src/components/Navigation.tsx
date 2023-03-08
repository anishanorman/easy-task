import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import { useContext } from "react";
import { TasksContext } from "../helpers/TasksProvider";
import { PresetsContext } from "../helpers/PresetsProvider";
import { Task } from "../types/task";
import { useNavigate } from "react-router-dom";

export default function Navigation() {
  const { addPreset } = useContext(TasksContext);
  const { presets } = useContext(PresetsContext);
  const navigate = useNavigate();

  const handleClick = (index: number) => (event: any) => {
    addPreset(presets[index]);
    navigate("/");
  };

  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand href="/">Easy Task</Navbar.Brand>
      <Nav>
        <Nav.Link onClick={() => navigate("/")}>My Tasks</Nav.Link>
        <NavDropdown title="New Task" id="nav-dropdown">
          {presets &&
            presets.map((task: Task, index: number) => {
              if (index === 0) {
                return (
                  <div key={index}>
                    <NavDropdown.Item
                      eventKey={task.task}
                      onClick={handleClick(index)}
                    >
                      {task.task}
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                  </div>
                );
              } else {
                return (
                  <NavDropdown.Item
                    key={index}
                    eventKey={task.task}
                    onClick={handleClick(index)}
                  >
                    {task.task}
                  </NavDropdown.Item>
                );
              }
            })}
        </NavDropdown>
        <Nav.Link href="/presets">My Presets</Nav.Link>
      </Nav>
    </Navbar>
  );
}
