import { createContext, useState, useEffect } from 'react';
import { Task, TasksContextValue } from '../types/task';
import { useImmer } from 'use-immer';

const TasksContext = createContext<TasksContextValue>({
  tasks: [],
  addTask: () => {},
  removeTask: () => {},
  updateTask: () => {}
});

function TasksProvider({ children }: any) {
  const storedTasks = localStorage.getItem('tasks');
  const [tasks, setTasks] = useImmer<Task[]>(storedTasks ? JSON.parse(storedTasks) : []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  function addTask(task: Task) {
    setTasks(draft => {
      draft.push(task);
    });
  }

  function removeTask(index: number) {
    setTasks(draft => {
      draft.splice(index, 1);
    });
  }

  function updateTask(indexes: number[], done: boolean) {
    setTasks(draft => {
      const task = indexes.slice(0, -1).reduce((acc, cur) => acc[cur].subtasks, draft)[indexes.slice(-1)[0]];
      task.done = done;
    });
  }

  return (
    <TasksContext.Provider value={{ tasks, addTask, removeTask, updateTask }}>
      {children}
    </TasksContext.Provider>
  );
}

export { TasksProvider, TasksContext };
