import { createContext } from "react";
import { Task } from "./task";

export interface PresetsContextValue {
    presets: Task[];
    newPreset: (indexes: number[]) => void;
    deletePreset: (indexes: number[]) => void;
    updatePresetName: (indexes: number[], name: string) => void;
    resetToDefaults: () => void;
  }
  
export const TasksContext = createContext<PresetsContextValue>({
    presets: [],
    newPreset: () => {},
    deletePreset: () => {},
    updatePresetName: () => {},
    resetToDefaults: () => {}
});

export var localStorage: {
    getItem(key: string): string | null;
    setItem(key: string, value: string): void;
    removeItem(key: string): void;
    clear(): void;
  }
