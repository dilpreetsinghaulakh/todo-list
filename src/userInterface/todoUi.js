import deleteTodo from "../deleteTodo";
import addTodo from "../addTodo";
import editTodo from "../editTodo";
import {
  getTodoData,
  noTodoContainerClasses,
  withTodoContainerClasses,
} from "./uiHelpers";

export function printTodo(todoDiv, todoArray, project) {
  if (!todoArray.length) {
    todoDiv.appendChild(getNoTodoDiv());
    todoDiv.className = noTodoContainerClasses;
  } else {
    todoDiv.className = withTodoContainerClasses;

    for (let i = 0; i < todoArray.length; i++) {
      todoDiv.appendChild(getTodoDiv(todoArray[i], project));
    }
  }
}

export function getNoTodoDiv() {
  const noTodo = document.createElement("p");
  noTodo.textContent = "No Todo";
  noTodo.id = "noTodo";
  noTodo.className = "text-gray-500";

  return noTodo;
}

export function getTodoDiv(todoObj, project) {
  const todoContainer = document.createElement("div");
  todoContainer.className =
    "border rounded-md p-4 bg-white transition-all my-2";

  const row1 = document.createElement("div");
  row1.className = "flex justify-between gap-2 items-center";

  const checkBox = document.createElement("div");
  checkBox.id = "checkbox";
  checkBox.className =
    "w-4 min-w-[1rem] h-4 select-none bg-gray-100 border  rounded hover:bg-gray-200 transition cursor-pointer flex items-center justify-center";

  switch (parseInt(todoObj.priority)) {
    case -1:
      checkBox.classList.add("shadow-center-green");
      break;
    case 0:
      checkBox.classList.add("shadow-center-gray");
      break;
    case 1:
      checkBox.classList.add("shadow-center-red");
      break;
  }

  const checkBoxNoneActiveClasses = [
    "bg-gray-100",
    "border-gray-200",
    "hover:bg-gray-200",
  ];
  const checkBoxActiveClasses = [
    "bg-spl-blue",
    "border-[#0549C7]",
    "hover:bg-spl-blue/90",
  ];

  checkBox.addEventListener("click", () => {
    if (checkBox.innerHTML) {
      checkBoxNoneActive();
      editTodo(
        project,
        todoObj.id,
        todoObj.title,
        todoObj.description,
        todoObj.dueDate,
        todoObj.priority,
        false
      );
    } else {
      checkBoxActive();
      editTodo(
        project,
        todoObj.id,
        todoObj.title,
        todoObj.description,
        todoObj.dueDate,
        todoObj.priority,
        true
      );
    }
  });

  const title = document.createElement("p");
  title.textContent = todoObj.title;
  title.className = "font-bold flex-grow line-clamp-2";

  // Placed here to let title initialize -->
  const checkBoxNoneActive = () => {
    checkBoxActiveClasses.forEach((element) => {
      checkBox.classList.remove(element);
    });
    checkBoxNoneActiveClasses.forEach((element) => {
      checkBox.classList.add(element);
    });
    checkBox.innerHTML = "";

    title.classList.remove("line-through");
  };

  const checkBoxActive = () => {
    checkBoxNoneActiveClasses.forEach((element) => {
      checkBox.classList.remove(element);
    });
    checkBoxActiveClasses.forEach((element) => {
      checkBox.classList.add(element);
    });
    checkBox.innerHTML = `<svg id="checkbox" class="h-4 w-4" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path id="checkbox" d="M6 12L10.2426 16.2426L18.727 7.75732" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

    title.classList.add("line-through");
  };

  if (todoObj.isDone) {
    checkBoxActive();
  } else {
    checkBoxNoneActive();
  }
  // <--

  const dueDate = document.createElement("p");
  dueDate.textContent = todoObj.dueDate;
  dueDate.className = "min-w-fit text-gray-400";

  row1.append(checkBox, title, dueDate);
  todoContainer.appendChild(row1);

  const description = document.createElement("p");
  if (todoObj.description) {
    description.innerHTML = todoObj.description.replace(/\n/g, "<br>");
    description.className = "text-sm text-gray-600 mt-2 line-clamp-2";
    todoContainer.appendChild(description);
  }

  const row3 = document.createElement("div");
  row3.className =
    "flex justify-center gap-8 h-0 overflow-hidden transition-all";

  const btnClasses =
    "text-white font-bold px-8 py-2 rounded-lg hover:shadow-lg w-fit transition";

  const editBtn = document.createElement("button");
  editBtn.textContent = "Edit";
  editBtn.className = btnClasses;
  editBtn.classList.add("bg-spl-blue");
  editBtn.classList.add("hover:shadow-spl-blue/30");

  editBtn.addEventListener("click", () => {
    const setDimensions = () => {
      overlay.style.width = todoDiv.offsetWidth + "px";
      overlay.style.height = todoDiv.offsetHeight + "px";
      overlay.style.top = todoDiv.offsetTop + "px";
      overlay.style.left = todoDiv.offsetLeft + "px";
    };

    const closeOverlay = () => {
      overlay.classList.remove("backdrop-blur");
      overlay.classList.add("opacity-0");

      setTimeout(() => {
        overlay.remove();
        todoDiv.classList.add("overflow-y-scroll");
        todoDiv.classList.remove("overflow-y-hidden");
      }, 500);
    };

    const todoDiv = document.getElementById("todoDiv");

    const renameForm = () => {
      const errorClass = "border-red-500";
      const container = document.createElement("div");
      container.className =
        "flex flex-col gap-4 w-full max-w-5xl h-full justify-center";

      const row1 = document.createElement("div");
      row1.className = "flex gap-4 h-10 w-full";

      const title = document.createElement("input");
      title.placeholder = "Title";
      title.value = todoObj.title;
      title.className =
        "flex-grow border rounded-md outline-none focus:border-spl-blue px-1";
      title.addEventListener("change", () => {
        title.classList.remove(errorClass);
      });

      const dueDate = document.createElement("input");
      dueDate.type = "date";
      dueDate.value = todoObj.dueDate;
      dueDate.className =
        "border rounded-md px-4 focus:border-spl-blue focus:outline-none cursor-pointer";
      dueDate.addEventListener("change", () => {
        dueDate.classList.remove(errorClass);
      });

      const priority = document.createElement("select");
      priority.className =
        "appearance-none px-4 bg-gray-100 rounded-md outline-none border focus:border-spl-blue cursor-pointer";

      const changePriorityUi = (priorityValue) => {
        switch (priorityValue) {
          case -1:
            priority.classList.add("bg-green-100");
            break;
          case 0:
            priority.classList.add("bg-gray-100");
            break;
          case 1:
            priority.classList.add("bg-red-100");
            break;
        }
      };

      priority.addEventListener("change", () => {
        var oldBg;

        priority.classList.forEach((e) => {
          if (e.startsWith("bg")) {
            oldBg = e;
          }
        });
        priority.classList.remove(oldBg);
        changePriorityUi(parseInt(priority.value));
      });

      const low = document.createElement("option");
      low.textContent = "Low";
      low.value = -1;

      const normal = document.createElement("option");
      normal.textContent = "Normal";
      normal.value = 0;

      const high = document.createElement("option");
      high.textContent = "High";
      high.value = 1;

      switch (parseInt(todoObj.priority)) {
        case -1:
          low.defaultSelected = true;
          break;
        case 0:
          normal.defaultSelected = true;
          break;
        case 1:
          high.defaultSelected = true;
          break;
      }
      changePriorityUi(parseInt(todoObj.priority));

      priority.append(low, normal, high);

      row1.append(title, dueDate, priority);

      const description = document.createElement("textarea");
      description.placeholder = "Description (Optional)";
      description.value = todoObj.description;
      description.className =
        "transition-all outline-none flex-grow min-h-[3.5rem] max-h-72 flex-grow p-1 border focus:border-spl-blue rounded-md resize-none";

      const buttonRow = document.createElement("div");
      buttonRow.className = "flex gap-4";

      const discardBtn = document.createElement("button");
      discardBtn.textContent = "Discard";
      discardBtn.className = btnClasses;
      discardBtn.classList.add("bg-red-500");
      discardBtn.classList.add("hover:shadow-red-500/30");

      discardBtn.addEventListener("click", () => {
        closeOverlay();
      });

      const saveBtn = document.createElement("button");
      saveBtn.textContent = "Save";
      saveBtn.className = btnClasses;
      saveBtn.classList.add("bg-spl-blue");
      saveBtn.classList.add("hover:shadow-spl-blue/30");

      saveBtn.addEventListener("click", () => {
        if (!title.value && !dueDate.value) {
          title.classList.add(errorClass);
          dueDate.classList.add(errorClass);
        } else if (!title.value) {
          title.classList.add(errorClass);
        } else if (!dueDate.value) {
          dueDate.classList.add(errorClass);
        } else {
          editTodo(
            project,
            todoObj.id,
            title.value,
            description.value,
            dueDate.value,
            priority.value,
            todoObj.isDone
          );

          Array.from(todoDiv.children).forEach((element) => {
            if (element !== overlay) {
              element.remove();
            }
          });

          closeOverlay();

          printTodo(todoDiv, getTodoData()[project], project);
        }
      });

      buttonRow.append(discardBtn, saveBtn);

      container.append(row1, description, buttonRow);

      overlay.append(container);
    };

    todoDiv.classList.remove("overflow-y-scroll");
    todoDiv.classList.add("overflow-y-hidden");

    description.classList.add("line-clamp-2");

    const overlay = document.createElement("div");
    overlay.className =
      "absolute border bg-white/70 opacity-0 rounded-md transition duration-500 flex items-center justify-center p-12";
    setDimensions();

    window.addEventListener("resize", () => {
      setDimensions();
    });

    setTimeout(() => {
      overlay.classList.remove("opacity-0");
      overlay.classList.add("backdrop-blur");

      setTimeout(() => {
        row3.classList.add("h-0");
        row3.classList.add("overflow-hidden");
        row3.classList.remove("h-10");
        row3.classList.remove("mt-4");
      }, 250);

      document.addEventListener("click", function (e) {
        if (!overlay.contains(e.target)) {
          closeOverlay();
        }
      });
    }, 1);

    renameForm();

    todoDiv.appendChild(overlay);
  });

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.className = btnClasses;
  deleteBtn.classList.add("bg-red-500");
  deleteBtn.classList.add("hover:shadow-red-500/30");

  deleteBtn.addEventListener("click", () => {
    deleteTodo(project, todoObj.id);
    row3.classList.add("h-0");
    todoContainer.classList.add("h-0");
    todoContainer.classList.add("py-0");
    todoContainer.classList.add("my-0");
    todoContainer.classList.remove("my-2");
    todoContainer.classList.add("opacity-0");
    setTimeout(() => {
      todoContainer.classList.remove("border");

      todoContainer.remove();
    }, 150);

    const todoDiv = document.getElementById("todoDiv");
    if (!todoDiv.hasChildNodes()) {
      todoDiv.className = noTodoContainerClasses;
      todoDiv.appendChild(getNoTodoDiv());
    }
  });

  row3.append(editBtn, deleteBtn);
  todoContainer.appendChild(row3);

  todoContainer.addEventListener("click", (e) => {
    if (e.target.id !== "checkbox") {
      row3.classList.remove("h-0");
      row3.classList.remove("overflow-hidden");
      row3.classList.add("h-10");

      if (description.textContent) {
        row3.classList.add("mt-4");
      }

      description.classList.remove("line-clamp-2");

      document.addEventListener("click", function (e) {
        if (!todoContainer.contains(e.target) && e.target.id !== "checkbox") {
          row3.classList.add("h-0");
          row3.classList.add("overflow-hidden");
          row3.classList.remove("h-10");
          row3.classList.remove("mt-4");

          description.classList.add("line-clamp-2");
        }
      });
    }
  });

  return todoContainer;
}

export function addTodoUi(project, todoDiv) {
  const errorClass = "border-red-500";
  const container = document.createElement("div");
  container.className = "flex flex-col w-full transition-all static";

  const row1 = document.createElement("div");
  row1.className = "flex gap-4";

  const title = document.createElement("input");
  title.placeholder = "Title";
  title.className =
    "flex-grow border rounded-md outline-none focus:border-spl-blue px-1";
  title.addEventListener("change", () => {
    title.classList.remove(errorClass);
  });

  const dueDate = document.createElement("input");
  dueDate.type = "date";
  dueDate.className =
    "border rounded-md px-4 focus:border-spl-blue focus:outline-none cursor-pointer";
  dueDate.addEventListener("change", () => {
    dueDate.classList.remove(errorClass);
  });

  const priority = document.createElement("select");
  priority.className =
    "appearance-none px-4 bg-gray-100 rounded-md outline-none border focus:border-spl-blue cursor-pointer";
  priority.addEventListener("change", () => {
    var oldBg;

    priority.classList.forEach((e) => {
      if (e.startsWith("bg")) {
        oldBg = e;
      }
    });

    switch (parseInt(priority.value)) {
      case -1:
        priority.classList.remove(oldBg);
        priority.classList.add("bg-green-100");
        break;
      case 0:
        priority.classList.remove(oldBg);
        priority.classList.add("bg-gray-100");
        break;
      case 1:
        priority.classList.remove(oldBg);
        priority.classList.add("bg-red-100");
        break;
    }
  });

  const low = document.createElement("option");
  low.textContent = "Low";
  low.value = -1;

  const normal = document.createElement("option");
  normal.textContent = "Normal";
  normal.value = 0;
  normal.selected = true;

  const high = document.createElement("option");
  high.textContent = "High";
  high.value = 1;

  priority.append(low, normal, high);
  const btnClasses =
    "bg-spl-blue border border-[#0549C7] hover:bg-spl-blue/95 aspect-square w-10 h-10 flex items-center justify-center";

  const buttonsContainer = document.createElement("div");
  buttonsContainer.className = "flex rounded-md overflow-hidden";

  const addBtn = document.createElement("button");
  addBtn.innerHTML = `<svg class="w-6 h-6" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path id="Vector" d="M6 12H12M12 12H18M12 12V18M12 12V6" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
  addBtn.className = btnClasses;
  addBtn.classList.add("rounded-l-md");

  const openBtn = document.createElement("button");
  openBtn.innerHTML = `<svg class="w-6 h-6 -rotate-0 transition-transform" id="arrow" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path id="Vector" d="M19 9L12 16L5 9" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
  openBtn.className = btnClasses;
  openBtn.classList.add("rounded-r-md");

  buttonsContainer.append(addBtn, openBtn);

  row1.append(title, dueDate, priority, buttonsContainer);

  const row2 = document.createElement("div");
  row2.className = "flex gap-4 h-0 overflow-hidden transition-all";

  const description = document.createElement("textarea");
  description.placeholder = "Description (Optional)";
  description.className =
    "transition-all outline-none flex-grow p-1 border focus:border-spl-blue rounded-md resize-none";

  row2.append(description);

  container.append(row1, row2);

  const row2OpenClasses = ["h-[7.75rem]", "mt-4"];

  var isDescriptionOpen = false;

  openBtn.addEventListener("click", (e) => {
    const icon = document.getElementById("arrow");
    if (isDescriptionOpen) {
      row2OpenClasses.forEach((element) => {
        row2.classList.remove(element);
      });

      icon.classList.add("-rotate-0");
      icon.classList.remove("-rotate-180");
      isDescriptionOpen = false;
    } else {
      row2OpenClasses.forEach((element) => {
        row2.classList.add(element);
      });

      icon.classList.remove("-rotate-0");
      icon.classList.add("-rotate-180");
      isDescriptionOpen = true;
    }
  });

  const resetInputs = () => {
    var oldBg;

    priority.classList.forEach((e) => {
      if (e.startsWith("bg")) {
        oldBg = e;
      }
    });

    title.value = "";
    description.value = "";
    dueDate.value = "";
    priority.value = "0";
    priority.classList.remove(oldBg);
    priority.classList.add("bg-gray-100");
  };

  addBtn.addEventListener("click", () => {
    if (!title.value && !dueDate.value) {
      title.classList.add(errorClass);
      dueDate.classList.add(errorClass);
    } else if (!title.value) {
      title.classList.add(errorClass);
    } else if (!dueDate.value) {
      dueDate.classList.add(errorClass);
    } else {
      row2OpenClasses.forEach((element) => {
        row2.classList.remove(element);
      });

      const icon = document.getElementById("arrow");
      icon.classList.add("-rotate-0");
      icon.classList.remove("-rotate-180");

      addTodo(
        project,
        title.value,
        description.value,
        dueDate.value,
        priority.value
      );

      const currentTodoData = getTodoData()[project].slice(-1)[0];

      newTodoDiv(currentTodoData, project, todoDiv);

      resetInputs();
    }
  });

  return container;
}

const newTodoDiv = (todoObj, project, todoDiv) => {
  if (todoDiv.querySelector("#noTodo")) {
    todoDiv.innerHTML = "";
    todoDiv.className = withTodoContainerClasses;
    todoDiv.appendChild(getTodoDiv(todoObj, project));
  } else {
    todoDiv.appendChild(getTodoDiv(todoObj, project));
  }
};
