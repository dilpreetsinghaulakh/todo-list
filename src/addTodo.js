import uniqid from "uniqid";
import createTodo from "./createTodo";

export default function addTodo(
  project,
  title,
  description,
  dueDate,
  priority
) {
  let todoData = JSON.parse(localStorage.getItem("todo"));

  todoData[project].push(
    createTodo(uniqid(), title, description, dueDate, parseInt(priority))
  );
  localStorage.setItem("todo", JSON.stringify(todoData));
}
