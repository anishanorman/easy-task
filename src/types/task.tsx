import { createContext } from "react";

export type Task = {
    task: string,
    progress: number,
    subtasks: Task[] | ""
}

export interface TasksContextValue {
    tasks: Task[];
    addTask: (task: Task) => void;
    removeTask: (index: number) => void;
  }
  
  export const TasksContext = createContext<TasksContextValue>({
    tasks: [],
    addTask: () => {},
    removeTask: () => {}
  });

export var localStorage: {
    getItem(key: string): string | null;
    setItem(key: string, value: string): void;
    removeItem(key: string): void;
    clear(): void;
  }
