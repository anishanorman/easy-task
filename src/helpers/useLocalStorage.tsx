const KEY = "tasks"

const getTasksFromLocalStorage = () => {
  const tasks = localStorage.getItem(KEY);
  return tasks ? JSON.parse(tasks) : [];
};

const saveTasksToLocalStorage = (tasks: any[]) => {
  localStorage.setItem(KEY, JSON.stringify(tasks));
};

export const searchTasks = (obj: any, searchTerm: string, path: string[] = []): string[] | false => {
  for (const property in obj) {
    if (obj.hasOwnProperty(property)) {
      const value = obj[property];
      const currentPath = [...path, property]
      if (typeof value === "string" && value.includes(searchTerm)) {
        return currentPath;
      } else if (typeof value === "object") {
        const found = searchTasks(value, searchTerm, currentPath);
        if (found) {
          return found;
        }
      }
    }
  }
  return false;
}

export const getTasks = (): any[] => getTasksFromLocalStorage();

export const addTask = (task: any) => {
  const tasks = getTasksFromLocalStorage();
  tasks.push(task);
  saveTasksToLocalStorage(tasks);
};

export const updateTask = (taskIndex: number, updatedTask: any) => {
  const tasks = getTasksFromLocalStorage();
  tasks[taskIndex] = updatedTask;
  saveTasksToLocalStorage(tasks);
};

export const formatPath = (taskPath: string[]) => {
  taskPath.pop()
  console.log(taskPath)
  let result = `tasks`
  for (let i=0; i<taskPath.length; i++) {
    if (i%2===1) {
      result += "." + taskPath[i]
    } else {
      result += `[${taskPath[i]}]`
    }
  }
  result+=".progress"
  return(result)
}

export const deleteTask = (taskIndex: number) => {
  const tasks = getTasksFromLocalStorage();
  tasks.splice(taskIndex, 1);
  saveTasksToLocalStorage(tasks);
}
