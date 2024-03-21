import renameProject from "../renameProject";
import deleteProject from "../deleteProject";
import { activateBackdrop, deactivateBackdrop } from "./backdrop";
import { openProject, updateSidebarProjects } from "./projects";
import { bigTextStyleClasses, circleBgIconStyleClasses, getProjectNameEmoji, getProjectNameOnly, newEmojiSelector } from "./uiHelpers";
import { homeView } from "./uiViews";

export default function editProjectForm(name) {
  activateBackdrop();
  const form = document.createElement("div");
  form.className =
    "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-8 flex flex-col w-screen max-w-lg";
  form.id = "form";

  const oldEmoji = getProjectNameEmoji(name);
  const oldName = getProjectNameOnly(name);

  const rename = document.createElement("div");
  rename.className = "flex flex-col gap-4";
  const renameP = document.createElement("h1");
  renameP.textContent = "Rename";
  renameP.className = bigTextStyleClasses;

  const nameContainer = document.createElement("div");
  nameContainer.className = "flex gap-2 items-center";

  const emojiP = document.createElement("p");
  emojiP.textContent = oldEmoji;
  emojiP.className = circleBgIconStyleClasses;
  emojiP.classList.add("w-10");
  emojiP.classList.add("pastel-rainbow-bg");

  const nameP = document.createElement("p");
  nameP.textContent = oldName;
  nameP.className = "text-xl";

  nameContainer.append(emojiP, nameP);

  const to = document.createElement("h1");
  to.textContent = "to";
  to.className = bigTextStyleClasses;

  const renameInputs = document.createElement("div");
  renameInputs.className = "flex gap-2";

  const newEmojiContainer = document.createElement("div");
  newEmojiContainer.className = circleBgIconStyleClasses;
  newEmojiContainer.classList.add("w-10");
  newEmojiContainer.classList.add("pastel-rainbow-bg");
  newEmojiContainer.classList.add("cursor-pointer");

  const emojiSelectorContainer = document.createElement("div");
  emojiSelectorContainer.className = "mx-auto w-full transition-all";

  const newEmoji = document.createElement("p");
  newEmoji.textContent = oldEmoji;

  newEmojiContainer.appendChild(newEmoji);

  newEmojiContainer.addEventListener("click", () => {
    newEmojiSelector(emojiSelectorContainer, newEmoji);
  });

  const newName = document.createElement("input");
  newName.type = "text";
  newName.placeholder = oldName;
  newName.className =
    "w-full bg-transparent focus:outline-none rounded-none border-b";

  newName.addEventListener("keypress", (event) => {
    const regex = /[a-zA-Z0-9 _\-\.]/;
    const value = event.key;
    inputError.classList.add("h-0");
    if (!regex.test(value)) {
      event.preventDefault();
      inputError.classList.remove("h-0");
    }
  });

  renameInputs.append(newEmojiContainer, newName);

  const inputError = document.createElement("p");
  inputError.textContent =
    "Only alphanumeric characters, hyphen, dot, and underscore are allowed.";
  inputError.className = "text-red-500 text-xs h-0 overflow-hidden mx-auto";

  const renameBtn = document.createElement("button");
  renameBtn.textContent = "Rename it";
  renameBtn.className =
    "bg-spl-blue text-white font-bold w-fit mx-auto px-8 py-2 rounded-lg hover:shadow-lg hover:shadow-spl-blue/30 transition";
  renameBtn.addEventListener("click", () => {
    var newEmojiValue = "";
    if (!newEmoji.textContent) {
      newEmojiValue = oldEmoji;
    } else newEmojiValue = newEmoji.textContent;

    var newNameValue = "";
    if (!newName.value) {
      newNameValue = oldName;
    } else newNameValue = newName.value;

    for (let i = 0; i < [...newName.value].length; i++) {
      if (!/[a-zA-Z0-9 _.-]/.test([...newName.value][i])) {
        inputError.classList.remove("h-0");
      }
    }

    if (inputError.classList.contains("h-0")) {
      renameProject(name, newEmojiValue + newNameValue);
      updateSidebarProjects();
      openProject(newEmojiValue + newNameValue);
      deactivateBackdrop();
    }
  });

  rename.append(
    renameP,
    nameContainer,
    to,
    renameInputs,
    inputError,
    emojiSelectorContainer,
    renameBtn
  );

  const or = document.createElement("h1");
  or.textContent = "Or";
  or.className = bigTextStyleClasses;
  or.classList.add("my-4");

  const deleteBtn = document.createElement("button");
  deleteBtn.className =
    "bg-red-500 text-white font-bold w-fit mx-auto px-8 py-2 rounded-lg hover:shadow-lg hover:shadow-red-500/30 transition";
  deleteBtn.textContent = "Delete it";
  deleteBtn.addEventListener("click", () => {
    deleteProject(name);
    homeView();
    updateSidebarProjects();
    deactivateBackdrop();
  });

  form.append(rename, or, deleteBtn);

  document.getElementById("backdrop").append(form);
}
