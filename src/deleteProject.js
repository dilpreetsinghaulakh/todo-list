export default function deleteTodo(projectName) {
  var todoData = JSON.parse(localStorage.getItem("todo"));
  delete todoData[projectName];
  localStorage.setItem("todo", JSON.stringify(todoData));
}
