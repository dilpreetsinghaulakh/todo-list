export default function editTodo(
  projectName,
  todoId,
  newTitle,
  newDescription,
  newDueDate,
  newPriority,
  newIsDone
) {
  var todoData = JSON.parse(localStorage.getItem("todo"));

  todoData[projectName].map((obj) => {
    if (obj.id === todoId) {
      obj.title = newTitle;
      obj.description = newDescription;
      obj.dueDate = newDueDate;
      obj.priority = newPriority;
      obj.isDone = newIsDone;
    }
  });

  localStorage.setItem("todo", JSON.stringify(todoData));
}
