import "./App.css";
import Tasks from "./routes/Tasks";
import { TasksProvider } from "./helpers/TasksProvider";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PresetsProvider } from "./helpers/PresetsProvider";
import Navigation from "./components/Navigation";
import Presets from "./routes/Presets";

function App() {
  return (
    <PresetsProvider>
      <TasksProvider>
        <div className="App">
          <BrowserRouter>
              <Routes>
                <Route path="/" element={<Tasks />} />
                <Route path="/presets" element={<Presets />} />
              </Routes>
          </BrowserRouter>
        </div>
      </TasksProvider>
    </PresetsProvider>
  );
}

export default App;
