import { useContext } from "react";
import Container from "../components/Container";
import { PresetsContext } from "../helpers/PresetsProvider";
import { fixedPresets } from "../helpers/fixedPresets";
import Navigation from "../components/Navigation";

export default function Presets() {
  const { presets, newPreset, resetToDefaults } = useContext(PresetsContext);

  return (
    <div>
      <Navigation presets/>
      <div id="presets">
        {presets.map((task, index) => {
          let path = [];
          return (
            <Container
              className="task"
              key={index}
              index={index}
              path={[index]}
              preset={task}
              outer
            />
          );
        })}
      </div>
    </div>
  );
}
