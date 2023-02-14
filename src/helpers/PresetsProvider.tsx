import { createContext, useState, useEffect } from 'react';
import { PresetsContextValue } from '../types/preset';
import { Task } from '../types/task';
import { fixedPresets } from './fixedPresets';

const PresetsContext = createContext<PresetsContextValue>({
    presets: [],
    addPreset: () => {},
    removePreset: () => {}
  })

function PresetsProvider({ children }: any) {

  const [presets, setPresets] = useState<Task[]>([])

  const storedPresets = localStorage.getItem("presets")

    useEffect(() => {
        if (storedPresets) {
            setPresets(JSON.parse(storedPresets))
            console.log(presets)
        } else {
            setPresets(fixedPresets)
        }
    }, [])

    useEffect(() => {
        localStorage.setItem("presets", JSON.stringify(presets))
    }, [presets])

  function addPreset(preset: Task) {
    setPresets([...presets, preset]);
  }

  function removePreset(index: number) {
    console.log(index)
    setPresets(prev => {
      const newPresets = [...prev]
      newPresets.splice(index, 1)
      return newPresets
    });
  }

  return (
    <PresetsContext.Provider value={{presets, addPreset, removePreset}}>
      {children}
    </PresetsContext.Provider>
  );
}

export { PresetsProvider, PresetsContext }