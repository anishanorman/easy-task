import { createContext } from "react";

export type Task = {
    task: string,
    done: boolean,
    subtasks: Task[]
}

export interface TasksContextValue {
    tasks: Task[];
    addPreset: (task: Task) => void;
    addTask: (indexes: number[]) => void;
    deleteTask: (indexes: number[]) => void;
    updateTaskDone: (indexes: number[], done: boolean) => void;
    updateTaskName: (indexes: number[], name: string) => void;
    updateTasks: () => void;
  }
  
  export const TasksContext = createContext<TasksContextValue>({
    tasks: [],
    addPreset: () => {},
    addTask: () => {},
    deleteTask: () => {},
    updateTaskDone: () => {},
    updateTaskName: () => {},
    updateTasks: () => {}
  });

export var localStorage: {
    getItem(key: string): string | null;
    setItem(key: string, value: string): void;
    removeItem(key: string): void;
    clear(): void;
  }
