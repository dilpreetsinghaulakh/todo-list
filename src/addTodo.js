import uniqid from "uniqid";
import createTodo from "./createTodo";

export default function addTodo(
  project,
  title,
  description,
  dueDate,
  priority
) {
  var projects = JSON.parse(localStorage.getItem("todo"));

  projects[project].push(
    createTodo(uniqid(), title, description, dueDate, parseInt(priority))
  );
  localStorage.setItem("todo", JSON.stringify(projects));

  console.log(projects);
}
