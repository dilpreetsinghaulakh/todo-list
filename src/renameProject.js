export default function renameProject(oldProjectName, newProjectName) {
  const todoData = JSON.parse(localStorage.getItem("todo"));
  if (
    todoData[newProjectName] === undefined &&
    todoData[oldProjectName] !== undefined
  ) {
    todoData[newProjectName] = todoData[oldProjectName];
    delete todoData[oldProjectName];
    localStorage.setItem("todo", JSON.stringify(todoData));
  }
  else{
    // Do something like a error prompt
  }
}
