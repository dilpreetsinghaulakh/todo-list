export default function deleteTodo(projectName, todoId) {
  var todoData = JSON.parse(localStorage.getItem("todo"));

  todoData[projectName].splice(
    todoData[projectName].findIndex((item) => item.id == todoId),
    1
  );

  localStorage.setItem("todo", JSON.stringify(todoData));
}
