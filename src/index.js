import createProject from "./createProject";
import "./style.css";
import ui from "./ui";

window.addEventListener("load", () => {
  if (!Object.keys(JSON.parse(localStorage.getItem("todo"))).length) {
    createProject("😎Default");
  }
  ui.initialInsertions();
});
