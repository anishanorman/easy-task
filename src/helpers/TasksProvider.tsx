import { createContext, useEffect } from "react";
import { Task, TasksContextValue } from "../types/task";
import { useImmer }  from "use-immer"

const TasksContext = createContext<TasksContextValue>({
  tasks: [],
  addPreset: () => {},
  newTask: () => {},
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
      return { ...task, done: task.done };
    }

    const updatedSubtasks = task.subtasks.map(updateTaskCompletion);
    const allSubtasksDone = updatedSubtasks.every((subtask) => subtask.done);

    if (allSubtasksDone) {
      return { ...task, done: true, subtasks: updatedSubtasks };
    }

    const anySubtasksNotDone = updatedSubtasks.some((subtask) => !subtask.done);

    if (anySubtasksNotDone) {
      return { ...task, done: false, subtasks: updatedSubtasks };
    }
    return task;
  }

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks])

  function addPreset(task: Task) {
    setTasks((draft: Task[]) => {
      draft.push(task)
    })
  }

  function newTask(indexes: number[]) {
    if (indexes.length===0) {
      setTasks((draft: Task[]) => {
        draft.push({ task: "New Task", done: false, subtasks: [] });
      });
    } else {
      setTasks((draft: Task[]) => {
        const task = indexes
        .slice(0, -1)
        .reduce((acc, cur) => acc[cur].subtasks, draft)[indexes.slice(-1)[0]];
        task.subtasks.push({task: "New Task", done: false, subtasks: []})
      })
    }

  }

  function deleteTask(indexes: number[]) {
    if (indexes.length===0) {
      setTasks([])
    } else {
      setTasks((draft: Task[]) => {
        const taskList = indexes
          .slice(0, -1)
          .reduce((acc, cur) => acc[cur].subtasks, draft);
        taskList.splice(indexes.slice(-1)[0], 1);
      });
    }

  }
  function updateTaskDone(indexes: number[], done: boolean=false) {
    setTasks((draft: Task[]) => {
      const task = indexes
        .slice(0, -1)
        .reduce((acc, cur) => acc[cur].subtasks, draft)[indexes.slice(-1)[0]];
      task.done = done;
    });
  }

  function updateTaskName(indexes: number[], name: string) {
    setTasks((draft: Task[]) => {
      const task = indexes
        .slice(0, -1)
        .reduce((acc, cur) => acc[cur].subtasks, draft)[indexes.slice(-1)[0]];
      task.task = name
    })
  }

  function updateTasks() {
    setTasks((draft: Task[]) => {
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
      value={{ tasks, addPreset, newTask, deleteTask, updateTaskDone, updateTaskName, updateTasks }}
    >
      {children}
    </TasksContext.Provider>
  );
}

export { TasksProvider, TasksContext };
