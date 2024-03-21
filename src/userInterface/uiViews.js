import _ from "lodash";
import { changeContent, getProjectNameOnly, getProjectNamesSorted, getTodoData, getTodoOnly, noTodoContainerClasses, withTodoContainerClasses } from "./uiHelpers";
import { openProject } from "./projects";

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

const getNoTodoDiv = () => {
  const noTodo = document.createElement("p");
  noTodo.textContent = "No Todo";
  noTodo.id = "noTodo";
  noTodo.className = "text-gray-500";

  return noTodo;
};

const getTodoDiv = (todoObj, project) => {
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
};

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

      newTodoDiv(getTodoData()[project].slice(-1)[0], project, todoDiv);

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

export function homeView() {
  const todoData = getTodoData();
  const content = document.getElementById("content");
  content.className =
    "flex flex-col w-full h-full mr-4 gap-4 overflow-x-visible transition";

  const yourProjects = document.createElement("h1");
  yourProjects.textContent = `Your Projects (${Object.keys(todoData).length})`;
  yourProjects.className = "text-5xl font-thin";

  const sortedArray = getProjectNamesSorted();

  const projectsContainer = document.createElement("div");
  projectsContainer.className = "w-full overflow-x-scroll flex-shrink-0";

  const projects = document.createElement("div");
  projects.className = "flex gap-2";

  for (let i = 0; i < sortedArray.length; i++) {
    const project = document.createElement("div");
    project.className =
      "flex gap-2 items-center whitespace-nowrap bg-gray-100 focus:bg-gray-200 hover:bg-gray-200 transition text-black font-medium text-sm border-black py-2 px-5 rounded-xl cursor-pointer select-none";

    const projectName = document.createElement("p");
    projectName.textContent = getProjectNameOnly(sortedArray[i]);
    projectName.className = "w-max";

    project.append(projectName);
    project.addEventListener("click", () => {
      openProject(sortedArray[i]);
    });
    projects.appendChild(project);
  }

  projectsContainer.appendChild(projects);

  getTodoOnly();

  const innerContent = document.createElement("div");
  innerContent.className = "flex-grow flex";

  const todoOnly = getTodoOnly();

  if (!todoOnly.length) {
    const noTodo = document.createElement("div");
    noTodo.className =
      "flex flex-col items-center justify-center flex-grow gap-12 text-gray-500";

    const noTodoP = document.createElement("p");
    noTodoP.textContent =
      "You don't have any todo, add one by going into a project.";

    const arrow = document.createElement("div");
    arrow.innerHTML = `<svg class="h-full w-full" width="435" height="90" viewBox="0 0 435 90" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M431 10.5926C406.574 30.115 387.281 38.379 355.944 36.9914C327.646 35.7383 296.863 22.3483 270.544 12.5909C237.957 0.510424 173.992 -8.93118 155.057 29.524C140.355 59.3834 162.392 95.0893 197.071 85.3717C210.441 81.6253 217.35 63.8425 211.428 51.5055C205.032 38.1805 185.91 31.7568 172.686 28.6826C137.171 20.4264 113.511 53.572 81.374 59.3935C51.3497 64.8323 29.0541 51.4325 6.31842 33.3103C4.37095 31.758 5.36837 42.086 5.36837 44.6691C5.36837 54.1386 3.46812 49.9358 3.46812 42.776C3.46812 38.1712 1.03353 28.3808 7.26849 30.9964C11.7668 32.8834 21.2221 33.3103 26.2699 33.3103" stroke="currentColor" stroke-width="1" stroke-linecap="round"/></svg>`;
    arrow.className = "w-[50vw] h-auto";

    noTodo.append(noTodoP, arrow);

    innerContent.appendChild(noTodo);
  } else {
    innerContent.className =
      "flex-grow flex flex-col gap-4 border rounded-md bg-gray-50 w-full p-2 overflow-y-scroll";
    let sorted = _.orderBy(
      _.filter(todoOnly, (element) => {
        return !element.isDone;
      }),
      ["dueDate", "priority", "title"],
      ["asc", "desc", "asc"]
    );

    if (sorted.length) {
      sorted.forEach((element) => {
        innerContent.appendChild(getViewTodoDiv(element));
      });
    } else {
      nothingViewTodo(innerContent);
    }
  }
  changeContent(yourProjects, projectsContainer, innerContent);
}

export function todayView() {
  const todoOnly = getTodoOnly();
  let sorted = _.orderBy(
    _.filter(todoOnly, (element) => {
      return (
        element.dueDate === new Date().toJSON().slice(0, 10) && !element.isDone
      );
    }),
    ["priority", "title"],
    ["desc", "asc"]
  );
  getViewUi(sorted, "Today");
}

export function pastView() {
  const todoOnly = getTodoOnly();
  let sorted = _.orderBy(
    _.filter(todoOnly, (element) => {
      return (
        element.dueDate < new Date().toJSON().slice(0, 10) && !element.isDone
      );
    }),
    ["priority", "title"],
    ["desc", "asc"]
  );
  getViewUi(sorted, "Past");
}

export function weekView() {
  const todoOnly = getTodoOnly();

  Date.prototype.getWeek = function () {
    var oneJan = new Date(this.getFullYear(), 0, 1);
    var today = new Date(this.getFullYear(), this.getMonth(), this.getDate());
    var dayOfYear = (today - oneJan + 86400000) / 86400000;
    return Math.ceil(dayOfYear / 7);
  };

  let sorted = _.orderBy(
    _.filter(todoOnly, (element) => {
      return (
        new Date(element.dueDate).getWeek() === new Date().getWeek() &&
        new Date(element.dueDate).getFullYear() === new Date().getFullYear() &&
        !element.isDone
      );
    }),
    ["priority", "title"],
    ["desc", "asc"]
  );
  getViewUi(sorted, "This Week");
}

export function monthView() {
  const todoOnly = getTodoOnly();
  let sorted = _.orderBy(
    _.filter(todoOnly, (element) => {
      return (
        new Date(element.dueDate).getMonth() === new Date().getMonth() &&
        new Date(element.dueDate).getFullYear() === new Date().getFullYear() &&
        !element.isDone
      );
    }),
    ["priority", "title"],
    ["desc", "asc"]
  );
  getViewUi(sorted, "This Month");
}

const getViewUi = (array, name) => {
  const heading = document.createElement("p");
  heading.textContent = `${name} (${array.length})`;
  heading.className = "text-5xl font-thin";

  const todoContainer = document.createElement("div");
  todoContainer.className =
    "flex-grow overflow-y-scroll border bg-gray-50 rounded-md p-2 flex flex-col gap-4";

  if (array.length) {
    array.forEach((element) => {
      todoContainer.appendChild(getViewTodoDiv(element));
    });
  } else {
    nothingViewTodo(todoContainer);
  }

  changeContent(heading, todoContainer);
};

const nothingViewTodo = (todoContainer) => {
  todoContainer.classList.add("items-center");
  todoContainer.classList.add("justify-center");

  const nothing = document.createElement("p");
  nothing.textContent = "Nothing here";
  nothing.className = "font-semibold text-gray-500";

  todoContainer.appendChild(nothing);
};

const getViewTodoDiv = (element) => {
  const row1 = document.createElement("div");
  row1.className = "flex gap-2 items-center";

  const priority = document.createElement("div");
  priority.className = "h-4 w-4 rounded-full";

  switch (parseInt(element.priority)) {
    case -1:
      priority.classList.add("bg-green-500");
      break;
    case 0:
      priority.classList.add("bg-gray-500");
      break;
    case 1:
      priority.classList.add("bg-red-500");
      priority.classList.add("animate-pulse");
      break;
  }

  const todo = document.createElement("div");
  todo.className = "p-4 bg-white border rounded-md transition-all";

  const title = document.createElement("p");
  title.textContent = element.title;
  title.className = "font-bold flex-grow";

  const rightContainer = document.createElement("div");

  const dueDate = document.createElement("p");
  dueDate.textContent = element.dueDate;
  dueDate.className = "text-gray-400 text-sm";

  const project = document.createElement("p");
  project.textContent = getProjectNameOnly(element.project);
  project.className = "text-gray-400 text-sm text-right";

  rightContainer.append(dueDate, project);

  row1.append(priority, title, rightContainer);
  todo.appendChild(row1);

  if (element.description) {
    const description = document.createElement("p");
    description.innerHTML = element.description.replace(/\n/g, "<br>");
    description.className = "text-sm text-gray-600 mt-2 line-clamp-2";

    todo.addEventListener("click", () => {
      description.classList.remove("line-clamp-2");

      window.addEventListener("click", (e) => {
        if (!todo.contains(e.target)) {
          description.classList.add("line-clamp-2");
        }
      });
    });

    todo.appendChild(description);
  }

  return todo;
};
