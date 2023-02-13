import { createContext, useState, useEffect } from 'react';
import { Task, TasksContextValue } from '../types/task';

const TasksContext = createContext<TasksContextValue>({
    tasks: [],
    addTask: () => {},
    removeTask: () => {}
  })

function TasksProvider({ children }: any) {
  const [tasks, setTasks] = useState<Task[]>([]);

    useEffect(() => {
        const storedTasks = localStorage.getItem("tasks")
        if (storedTasks) {
            setTasks(JSON.parse(storedTasks))
        }
    }, [])

    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks))
    }, [tasks])

  function addTask(task: Task) {
    // copy the current tasks array and add the new favorite to it
    setTasks([...tasks, task]);
  }

  function removeTask(name: string) {
    // copy the current tasks array filtering out the task with the given name
    setTasks(tasks.filter((task) => name !== task.task));
  }

  return (
    <TasksContext.Provider value={{tasks, addTask, removeTask}}>
      {children}
    </TasksContext.Provider>
  );
}

export { TasksProvider, TasksContext }