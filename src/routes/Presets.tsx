import { useContext } from "react";
import Container from "../components/Container";
import { PresetsContext } from "../helpers/PresetsProvider";
import { motion, AnimatePresence } from "framer-motion";

export default function Presets() {
  const { presets, newPreset } = useContext(PresetsContext);

  function handleClick() {
    newPreset([]);
  }

  return (
    <div id="presets">
          {presets.map((task, index) => {
            let path = [];
            if (index === 0) {
              return;
            }
            return (
                <Container className="task" key={index} index={index} path={[index]} preset={task} outer />
            );
          })}

      <div
        className="material-symbols-outlined add-button"
        onClick={handleClick}
        style={{ cursor: "pointer" }}
      >
        add
      </div>
    </div>
  );
}
