import createProject from "../createProject";
import { activateBackdrop, deactivateBackdrop } from "./backdrop";
import editProjectForm from "./editProjectForm";
import { addTodoUi, printTodo } from "./todoUi";
import {
  bigTextStyleClasses,
  changeContent,
  circleBgIconStyleClasses,
  getProjectNameEmoji,
  getProjectNameOnly,
  getProjectNamesSorted,
  getTodoData,
  newEmojiSelector,
  randomColorPastel,
  textStyleClasses,
} from "./uiHelpers";

export default function Projects() {
  const projects = document.createElement("div");
  projects.id = "sidebarProjects";
  projects.className = "flex flex-col gap-2";

  const sortedKeyArray = getProjectNamesSorted();

  sortedKeyArray.forEach((key) => {
    const project = document.createElement("span");
    project.className = "flex justify-end gap-2 items-center cursor-pointer";

    const emoji = document.createElement("p");
    emoji.textContent = getProjectNameEmoji(key);
    emoji.className = circleBgIconStyleClasses;
    emoji.style.backgroundColor = randomColorPastel();

    const projectName = document.createElement("p");
    projectName.textContent = getProjectNameOnly(key);
    projectName.className = textStyleClasses;

    const editBtn = document.createElement("div");
    editBtn.innerHTML += `<svg class="w-6 h-6" width="24" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="Edit / Edit_Pencil_02"><path id="Vector" d="M4 16.0001V20.0001L8 20.0001L18.8686 9.13146L18.8695 9.13061C19.265 8.73516 19.4628 8.53736 19.5369 8.3092C19.6021 8.10835 19.6022 7.89201 19.5369 7.69117C19.4627 7.46284 19.2646 7.26474 18.8686 6.86872L17.1288 5.12892C16.7345 4.7346 16.5369 4.53704 16.3091 4.46301C16.1082 4.39775 15.8919 4.39775 15.691 4.46301C15.463 4.53709 15.2652 4.73488 14.8704 5.12976L14.8686 5.13146L4 16.0001Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></g></svg>`;
    editBtn.className =
      "text-gray-500 w-0 transition-all bg-gradient-to-r from-white/0 to-white to-20% overflow-hidden";
    editBtn.addEventListener("click", () => {
      editProjectForm(key);
    });

    project.addEventListener("click", (e) => {
      if (e.target.nodeName === "SPAN" || e.target.nodeName === "P") {
        openProject(key);
      }
    });
    project.addEventListener("mouseover", () => {
      emoji.classList.add("shadow-lg");
      editBtn.classList.remove("w-0");
      editBtn.classList.add("w-8");
      projectName.classList.add("flex-shrink-[50]");
    });
    project.addEventListener("mouseout", () => {
      emoji.classList.remove("shadow-lg");
      editBtn.classList.remove("w-8");
      editBtn.classList.add("w-0");
      editBtn.classList.remove("absolute");
      projectName.classList.remove("text-ellipsis");
      projectName.classList.remove("flex-shrink-[50]");
      setTimeout(() => {
        projectName.classList.add("text-ellipsis");
      }, 150);
    });

    project.append(emoji, projectName, editBtn);
    projects.appendChild(project);
  });
  return projects;
}

export function updateSidebarProjects() {
  const newProjects = Projects();
  document.getElementById("sidebarProjects").replaceWith(newProjects);
}

export function addProjectForm() {
  activateBackdrop();
  const form = document.createElement("div");
  form.className =
    "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-8 flex flex-col gap-4 w-screen max-w-lg";
  form.id = "form";

  const addTitle = document.createElement("h1");
  addTitle.textContent = "Add a new Project";
  addTitle.className = bigTextStyleClasses;

  const emojiSelectionDiv = document.createElement("div");
  emojiSelectionDiv.className = "flex gap-2 items-center text-lg";

  const preEmojiText = document.createElement("p");
  preEmojiText.textContent = "with this";

  const emojiContainer = document.createElement("div");
  emojiContainer.className = circleBgIconStyleClasses;
  emojiContainer.classList.add("w-10");
  emojiContainer.classList.add("pastel-rainbow-bg");
  emojiContainer.classList.add("cursor-pointer");

  const emojiP = document.createElement("p");
  emojiP.textContent = "☺︎";
  emojiP.className = "text-black/50 text-base";

  emojiContainer.appendChild(emojiP);

  const emojiSelectorContainer = document.createElement("div");
  emojiSelectorContainer.className = "mx-auto w-full transition-all";

  emojiContainer.addEventListener("click", () => {
    newEmojiSelector(emojiSelectorContainer, emojiP);
    emojiContainer.classList.remove("outline");
  });

  const afterEmojiText = document.createElement("p");
  afterEmojiText.textContent = "emoji and";

  emojiSelectionDiv.append(preEmojiText, emojiContainer, afterEmojiText);

  const nameInputDiv = document.createElement("div");
  nameInputDiv.className = "flex gap-4 text-lg";

  const preNameText = document.createElement("p");
  preNameText.textContent = "named";

  const nameInput = document.createElement("input");
  nameInput.type = "text";
  nameInput.placeholder = "something";
  nameInput.className =
    "w-full bg-transparent focus:outline-none border-b rounded-none";

  nameInput.addEventListener("keypress", (event) => {
    const regex = /[a-zA-Z0-9 _\-\.]/;
    const value = event.key;
    inputError.classList.add("h-0");
    if (!regex.test(value)) {
      event.preventDefault();
      inputError.classList.remove("h-0");
    }
  });

  const fullStop = document.createElement("p");
  fullStop.textContent = ".";

  nameInputDiv.append(preNameText, nameInput, fullStop);

  const inputError = document.createElement("p");
  inputError.textContent =
    "Only alphanumeric characters, hyphen, dot, and underscore are allowed.";
  inputError.className = "text-red-500 text-xs h-0 overflow-hidden mx-auto";

  const addBtn = document.createElement("button");
  addBtn.textContent = "Add it";
  addBtn.className =
    "bg-spl-blue text-white font-bold w-fit mx-auto px-8 py-2 rounded-lg hover:shadow-lg hover:shadow-spl-blue/30 transition";

  addBtn.addEventListener("click", () => {
    if (emojiP.textContent === "☺︎") {
      emojiContainer.classList.add("outline-red-500");
      emojiContainer.classList.add("outline");
      emojiContainer.classList.add("outline-1");
    }
    if (!nameInput.value) {
      nameInput.classList.add("border-red-500");
    }

    [...nameInput.value].forEach;
    for (let i = 0; i < [...nameInput.value].length; i++) {
      if (!/[a-zA-Z0-9 _.-]/.test([...nameInput.value][i])) {
        inputError.classList.remove("h-0");
      }
    }

    if (
      emojiP.textContent !== "☺︎" &&
      nameInput.value &&
      inputError.classList.contains("h-0")
    ) {
      createProject(emojiP.textContent + nameInput.value);
      updateSidebarProjects();
      deactivateBackdrop();
    }
  });

  form.append(
    addTitle,
    emojiSelectionDiv,
    emojiSelectorContainer,
    nameInputDiv,
    inputError,
    addBtn
  );
  document.getElementById("backdrop").append(form);
}

export function openProject(project) {
  const projectName = document.createElement("span");
  projectName.className = "flex gap-4 items-center";

  const emoji = document.createElement("p");
  emoji.textContent = getProjectNameEmoji(project);
  emoji.className = circleBgIconStyleClasses;
  emoji.classList.add("text-4xl");
  emoji.classList.add("h-16");
  emoji.classList.add("pastel-rainbow-bg");

  const name = document.createElement("p");
  name.textContent = getProjectNameOnly(project);
  name.className = "text-5xl font-thin";

  projectName.append(emoji, name);

  const projectTodoData = getTodoData()[project];

  const todo = document.createElement("div");
  todo.id = "todoDiv";

  printTodo(todo, projectTodoData, project);

  changeContent(projectName, todo, addTodoUi(project, todo));
}
