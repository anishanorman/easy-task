import { createContext, useCallback, useEffect } from "react";
import { Task, TasksContextValue } from "../types/task";
import { useImmer } from "use-immer";

const TasksContext = createContext<TasksContextValue>({
  tasks: [],
  addPreset: () => {},
  addTask: () => {},
  deleteTask: () => {},
  updateTaskDone: () => {},
  updateTaskName: () => {},
  updateTasks: () => {},
});

function TasksProvider({ children }: any) {
  const storedTasks = localStorage.getItem("tasks");
  const [tasks, setTasks] = useImmer<Task[]>(
    storedTasks ? JSON.parse(storedTasks) : []
  );

  function updateTaskCompletion(task: Task): Task {
    if (task.subtasks.length === 0) {
      // If there are no subtasks, the task is done if its "done" property is true
      return { ...task, done: task.done };
    }

    // Iterate through the subtasks and recursively call this function on each one
    const updatedSubtasks = task.subtasks.map(updateTaskCompletion);

    // Check if all subtasks are done
    const allSubtasksDone = updatedSubtasks.every((subtask) => subtask.done);

    if (allSubtasksDone) {
      // If all subtasks are done, mark this task as done as well
      return { ...task, done: true, subtasks: updatedSubtasks };
    }

    // Check if any subtask is not done
    const anySubtasksNotDone = updatedSubtasks.some((subtask) => !subtask.done);

    if (anySubtasksNotDone) {
      // If any subtask is not done, mark this task as not done
      return { ...task, done: false, subtasks: updatedSubtasks };
    }

    // If we got here, this task has subtasks but none of them are marked as done or not done
    // This should not be possible, but just in case, we return the original task
    return task;
  }

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  function addPreset(task: Task) {
    setTasks((draft) => {
      draft.push(task);
    });
  }

  function addTask(indexes: number[]) {
    setTasks((draft) => {
      const task = indexes
      .slice(0, -1)
      .reduce((acc, cur) => acc[cur].subtasks, draft)[indexes.slice(-1)[0]];
      task.subtasks.push({task: "New Task", done: false, subtasks: []})
    })
  }

  function deleteTask(indexes: number[]) {
    setTasks((draft) => {
      const taskList = indexes
        .slice(0, -1)
        .reduce((acc, cur) => acc[cur].subtasks, draft);
      taskList.splice(indexes.slice(-1)[0], 1);
    });
  }
  function updateTaskDone(indexes: number[], done: boolean=false) {
    setTasks((draft) => {
      const task = indexes
        .slice(0, -1)
        .reduce((acc, cur) => acc[cur].subtasks, draft)[indexes.slice(-1)[0]];
      task.done = done;
    });
  }

  function updateTaskName(indexes: number[], name: string) {
    setTasks((draft) => {
      const task = indexes
        .slice(0, -1)
        .reduce((acc, cur) => acc[cur].subtasks, draft)[indexes.slice(-1)[0]];
      task.task = name
    })
  }

  function updateTasks() {
    setTasks((draft) => {
      const updatedTasks = tasks.map(updateTaskCompletion);
  
      // Only update the state if the tasks have actually changed
      if (JSON.stringify(updatedTasks) !== JSON.stringify(draft)) {
        return updatedTasks;
      }
  
      return draft;
    });
  }
  

  return (
    <TasksContext.Provider
      value={{ tasks, addPreset, addTask, deleteTask, updateTaskDone, updateTaskName, updateTasks }}
    >
      {children}
    </TasksContext.Provider>
  );
}

export { TasksProvider, TasksContext };
