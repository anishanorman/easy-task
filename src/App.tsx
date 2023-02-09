import './App.css';
import TaskCard from './components/TaskCard';
import { getTasks } from './helpers/useLocalStorage';
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {

  const tasks = (getTasks())

  return (
    <div className="App">
      {tasks?.map((task: object, index: number) => {
        return <TaskCard key={index} task={task}/>
      })}
    </div>
  );
}

export default App;
