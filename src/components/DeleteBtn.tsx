import { TasksContext } from "../helpers/TasksProvider";
import { useContext } from "react";
import { PresetsContext } from "../helpers/PresetsProvider";

export default function DeleteBtn(props: any) {
  const { deleteTask } = useContext(TasksContext);
  const { deletePreset } = useContext(PresetsContext);

  function handleClick() {
    if (props.type === "task") {
      deleteTask(props.path);
    } else {
      deletePreset(props.path);
    }
  }

  return (
    <span className="material-symbols-outlined" onClick={handleClick} style={{color: "#b91104", fontVariationSettings: "'FILL' 1", cursor: "pointer"}}>
      delete_forever
    </span>
  );
}
