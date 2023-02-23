import { useContext } from "react";
import "../components/styles/Tasks.css";
import Container from "../components/Container";
import { PresetsContext } from "../helpers/PresetsProvider";

export default function Presets() {
  const { presets, newPreset } = useContext(PresetsContext);

    function handleClick() {
        newPreset([])
    }

  return (
    <div id="presets">
      {presets.map((task, index) => {
        let path = []
        if (index === 0) {
          return
        }
        return (
          <div key={index} className="task">
            <Container index={index} path={[index]} preset={task} />
          </div>
        );
      })}
      <div
        className="material-symbols-outlined"
        onClick={handleClick}
        style={{ cursor: "pointer" }}
      >
        add
      </div>
    </div>
  );
}
