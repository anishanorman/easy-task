import { createContext } from "react";
import { Task } from "./task";

export interface PresetsContextValue {
    presets: Task[];
    addPreset: (preset: Task) => void;
    removePreset: (index: number) => void;
  }
  
  export const PresetsContext = createContext<PresetsContextValue>({
    presets: [],
    addPreset: () => {},
    removePreset: () => {}
  });