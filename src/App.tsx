import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import Tasks from './routes/Tasks';
import { presets } from './helpers/presets';
import { TasksProvider } from './helpers/TasksProvider';

function App() {

  if (!localStorage.getItem("presets")) {
    console.log("No presets set! one sec...")
    localStorage.setItem("presets", JSON.stringify(presets))
  }

  return (
    <TasksProvider>
      <div className="App">
        <Tasks />
      </div>
    </TasksProvider>

  );
}

export default App;
