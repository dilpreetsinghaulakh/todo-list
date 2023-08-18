export default function createTodo(
  previousId,
  title,
  description,
  dueDate,
  priority
) {
  return {
    id: previousId + 1,
    title: title,
    description: description,
    dueDate: dueDate,
    priority: priority,
  };
}
