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
      <motion.ul>
        <AnimatePresence initial={false}>
          {presets.map((task, index) => {
            let path = [];
            if (index === 0) {
              return;
            }
            return (
              <motion.div
                key={index}
                className="task"
                initial={{ opacity: 0, scale: 0.3 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
              >
                <Container index={index} path={[index]} preset={task} />
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.ul>

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
