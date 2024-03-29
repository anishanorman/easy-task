import { createContext, useEffect } from "react";
import { PresetsContextValue } from "../types/preset";
import { Task } from "../types/task";
import { useImmer } from "use-immer";
import { fixedPresets } from "./fixedPresets";

const PresetsContext = createContext<PresetsContextValue>({
  presets: [],
  newPreset: () => {},
  deletePreset: () => {},
  updatePresetName: () => {},
  resetToDefaults: () => {},
});

function PresetsProvider({ children }: any) {
  const storedPresets = localStorage.getItem("presets");
  const [presets, setPresets] = useImmer<Task[]>(
    storedPresets ? JSON.parse(storedPresets) : fixedPresets
  );

  useEffect(() => {
    localStorage.setItem("presets", JSON.stringify(presets));
  }, [presets]);

  function newPreset(indexes: number[]) {
    if (indexes.length === 0) {
      setPresets((draft: Task[]) => {
        draft.push({ task: "New Preset", done: false, subtasks: [] });
      });
    } else {
      setPresets((draft: Task[]) => {
        const preset = indexes
          .slice(0, -1)
          .reduce((acc, cur) => acc[cur].subtasks, draft)[indexes.slice(-1)[0]];
        preset.subtasks.push({ task: "New Preset", done: false, subtasks: [] });
      });
    }
  }

  function resetToDefaults() {
    console.log("resettin");
    setPresets(fixedPresets);
  }

  function deletePreset(indexes: number[]) {
    if (indexes.length === 0) {
      setPresets([]);
    } else {
      setPresets((draft: Task[]) => {
        const presetList = indexes
          .slice(0, -1)
          .reduce((acc, cur) => acc[cur].subtasks, draft);
        presetList.splice(indexes.slice(-1)[0], 1);
      });
    }
  }

  function updatePresetName(indexes: number[], name: string) {
    setPresets((draft: Task[]) => {
      const preset = indexes
        .slice(0, -1)
        .reduce((acc, cur) => acc[cur].subtasks, draft)[indexes.slice(-1)[0]];
      preset.task = name;
    });
  }

  return (
    <PresetsContext.Provider
      value={{
        presets,
        newPreset,
        deletePreset,
        updatePresetName,
        resetToDefaults,
      }}
    >
      {children}
    </PresetsContext.Provider>
  );
}

export { PresetsProvider, PresetsContext };
