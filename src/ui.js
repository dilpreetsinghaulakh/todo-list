import renameProject from "./renameProject";
import deleteProject from "./deleteProject";
import createProject from "./createProject";
import { Picker } from "emoji-mart";
var _ = require("lodash");
import deleteTodo from "./deleteTodo";
import addTodo from "./addTodo";
import editTodo from "./editTodo";

const projectNameRegex = /[^A-Z a-z0-9_.-]/g;
const emojiRegex = /[\w()_.-]/g;

const getTodoData = () => {
  return JSON.parse(localStorage.getItem("todo"));
};

if (
  ["Windows", "Android", "Linux"].includes(
    navigator.userAgent.match(/(Windows|Mac|Linux|Android|iOS)/i)[0]
  )
) {
  const injectCSS = (css) => {
    let el = document.createElement("style");
    el.type = "text/css";
    el.innerText = css;
    document.head.appendChild(el);
    return el;
  };

  injectCSS(
    "::-webkit-scrollbar{background-color:#ffffff00;width:16px}::-webkit-scrollbar-track{background-color:#fff}::-webkit-scrollbar-track:hover{background-color:#f4f4f4}::-webkit-scrollbar-thumb{background-color:#babac0;border-radius:16px;border:5px solid #fff}::-webkit-scrollbar-thumb:hover{background-color:#a0a0a5;border:4px solid #f4f4f4}::-webkit-scrollbar-button{display:none}"
  );
}

const circleBgIconStyleClasses =
  "aspect-square flex shrink-0 items-center basis-10 justify-center p-2 rounded-full transition";
const textStyleClasses =
  "flex-grow overflow-hidden whitespace-nowrap text-ellipsis";

const icon = `<svg class="h-full w-full" fill="none" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg"><svg fill="none" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg"><g filter="url(#f)" opacity=".5"><g filter="url(#e)"><rect transform="rotate(-45 17 69.209)" x="17" y="69.209" width="18.048" height="48.728" rx="9.0238" fill="#41AFFF"/></g><g filter="url(#d)"><rect transform="rotate(-45 38.765 90.974)" x="38.765" y="90.974" width="45.119" height="18.048" rx="9.0238" fill="#37FFCF"/></g><g filter="url(#c)"><rect transform="rotate(-45 58.057 71.682)" x="58.057" y="71.682" width="47.305" height="18.048" rx="9.0238" fill="#FF005C"/></g><g filter="url(#b)"><rect transform="rotate(-45 78.227 51.511)" x="78.227" y="51.511" width="37.492" height="18.048" rx="9.0238" fill="#FFB800"/></g></g><g filter="url(#a)"><path d="m23.381 75.59c-3.524-3.524-3.524-9.2375 0-12.762s9.2375-3.524 12.762 0l21.695 21.695c3.524 3.524 3.524 9.2376 0 12.762-3.524 3.5243-9.2375 3.5243-12.762 0l-21.695-21.695z" fill="#41AFFF"/><path d="m45.145 97.355c-3.524-3.524-3.524-9.2375 0-12.762l19.142-19.142c3.524-3.524 9.2375-3.524 12.762 0s3.524 9.2375 0 12.762l-19.142 19.142c-3.524 3.5244-9.2375 3.5244-12.762 0z" fill="#37FFCF"/><path d="m64.438 78.062c-3.524-3.524-3.524-9.2375 0-12.762l20.688-20.688c3.524-3.524 9.2375-3.524 12.762 0 3.5242 3.524 3.5242 9.2376 0 12.762l-20.688 20.688c-3.524 3.524-9.2375 3.524-12.762 0z" fill="#FF005C"/><path d="m84.608 57.892c-3.524-3.524-3.524-9.2375 0-12.762l13.75-13.75c3.5243-3.524 9.2373-3.524 12.761 0s3.524 9.2375 0 12.762l-13.749 13.75c-3.524 3.524-9.2376 3.524-12.762 0z" fill="#FFB800"/></g><defs><filter id="f" x=".73779" y="8.7378" width="133.02" height="111.26" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_23_86" stdDeviation="10"/></filter><filter id="e" x="19.738" y="59.186" width="41.742" height="41.742" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feGaussianBlur in="BackgroundImageFix" stdDeviation="0.5"/><feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_23_86"/><feBlend in="SourceGraphic" in2="effect1_backgroundBlur_23_86" result="shape"/></filter><filter id="d" x="41.502" y="61.808" width="39.19" height="39.19" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feGaussianBlur in="BackgroundImageFix" stdDeviation="0.5"/><feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_23_86"/><feBlend in="SourceGraphic" in2="effect1_backgroundBlur_23_86" result="shape"/></filter><filter id="c" x="60.795" y="40.969" width="40.736" height="40.736" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feGaussianBlur in="BackgroundImageFix" stdDeviation="0.5"/><feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_23_86"/><feBlend in="SourceGraphic" in2="effect1_backgroundBlur_23_86" result="shape"/></filter><filter id="b" x="80.965" y="27.738" width="33.797" height="33.797" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feGaussianBlur in="BackgroundImageFix" stdDeviation="0.5"/><feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_23_86"/><feBlend in="SourceGraphic" in2="effect1_backgroundBlur_23_86" result="shape"/></filter><filter id="a" x="19.738" y="27.738" width="95.024" height="73.26" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feGaussianBlur in="BackgroundImageFix" stdDeviation="0.5"/><feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_23_86"/><feBlend in="SourceGraphic" in2="effect1_backgroundBlur_23_86" result="shape"/></filter></defs></svg>`;

export default class ui {
  static desktopUi() {
    const topBarUi = () => {
      const topBar = document.getElementById("topBar");
      const appIcon = document.createElement("div");
      const iconContainer = document.createElement("div");
      iconContainer.innerHTML += icon;
      iconContainer.className = "h-12 w-12";

      const appName = document.createElement("span");
      const name = document.createElement("p");
      name.textContent = "Todo Dump";
      name.className = "text-xl";

      // const namePreview = document.createElement("p");
      // namePreview.textContent = "BETA";
      // namePreview.className = "text-[0.5rem] font-bold";

      appName.className = "flex";
      appName.append(name);
      appIcon.className = "flex items-center gap-4";

      appIcon.append(iconContainer, appName);

      const settingsIcon = document.createElement("div");
      settingsIcon.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path id="Vector" d="M12 11V16M12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21ZM12.0498 8V8.1L11.9502 8.1002V8H12.0498Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
      settingsIcon.className =
        "bg-gray-200 p-2 rounded-full border-2 border-gray-400/20 hover:border-gray-400/80 transition duration-200 cursor-pointer";
      settingsIcon.addEventListener("click", () => {
        const overlay = document.createElement("div");
        overlay.className =
          "h-screen w-screen absolute top-0 left-0 bg-white/70 backdrop-blur-none opacity-0 transition duration-500 flex items-center justify-center p-24";

        const container = document.createElement("div");
        container.className =
          "w-full max-w-5xl h-full border rounded-xl p-4 bg-white flex flex-col gap-4 overflow-y-scroll ";

        const row1 = document.createElement("div");
        row1.className = "flex items-center ml-8 gap-8";

        const appIcon = document.createElement("div");
        appIcon.innerHTML += icon;
        appIcon.className = "h-36 w-36";

        const appName = document.createElement("div");
        appName.className = "flex flex-col gap-4";

        const name = document.createElement("p");
        name.textContent = "Todo Dump";
        name.className = "text-5xl";

        const tag = document.createElement("p");
        tag.textContent = "Pure JavaScript Todo List";
        tag.className = "font-light";

        appName.append(name, tag);

        const closeBtnContainer = document.createElement("div");
        closeBtnContainer.style.width = "calc(100% - 14rem)";
        closeBtnContainer.style.maxWidth = "62rem";
        closeBtnContainer.className =
          "fixed self-start left-1/2 -translate-x-1/2 flex justify-end";

        const closeBtn = document.createElement("button");
        closeBtn.innerHTML += `<svg class="h-full w-full" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path id="Vector" d="M16 16L12 12M12 12L8 8M12 12L16 8M12 12L8 16" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
        closeBtn.className =
          "border border-gray-300 bg-gray-100 hover:bg-gray-200 transition  ml-auto h-10 w-10 rounded-md";

        closeBtn.addEventListener("click", () => {
          overlay.classList.add("opacity-0");
          setTimeout(() => {
            overlay.remove();
          }, 500);
        });
        closeBtnContainer.appendChild(closeBtn);

        row1.append(appIcon, appName, closeBtnContainer);

        const libraries = document.createElement("div");
        libraries.className = "flex flex-col gap-2 px-8";

        const libP = document.createElement("p");
        libP.textContent = "Open Source Libraries";
        libP.className = "text-xl font-semibold";
        libraries.appendChild(libP);

        const libDes = document.createElement("p");
        libDes.textContent =
          "These are some of the open source libraries used in this project, there may be more which are not mentioned.";
        libraries.appendChild(libDes);

        const libArray = [
          { name: "Webpack", link: "https://webpack.js.org" },
          { name: "Tailwind CSS", link: "https://tailwindcss.com" },
          { name: "Lodash", link: "https://lodash.com" },
          {
            name: "Favicons Webpack Plugin",
            link: "https://github.com/jantimon/favicons-webpack-plugin",
          },
          { name: "Post CSS", link: "https://postcss.org" },
          { name: "Emoji Mart", link: "https://github.com/missive/emoji-mart" },
          { name: "uniqid", link: "https://github.com/adamhalasz/uniqid" },
        ];

        for (let i = 0; i < libArray.length; i++) {
          const lib = document.createElement("a");
          lib.textContent = i + 1 + ". " + libArray[i].name;
          lib.href = libArray[i].link;
          lib.className = "ml-4 hover:text-spl-blue transition w-fit";

          libraries.appendChild(lib);
        }

        const iconsP = document.createElement("p");
        iconsP.textContent = "Icons by ";
        iconsP.className = "text-xl text-center font-semibold px-8";

        iconsP.innerHTML += `<a href="https://github.com/krystonschwarze/coolicons" class="hover:text-spl-blue transition-colors">coolicons</a>`;

        const deployed = document.createElement("div");
        deployed.className = "flex gap-2 items-center justify-center px-8";

        const deployedP = document.createElement("p");
        deployedP.textContent = "Deployed using";

        const deployedIcon = document.createElement("a");
        deployedIcon.href = "https://vercel.com";
        deployedIcon.className = "h-4";
        deployedIcon.innerHTML += `<svg class="h-full w-auto text-black hover:text-spl-blue transition-colors" xmlns="http://www.w3.org/2000/svg" width="4438" height="1000" viewBox="0 0 4438 1000"><path d="M2223.75 250C2051.25 250 1926.87 362.5 1926.87 531.25C1926.87 700 2066.72 812.5 2239.38 812.5C2343.59 812.5 2435.47 771.25 2492.34 701.719L2372.81 632.656C2341.25 667.188 2293.28 687.344 2239.38 687.344C2164.53 687.344 2100.94 648.281 2077.34 585.781H2515.16C2518.59 568.281 2520.63 550.156 2520.63 531.094C2520.63 362.5 2396.41 250 2223.75 250ZM2076.09 476.562C2095.62 414.219 2149.06 375 2223.75 375C2298.59 375 2352.03 414.219 2371.41 476.562H2076.09ZM2040.78 78.125L1607.81 828.125L1174.69 78.125H1337.03L1607.66 546.875L1878.28 78.125H2040.78ZM577.344 0L1154.69 1000H0L577.344 0ZM3148.75 531.25C3148.75 625 3210 687.5 3305 687.5C3369.38 687.5 3417.66 658.281 3442.5 610.625L3562.5 679.844C3512.81 762.656 3419.69 812.5 3305 812.5C3132.34 812.5 3008.13 700 3008.13 531.25C3008.13 362.5 3132.5 250 3305 250C3419.69 250 3512.66 299.844 3562.5 382.656L3442.5 451.875C3417.66 404.219 3369.38 375 3305 375C3210.16 375 3148.75 437.5 3148.75 531.25ZM4437.5 78.125V796.875H4296.88V78.125H4437.5ZM3906.25 250C3733.75 250 3609.38 362.5 3609.38 531.25C3609.38 700 3749.38 812.5 3921.88 812.5C4026.09 812.5 4117.97 771.25 4174.84 701.719L4055.31 632.656C4023.75 667.188 3975.78 687.344 3921.88 687.344C3847.03 687.344 3783.44 648.281 3759.84 585.781H4197.66C4201.09 568.281 4203.12 550.156 4203.12 531.094C4203.12 362.5 4078.91 250 3906.25 250ZM3758.59 476.562C3778.13 414.219 3831.41 375 3906.25 375C3981.09 375 4034.53 414.219 4053.91 476.562H3758.59ZM2961.25 265.625V417.031C2945.63 412.5 2929.06 409.375 2911.25 409.375C2820.47 409.375 2755 471.875 2755 565.625V796.875H2614.38V265.625H2755V409.375C2755 330 2847.34 265.625 2961.25 265.625Z" fill="currentColor" /></svg>`;

        deployed.append(deployedP, deployedIcon);

        const sourceCode = document.createElement("div");
        sourceCode.textContent = "Source Code at";
        sourceCode.className = " flex gap-2 justify-center";

        const gitLogo = document.createElement("a");
        gitLogo.className = "font-bold hover:text-spl-blue transition-colors";
        gitLogo.textContent = "Github";
        gitLogo.href = "https://github.com/dilpreetsinghaulakh/todo-list";
        gitLogo.target = "blank";
        sourceCode.appendChild(gitLogo);

        const devIn = document.createElement("p");
        devIn.textContent = "Developed in";
        devIn.className = "text-center";

        const city = document.createElement("span");
        city.textContent = " Amritsar";
        city.className =
          "font-bold bg-gradient-to-r from-orange-500 via-pink-500 to-violet-500 bg-clip-text text-transparent";
        devIn.appendChild(city);

        const copyright = document.createElement("p");
        copyright.textContent = `©${new Date().getFullYear()} Dilpreet Singh`;
        copyright.className = "text-center text-sm";

        const version = document.createElement("p");
        version.textContent = "Version 1.0.0";
        version.className = "text-center text-xs text-black/60";

        container.append(
          row1,
          libraries,
          iconsP,
          deployed,
          sourceCode,
          devIn,
          copyright,
          version
        );

        overlay.appendChild(container);

        setTimeout(() => {
          overlay.classList.remove("opacity-0");
          overlay.classList.remove("backdrop-blur-none");
          overlay.classList.add("backdrop-blur");
        }, 1);

        document.body.appendChild(overlay);
      });

      topBar.append(appIcon, settingsIcon);
      topBar.className =
        "flex px-4 py-6 justify-between items-center select-none";
    };

    const sideBar = () => {
      const sidebar = document.getElementById("sidebar");

      const today = new Date();
      const day = today.getDate();

      const homeAndDayArray = [
        {
          name: "Home",
          view: function () {
            homeView();
          },
          svg: `<svg class="w-6 h-6" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="Navigation / House_01"><path id="Vector" d="M20 17.0002V11.4522C20 10.9179 19.9995 10.6506 19.9346 10.4019C19.877 10.1816 19.7825 9.97307 19.6546 9.78464C19.5102 9.57201 19.3096 9.39569 18.9074 9.04383L14.1074 4.84383C13.3608 4.19054 12.9875 3.86406 12.5674 3.73982C12.1972 3.63035 11.8026 3.63035 11.4324 3.73982C11.0126 3.86397 10.6398 4.19014 9.89436 4.84244L5.09277 9.04383C4.69064 9.39569 4.49004 9.57201 4.3457 9.78464C4.21779 9.97307 4.12255 10.1816 4.06497 10.4019C4 10.6506 4 10.9179 4 11.4522V17.0002C4 17.932 4 18.3978 4.15224 18.7654C4.35523 19.2554 4.74432 19.6452 5.23438 19.8482C5.60192 20.0005 6.06786 20.0005 6.99974 20.0005C7.93163 20.0005 8.39808 20.0005 8.76562 19.8482C9.25568 19.6452 9.64467 19.2555 9.84766 18.7654C9.9999 18.3979 10 17.932 10 17.0001V16.0001C10 14.8955 10.8954 14.0001 12 14.0001C13.1046 14.0001 14 14.8955 14 16.0001V17.0001C14 17.932 14 18.3979 14.1522 18.7654C14.3552 19.2555 14.7443 19.6452 15.2344 19.8482C15.6019 20.0005 16.0679 20.0005 16.9997 20.0005C17.9316 20.0005 18.3981 20.0005 18.7656 19.8482C19.2557 19.6452 19.6447 19.2554 19.8477 18.7654C19.9999 18.3978 20 17.932 20 17.0002Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></g></svg>`,
        },
        {
          name: "Today",
          view: function () {
            todayView();
          },
          svg: `<svg class="w-6 h-6" width="24" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 8H20M4 8V16.8002C4 17.9203 4 18.4801 4.21799 18.9079C4.40973 19.2842 4.71547 19.5905 5.0918 19.7822C5.5192 20 6.07899 20 7.19691 20H16.8031C17.921 20 18.48 20 18.9074 19.7822C19.2837 19.5905 19.5905 19.2842 19.7822 18.9079C20 18.4805 20 17.9215 20 16.8036V8M4 8V7.2002C4 6.08009 4 5.51962 4.21799 5.0918C4.40973 4.71547 4.71547 4.40973 5.0918 4.21799C5.51962 4 6.08009 4 7.2002 4H8M20 8V7.19691C20 6.07899 20 5.5192 19.7822 5.0918C19.5905 4.71547 19.2837 4.40973 18.9074 4.21799C18.4796 4 17.9203 4 16.8002 4H16M16 2V4M16 4H8M8 2V4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><text font-family="-apple-system, system-ui, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'SF Pro Rounded'" font-size="9" transform="translate(4 2)"  font-weight="900" fill="currentColor"><tspan x="8" y="15" text-anchor="middle" id="todayDate">${day}</tspan></text></svg>`,
        },
        {
          name: "Past",
          view: function () {
            pastView();
          },
          svg: `<svg class="w-6 h-6" width="24" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 8H20M4 8V16.8002C4 17.9203 4 18.4801 4.21799 18.9079C4.40973 19.2842 4.71547 19.5905 5.0918 19.7822C5.5192 20 6.07899 20 7.19691 20H16.8031C17.921 20 18.48 20 18.9074 19.7822C19.2837 19.5905 19.5905 19.2842 19.7822 18.9079C20 18.4805 20 17.9215 20 16.8036V8M4 8V7.2002C4 6.08009 4 5.51962 4.21799 5.0918C4.40973 4.71547 4.71547 4.40973 5.0918 4.21799C5.51962 4 6.08009 4 7.2002 4H8M20 8V7.19691C20 6.07899 20 5.5192 19.7822 5.0918C19.5905 4.71547 19.2837 4.40973 18.9074 4.21799C18.4796 4 17.9203 4 16.8002 4H16M16 2V4M16 4H8M8 2V4M16 14H8M8 14L10.5 16.5M8 14L10.5 11.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
        },
        {
          name: "This Week",
          view: function () {
            weekView();
          },
          svg: `<svg class="w-6 h-6" width="24" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="Calendar / Calendar_Week"><path id="Vector" d="M4 8H20M4 8V16.8002C4 17.9203 4 18.4801 4.21799 18.9079C4.40973 19.2842 4.71547 19.5905 5.0918 19.7822C5.5192 20 6.07899 20 7.19691 20H16.8031C17.921 20 18.48 20 18.9074 19.7822C19.2837 19.5905 19.5905 19.2842 19.7822 18.9079C20 18.4805 20 17.9215 20 16.8036V8M4 8V7.2002C4 6.08009 4 5.51962 4.21799 5.0918C4.40973 4.71547 4.71547 4.40973 5.0918 4.21799C5.51962 4 6.08009 4 7.2002 4H8M20 8V7.19691C20 6.07899 20 5.5192 19.7822 5.0918C19.5905 4.71547 19.2837 4.40973 18.9074 4.21799C18.4796 4 17.9203 4 16.8002 4H16M8 4H16M8 4V2M16 4V2M16 12H8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></g></svg>`,
        },
        {
          name: "This Month",
          view: function () {
            monthView();
          },
          svg: `<svg class="w-6 h-6" width="24" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="Calendar / Calendar_Days"><path id="Vector" d="M8 4H7.2002C6.08009 4 5.51962 4 5.0918 4.21799C4.71547 4.40973 4.40973 4.71547 4.21799 5.0918C4 5.51962 4 6.08009 4 7.2002V8M8 4H16M8 4V2M16 4H16.8002C17.9203 4 18.4796 4 18.9074 4.21799C19.2837 4.40973 19.5905 4.71547 19.7822 5.0918C20 5.5192 20 6.07899 20 7.19691V8M16 4V2M4 8V16.8002C4 17.9203 4 18.4801 4.21799 18.9079C4.40973 19.2842 4.71547 19.5905 5.0918 19.7822C5.5192 20 6.07899 20 7.19691 20H16.8031C17.921 20 18.48 20 18.9074 19.7822C19.2837 19.5905 19.5905 19.2842 19.7822 18.9079C20 18.4805 20 17.9215 20 16.8036V8M4 8H20M16 16H16.002L16.002 16.002L16 16.002V16ZM12 16H12.002L12.002 16.002L12 16.002V16ZM8 16H8.002L8.00195 16.002L8 16.002V16ZM16.002 12V12.002L16 12.002V12H16.002ZM12 12H12.002L12.002 12.002L12 12.002V12ZM8 12H8.002L8.00195 12.002L8 12.002V12Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></g></svg>`,
        },
      ];

      const homeAndDay = document.createElement("div");

      for (let i = 0; i < homeAndDayArray.length; i++) {
        const span = document.createElement("span");
        span.className =
          "flex items-center cursor-pointer gap-2 transition hover:text-spl-blue";

        const icon = document.createElement("div");
        icon.innerHTML += homeAndDayArray[i].svg;
        icon.className = circleBgIconStyleClasses;

        const text = document.createElement("p");
        text.textContent = homeAndDayArray[i].name;
        text.className = textStyleClasses;

        span.addEventListener("click", () => {
          homeAndDayArray[i].view();
        });

        span.append(icon, text);
        homeAndDay.append(span);
      }

      homeAndDay.className = "flex flex-col gap 2";

      sidebar.className =
        "min-w-[256px] px-4 flex flex-col gap-2 select-none overflow-y-scroll";
      sidebar.append(homeAndDay, createNewProjectBtn, projects());
    };

    const createNewProjectBtn = document.createElement("span");
    createNewProjectBtn.className =
      "flex items-center gap-2 cursor-pointer mt-4";

    const addIcon = document.createElement("div");
    addIcon.innerHTML += `<svg class="w-6 h-6" width="24" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="File / Folder_Add"><path id="Vector" d="M12 16V13M12 13V10M12 13H9M12 13H15M3 6V16.8C3 17.9201 3 18.4798 3.21799 18.9076C3.40973 19.2839 3.71547 19.5905 4.0918 19.7822C4.5192 20 5.07899 20 6.19691 20H17.8031C18.921 20 19.48 20 19.9074 19.7822C20.2837 19.5905 20.5905 19.2841 20.7822 18.9078C21.0002 18.48 21.0002 17.9199 21.0002 16.7998L21.0002 9.19978C21.0002 8.07967 21.0002 7.51962 20.7822 7.0918C20.5905 6.71547 20.2839 6.40973 19.9076 6.21799C19.4798 6 18.9201 6 17.8 6H12M3 6H12M3 6C3 4.89543 3.89543 4 5 4H8.67452C9.1637 4 9.40886 4 9.63904 4.05526C9.84311 4.10425 10.0379 4.18526 10.2168 4.29492C10.4186 4.41857 10.5918 4.59182 10.9375 4.9375L12 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></g></svg>`;
    addIcon.className = circleBgIconStyleClasses;
    addIcon.classList.add("bg-spl-blue");
    addIcon.classList.add("text-white");

    const createNewText = document.createElement("p");
    createNewText.textContent = "Add New Project";
    createNewText.className = textStyleClasses;

    createNewProjectBtn.append(addIcon, createNewText);

    createNewProjectBtn.addEventListener("mouseover", () => {
      addIcon.classList.add("shadow-lg");
    });
    createNewProjectBtn.addEventListener("mouseleave", () => {
      addIcon.classList.remove("shadow-lg");
    });

    createNewProjectBtn.addEventListener("click", () => {
      addProjectForm();
    });

    const projects = () => {
      const projects = document.createElement("div");
      projects.id = "sidebarProjects";
      projects.className = "flex flex-col gap-2";

      const sortedKeyArray = this.getProjectNamesSorted();

      sortedKeyArray.forEach((key) => {
        const project = document.createElement("span");
        project.className =
          "flex justify-end gap-2 items-center cursor-pointer";

        const emoji = document.createElement("p");
        emoji.textContent = this.getProjectNameEmoji(key);
        emoji.className = circleBgIconStyleClasses;
        emoji.style.backgroundColor = this.randomColorPastel();

        const projectName = document.createElement("p");
        projectName.textContent = this.getProjectNameOnly(key);
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
    };

    const updateSidebarProjects = () => {
      const newProjects = projects();
      document.getElementById("sidebarProjects").replaceWith(newProjects);
    };

    const addBackdrop = () => {
      const backdrop = document.createElement("div");
      backdrop.id = "backdrop";
      backdrop.className =
        "h-screen w-screen absolute top-0 left-0 bg-white/70 hidden opacity-0 -z-10 duration-500 transition-all select-none";
      document.body.append(backdrop);
      backdrop.addEventListener("click", (e) => {
        if (e.target.id === "backdrop") {
          deactivateBackdrop();
        }
      });
    };

    const activateBackdrop = () => {
      const backdrop = document.getElementById("backdrop");
      backdrop.classList.remove("hidden");
      backdrop.classList.remove("-z-10");
      setTimeout(() => {
        backdrop.classList.add("opacity-100");
        backdrop.classList.add("backdrop-blur");
      }, 0);
    };

    const deactivateBackdrop = () => {
      const backdrop = document.getElementById("backdrop");
      backdrop.classList.remove("opacity-100");
      backdrop.classList.remove("backdrop-blur");
      setTimeout(() => {
        backdrop.classList.add("hidden");
        backdrop.classList.add("-z-10");

        backdrop.innerHTML = "";
      }, 300);
    };

    const bigTextStyleClasses = "text-3xl font-bold";

    const editProjectForm = (name) => {
      activateBackdrop();
      const form = document.createElement("div");
      form.className =
        "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-8 flex flex-col w-screen max-w-lg";
      form.id = "form";

      const oldEmoji = this.getProjectNameEmoji(name);
      const oldName = this.getProjectNameOnly(name);

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
        this.newEmojiSelector(emojiSelectorContainer, newEmoji);
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
    };

    const addProjectForm = () => {
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
        this.newEmojiSelector(emojiSelectorContainer, emojiP);
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
    };

    const openProject = (project) => {
      const projectName = document.createElement("span");
      projectName.className = "flex gap-4 items-center";

      const emoji = document.createElement("p");
      emoji.textContent = this.getProjectNameEmoji(project);
      emoji.className = circleBgIconStyleClasses;
      emoji.classList.add("text-4xl");
      emoji.classList.add("h-16");
      emoji.classList.add("pastel-rainbow-bg");

      const name = document.createElement("p");
      name.textContent = this.getProjectNameOnly(project);
      name.className = "text-5xl font-thin";

      projectName.append(emoji, name);

      const projectTodoData = getTodoData()[project];
      // console.log(projectTodoData);

      const todo = document.createElement("div");
      todo.id = "todoDiv";

      printTodo(todo, projectTodoData, project);

      this.changeContent(projectName, todo, addTodoUi(project, todo));
    };

    const noTodoContainerClasses =
      "flex items-center flex-grow justify-center rounded-md bg-gray-50 border";
    const withTodoContainerClasses =
      "flex-grow flex flex-col gap-4 overflow-y-scroll rounded-md bg-gray-50 p-2 border";

    const printTodo = (todoDiv, todoArray, project) => {
      if (!todoArray.length) {
        todoDiv.appendChild(getNoTodoDiv());
        todoDiv.className = noTodoContainerClasses;
      } else {
        todoDiv.className = withTodoContainerClasses;

        for (let i = 0; i < todoArray.length; i++) {
          todoDiv.appendChild(getTodoDiv(todoArray[i], project));
        }
      }
    };

    const getNoTodoDiv = () => {
      const noTodo = document.createElement("p");
      noTodo.textContent = "No Todo";
      noTodo.id = "noTodo";
      noTodo.className = "text-gray-500";

      return noTodo;
    };
    const getTodoDiv = (todoObj, project) => {
      const todoContainer = document.createElement("div");
      todoContainer.className = "border rounded-md p-4 bg-white";

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
        todoContainer.remove();

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
            if (
              !todoContainer.contains(e.target) &&
              e.target.id !== "checkbox"
            ) {
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

    const addTodoUi = (project, todoDiv) => {
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
    };

    const newTodoDiv = (todoObj, project, todoDiv) => {
      if (todoDiv.querySelector("#noTodo")) {
        todoDiv.innerHTML = "";
        todoDiv.className = withTodoContainerClasses;
        todoDiv.appendChild(getTodoDiv(todoObj, project));
      } else {
        todoDiv.appendChild(getTodoDiv(todoObj, project));
      }
    };

    const homeView = () => {
      const todoData = getTodoData();
      const content = document.getElementById("content");
      content.className =
        "flex flex-col w-full h-full mr-4 gap-4 overflow-x-visible transition";

      const yourProjects = document.createElement("h1");
      yourProjects.textContent = `Your Projects (${
        Object.keys(todoData).length
      })`;
      yourProjects.className = "text-5xl font-thin";

      const sortedArray = this.getProjectNamesSorted();

      const projectsContainer = document.createElement("div");
      projectsContainer.className = "w-full overflow-x-scroll flex-shrink-0";

      const projects = document.createElement("div");
      projects.className = "flex gap-2";

      for (let i = 0; i < sortedArray.length; i++) {
        const project = document.createElement("div");
        project.className =
          "flex gap-2 items-center whitespace-nowrap bg-gray-100 focus:bg-gray-200 hover:bg-gray-200 transition text-black font-medium text-sm border-black py-2 px-5 rounded-xl cursor-pointer select-none";

        const projectName = document.createElement("p");
        projectName.textContent = this.getProjectNameOnly(sortedArray[i]);
        projectName.className = "w-max";

        project.append(projectName);
        project.addEventListener("click", () => {
          openProject(sortedArray[i]);
        });
        projects.appendChild(project);
      }

      projectsContainer.appendChild(projects);

      this.getTodoOnly();

      const innerContent = document.createElement("div");
      innerContent.className = "flex-grow flex";

      const todoOnly = this.getTodoOnly();

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
      this.changeContent(yourProjects, projectsContainer, innerContent);
    };

    const todayView = () => {
      const todoOnly = this.getTodoOnly();
      let sorted = _.orderBy(
        _.filter(todoOnly, (element) => {
          return (
            element.dueDate === new Date().toJSON().slice(0, 10) &&
            !element.isDone
          );
        }),
        ["priority", "title"],
        ["desc", "asc"]
      );
      getViewUi(sorted, "Today");
    };

    const pastView = () => {
      const todoOnly = this.getTodoOnly();
      let sorted = _.orderBy(
        _.filter(todoOnly, (element) => {
          return (
            element.dueDate < new Date().toJSON().slice(0, 10) &&
            !element.isDone
          );
        }),
        ["priority", "title"],
        ["desc", "asc"]
      );
      getViewUi(sorted, "Past");
    };

    const weekView = () => {
      const todoOnly = this.getTodoOnly();

      Date.prototype.getWeek = function () {
        var oneJan = new Date(this.getFullYear(), 0, 1);
        var today = new Date(
          this.getFullYear(),
          this.getMonth(),
          this.getDate()
        );
        var dayOfYear = (today - oneJan + 86400000) / 86400000;
        return Math.ceil(dayOfYear / 7);
      };

      let sorted = _.orderBy(
        _.filter(todoOnly, (element) => {
          return (
            new Date(element.dueDate).getWeek() === new Date().getWeek() &&
            new Date(element.dueDate).getFullYear() ===
              new Date().getFullYear() &&
            !element.isDone
          );
        }),
        ["priority", "title"],
        ["desc", "asc"]
      );
      getViewUi(sorted, "This Week");
    };

    const monthView = () => {
      const todoOnly = this.getTodoOnly();
      let sorted = _.orderBy(
        _.filter(todoOnly, (element) => {
          return (
            new Date(element.dueDate).getMonth() === new Date().getMonth() &&
            new Date(element.dueDate).getFullYear() ===
              new Date().getFullYear() &&
            !element.isDone
          );
        }),
        ["priority", "title"],
        ["desc", "asc"]
      );
      getViewUi(sorted, "This Month");
    };

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

      this.changeContent(heading, todoContainer);
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
      project.textContent = this.getProjectNameOnly(element.project);
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

    topBarUi();
    sideBar();
    addBackdrop();
    homeView();
  }

  static changeContent(...args) {
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

  static newEmojiSelector(emojiSelectorContainer, emojiP) {
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
          if (
            e.target.id !== "emojiSelector" &&
            emojiSelectorContainer.innerHTML
          )
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

  static randomColorPastel = () => {
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
  };

  static getProjectNamesSorted() {
    const todoData = getTodoData();
    const onlyNameArray = [];
    Object.keys(todoData).forEach((key) => {
      onlyNameArray.push(key);
    });
    const sortedKeyArray = onlyNameArray.sort((a, b) =>
      this.getProjectNameOnly(a)
        .trim()
        .toLowerCase()
        .localeCompare(
          this.getProjectNameOnly(b).trim().toLowerCase(),
          undefined,
          { sensitivity: "base" }
        )
    );
    return sortedKeyArray;
  }

  static getTodoOnly() {
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

  static getProjectNameEmoji(name) {
    return name.replace(emojiRegex, "");
  }

  static getProjectNameOnly(name) {
    return name.replace(projectNameRegex, "");
  }

  static initialInsertions() {
    this.desktopUi();
  }
}
