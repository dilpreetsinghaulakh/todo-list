export default function editTodo(
  projectName,
  todoId,
  newTitle,
  newDescription,
  newDueDate,
  newPriority
) {
  const todoData = JSON.parse(localStorage.getItem("todo"));

  todoData[projectName][
    todoData[projectName].findIndex((item) => (item.id = todoId))
  ].title = newTitle;
  todoData[projectName][
    todoData[projectName].findIndex((item) => (item.id = todoId))
  ].description = newDescription;
  todoData[projectName][
    todoData[projectName].findIndex((item) => (item.id = todoId))
  ].dueDate = newDueDate;
  todoData[projectName][
    todoData[projectName].findIndex((item) => (item.id = todoId))
  ].priority = newPriority;

  localStorage.setItem("todo", JSON.stringify(todoData));
}
