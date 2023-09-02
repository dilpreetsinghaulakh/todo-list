import { uniqueId } from "lodash";
import addTodo from "./addTodo";
import createProject from "./createProject";
import editTodo from "./editTodo";
import renameProject from "./renameProject";
import "./style.css";
import ui from "./ui";

// const sub = document.getElementById("submit");

window.addEventListener("load", () => {
  createProject("😎Default");
  ui.initialInsertions();
});

// sub.addEventListener("click", () => {
//   const pro = document.getElementById("selProject");
//   addTodo(pro.value);
//   ui.printTodo();
// });

// const addProjectBtn = document.getElementById("addProject");

// addProjectBtn.addEventListener("click", () => {
//   const projectNameInp = document.getElementById("projectNameInput");
//   createProject(projectNameInp.value);
//   ui.printTodo();
// });

// const editTodoBtn = document.getElementById("edit");

// editTodoBtn.addEventListener("click", () => {
//   const id = document.getElementById("todoID");
//   const editTitle = document.getElementById("newTitle");
//   const editDescription = document.getElementById("newDescription");
//   const editDueDate = document.getElementById("newDueDate");
//   const editPriority = document.getElementById("priority");
//   const pro = document.getElementById("project-sel");

//   editTodo(
//     pro.value,
//     id.value,
//     editTitle.value,
//     editDescription.value,
//     editDueDate.value,
//     editPriority.options[editPriority.selectedIndex].value
//   );

//   ui.printTodo();
// });

// const changeProject = document.getElementById("change");

// changeProject.addEventListener("click", () => {
//   const oldName = document.getElementById("oldProject");
//   const newName = document.getElementById("newProject");

//   renameProject(oldName.value, newName.value);
//   ui.printTodo();
// });
