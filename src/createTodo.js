export default function createTodo(
  uniqueId,
  title,
  description,
  dueDate,
  priority
) {
  return {
    id: uniqueId,
    title: title,
    description: description,
    dueDate: dueDate,
    priority: priority,
    isDone: false,
  };
}
