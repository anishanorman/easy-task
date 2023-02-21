import { createContext } from "react";

export type Task = {
    task: string,
    done: boolean,
    subtasks: Task[]
}

export interface TasksContextValue {
    tasks: Task[];
    addTask: (task: Task) => void;
    removeTask: (index: number) => void;
    updateTask: (indexes: number[], done: boolean) => void;
  }
  
  export const TasksContext = createContext<TasksContextValue>({
    tasks: [],
    addTask: () => {},
    removeTask: () => {},
    updateTask: () => {}
  });

export var localStorage: {
    getItem(key: string): string | null;
    setItem(key: string, value: string): void;
    removeItem(key: string): void;
    clear(): void;
  }
