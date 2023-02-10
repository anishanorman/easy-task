import './App.css';
import Task from './components/Task';
import { getTasks, searchTasks } from './helpers/useLocalStorage';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Card } from "react-bootstrap"

function App() {

  const tasks = (getTasks())

  return (
    <div className="App">
      {tasks?.map((task: any, index: number) => {
        return( <Card key={task.task} style={{width: "25%", height: "fit-content"}}>
          <Task index={index} task={task}/>
          </Card>)
      })}
    </div>
  );
}

export default App;
