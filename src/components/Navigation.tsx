import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import { useContext } from "react";
import { TasksContext } from "../helpers/TasksProvider";
import { PresetsContext } from "../helpers/PresetsProvider";
import { Task } from "../types/task";
import { useNavigate } from "react-router-dom";
import Help from "./Help";

export default function Navigation(props: any) {
  const { addPreset, newTask, deleteTask } = useContext(TasksContext);
  const { presets, newPreset, resetToDefaults, deletePreset } =
    useContext(PresetsContext);
  const navigate = useNavigate();
  let type: string;

  const handleClick = (index: number) => (event: any) => {
    addPreset(presets[index]);
    navigate("/");
  };

  async function newInspo() {
    switch (Math.floor(Math.random() * 4)) {
      case 0:
        type = "recreational";
        break;
      case 1:
        type = "education";
        break;
      case 2:
        type = "social";
        break;
      case 3:
        type = "busywork";
        break;
    }
    await fetch(`http://www.boredapi.com/api/activity?type=${type}`)
      .then((response) => response.json())
      .then((response) => {
        addPreset({ task: response.activity, done: false, subtasks: [] });
      });
  }

  return (
    <Navbar className="justify-content-between" bg="dark" variant="dark">
      <Nav>
        <Navbar.Brand href="/">Easy Task</Navbar.Brand>
        <Nav.Link onClick={() => navigate("/")}>My Tasks</Nav.Link>
        <NavDropdown title="My Presets" id="nav-dropdown">
          <NavDropdown.Item onClick={() => navigate("/presets")}>
            Edit Presets
            <div
              className="material-symbols-outlined float-end"
              style={{ cursor: "pointer" }}
            >
              edit
            </div>
          </NavDropdown.Item>
					<NavDropdown.Divider />

          {presets &&
            presets.map((task: Task, index: number) => {
              return (
                <NavDropdown.Item
                  key={index}
                  eventKey={task.task}
                  onClick={handleClick(index)}
                >
                  {task.task}
                </NavDropdown.Item>
              );
            })}
        </NavDropdown>
      </Nav>
      <Nav>
        {props.presets && (
          <Nav.Link>
            <div
              className="material-symbols-outlined"
              onClick={() => resetToDefaults()}
              style={{ cursor: "pointer" }}
            >
              history
            </div>
            Reset
          </Nav.Link>
        )}
        <Nav.Link
          onClick={props.presets ? () => newPreset([]) : () => newTask([])}
        >
          <div className="material-symbols-outlined">add</div>
          New Task
        </Nav.Link>
        {props.tasks && (
          <Nav.Link onClick={() => newInspo()}>
            <div className="material-symbols-outlined">
              temp_preferences_custom
            </div>
            Inspire me!
          </Nav.Link>
        )}
        <Nav.Link
          onClick={
            props.presets ? () => deletePreset([]) : () => deleteTask([])
          }
        >
          <div className="material-symbols-outlined">delete_forever</div>
          Delete All
        </Nav.Link>
        <Nav.Link id="help-button">
          <Help />
        </Nav.Link>
      </Nav>
    </Navbar>
  );
}
