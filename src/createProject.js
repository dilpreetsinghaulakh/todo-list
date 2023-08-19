export default function createProject(projectName) {
  var projects = JSON.parse(localStorage.getItem("todo"));
  if (localStorage.getItem("todo") === null) {
    let newProject = {};
    newProject[projectName] = [];
    localStorage.setItem("todo", JSON.stringify(newProject));
  } else if (projects[projectName] === undefined) {
    projects[projectName] = [];
    localStorage.setItem("todo", JSON.stringify(projects));
  }
}
