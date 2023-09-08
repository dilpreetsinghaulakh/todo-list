export default function editTodo(
  projectName,
  todoId,
  newTitle,
  newDescription,
  newDueDate,
  newPriority,
  newIsDone
) {
  const todoData = JSON.parse(localStorage.getItem("todo"));

  const todo =
    todoData[projectName][
      todoData[projectName].findIndex((item) => (item.id = todoId))
    ];

  todo.title = newTitle;
  todo.description = newDescription;
  todo.dueDate = newDueDate;
  todo.priority = parseInt(newPriority);
  todo.isDone = newIsDone;

  localStorage.setItem("todo", JSON.stringify(todoData));
}
