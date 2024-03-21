import createProject from "./createProject";
import "./style.css";
import ui from "./userInterface/main";

window.addEventListener("load", () => {
  if (localStorage.getItem("todo") === null || !Object.keys(JSON.parse(localStorage.getItem("todo"))).length) {
    createProject("😎Default");
  }
  ui();
});
