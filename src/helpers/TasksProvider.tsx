import { createContext, useState, useEffect } from 'react';
import { Task, TasksContextValue } from '../types/task';

const TasksContext = createContext<TasksContextValue>({
    tasks: [],
    addTask: () => {},
    removeTask: () => {}
  })

function TasksProvider({ children }: any) {

  const storedTasks = localStorage.getItem("tasks")

  const [tasks, setTasks] = useState<Task[]>([])

    useEffect(() => {
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

  function removeTask(index: number) {
    // copy the current tasks array filtering out the task with the given name
    setTasks(prev => {
      const newTasks = [...prev]
      newTasks.splice(index, 1)
      return newTasks
    });
  }

  return (
    <TasksContext.Provider value={{tasks, addTask, removeTask}}>
      {children}
    </TasksContext.Provider>
  );
}

export { TasksProvider, TasksContext }