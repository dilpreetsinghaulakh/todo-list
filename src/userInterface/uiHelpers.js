import { Picker } from "emoji-mart";

export function getTodoData() {
  return JSON.parse(localStorage.getItem("todo"));
}

const projectNameRegex = /[^A-Z a-z0-9_.-]/g;
const emojiRegex = /[\w()_.-]/g;

export function randomColorPastel() {
  function hslToHex(h, s, l) {
    l /= 100;
    const a = (s * Math.min(l, 1 - l)) / 100;
    const f = (n) => {
      const k = (n + h / 30) % 12;
      const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
      return Math.round(255 * color)
        .toString(16)
        .padStart(2, "0");
    };
    return `#${f(0)}${f(8)}${f(4)}`;
  }
  return hslToHex(Math.floor(Math.random() * 360), 75, 90);
}

export function getProjectNamesSorted() {
  const todoData = getTodoData();
  const onlyNameArray = [];
  Object.keys(todoData).forEach((key) => {
    onlyNameArray.push(key);
  });
  const sortedKeyArray = onlyNameArray.sort((a, b) =>
    getProjectNameOnly(a)
      .trim()
      .toLowerCase()
      .localeCompare(
        getProjectNameOnly(b).trim().toLowerCase(),
        undefined,
        { sensitivity: "base" }
      )
  );
  return sortedKeyArray;
}

export function getTodoOnly() {
  const todoData = getTodoData();
  var todo = [];
  Object.keys(todoData).forEach((key) => {
    todoData[key].forEach((obj) => {
      obj["project"] = key;
      todo.push(obj);
    });
  });
  // todo = _.sortBy(todo, ["title"]); //May be changed      //NOW DISABLED
  return todo;
}

export function getProjectNameEmoji(name) {
  return name.replace(emojiRegex, "");
}

export function getProjectNameOnly(name) {
  return name.replace(projectNameRegex, "");
}

export const circleBgIconStyleClasses =
  "aspect-square flex shrink-0 items-center basis-10 justify-center p-2 rounded-full transition";

export const textStyleClasses =
  "flex-grow overflow-hidden whitespace-nowrap text-ellipsis";

export const bigTextStyleClasses = "text-3xl font-bold";

export function changeContent(...args) {
  const contentContainer = document.getElementById("contentContainer");
  const content = document.getElementById("content");

  contentContainer.classList.add("blur-md");
  contentContainer.classList.add("opacity-25");

  setTimeout(() => {
    content.innerHTML = "";
    args.forEach((element) => {
      content.append(element);
    });
    contentContainer.classList.remove("opacity-25");
    contentContainer.classList.remove("blur-md");
  }, 150);
}

export function newEmojiSelector(emojiSelectorContainer, emojiP) {
  const changeEmoji = (emoji) => {
    emojiP.textContent = emoji["native"];
    removeEmojiPicker();
  };
  const pickerOptions = {
    onEmojiSelect: changeEmoji,
    previewPosition: "none",
    dynamicWidth: "true",
  };

  const picker = new Picker(pickerOptions);
  picker.id = "emojiSelector";
  picker.className = "w-full transition-all opacity-100";
  emojiSelectorContainer.appendChild(picker);

  setTimeout(() => {
    window.addEventListener(
      "click",
      (e) => {
        if (e.target.id !== "emojiSelector" && emojiSelectorContainer.innerHTML)
          removeEmojiPicker();
      },
      1
    );
  });

  const removeEmojiPicker = () => {
    picker.classList.remove("opacity-100");
    picker.classList.add("opacity-0");
    picker.classList.add("scale-y-0");
    setTimeout(() => {
      emojiSelectorContainer.innerHTML = "";
    }, 150);
  };
}

export const noTodoContainerClasses =
  "flex items-center flex-grow justify-center rounded-md bg-gray-50 border";

export const withTodoContainerClasses =
  "flex-grow flex flex-col overflow-y-scroll rounded-md bg-gray-50 p-2 border";
