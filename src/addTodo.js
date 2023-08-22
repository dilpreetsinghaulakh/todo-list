import uniqid from 'uniqid';
import createProject from "./createProject";
import createTodo from "./createTodo";

export default function addTodo(projectName) {
  var projects = JSON.parse(localStorage.getItem("todo"));

  if (projects[projectName] === undefined) {
    createProject(projectName);
    projects = JSON.parse(localStorage.getItem("todo"));
  }
  const title = document.getElementById("title");
  const description = document.getElementById("description");
  const dueDate = document.getElementById("dueDate");
  const priority = document.getElementById("priority");

  projects[projectName].push(
    createTodo(
      uniqid(),
      title.value,
      description.value,
      dueDate.value,
      priority.options[priority.selectedIndex].value
    )
  );
  localStorage.setItem("todo", JSON.stringify(projects));

  console.log(projects);
}
