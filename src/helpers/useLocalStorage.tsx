const KEY = 'tasks';

const getTasksFromLocalStorage = () => {
  const tasks = localStorage.getItem(KEY);
  return tasks ? JSON.parse(tasks) : [];
};

const saveTasksToLocalStorage = (tasks: any[]) => {
  localStorage.setItem(KEY, JSON.stringify(tasks));
};

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

export const deleteTask = (taskIndex: number) => {
  const tasks = getTasksFromLocalStorage();
  tasks.splice(taskIndex, 1);
  saveTasksToLocalStorage(tasks);
};
