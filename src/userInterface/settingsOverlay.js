import icon from "../assets/icon";

export default function SettingsOverlay() {
  const overlay = document.createElement("div");
  overlay.className =
    "h-screen w-screen absolute top-0 left-0 bg-white/0 backdrop-blur-none transition duration-500 flex justify-center p-24 pb-4 overflow-y-hidden"; // opacity-0 bg-white/70

  const container = document.createElement("div");
  container.className =
    "w-full max-w-4xl h-fit border rounded-xl p-4 bg-white flex flex-col gap-4 translate-y-[100%] transition-all duration-700"; //overflow-y-scroll  h-full

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
  closeBtnContainer.className =
    "fixed self-start left-1/2 -translate-x-1/2 flex justify-end py-4 -translate-y-4 opacity-0 transition-opacity";

  const closeBtn = document.createElement("button");
  closeBtn.innerHTML += `<svg class="h-8 w-8" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path id="Vector" d="M16 16L12 12M12 12L8 8M12 12L16 8M12 12L8 16" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
  closeBtn.className =
    "bg-gray-300/30 hover:bg-gray-200 transition ml-auto p-1 rounded-full backdrop-blur";

  closeBtn.addEventListener("click", () => {
    overlay.classList.add("opacity-0");
    overlay.classList.remove("backdrop-blur");
    closeBtnContainer.classList.add("opacity-0");
    setTimeout(() => {
      overlay.remove();
      closeBtnContainer.remove();
    }, 500);
  });
  closeBtnContainer.appendChild(closeBtn);

  row1.append(appIcon, appName);

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
  version.textContent = "Version 1.0.1";
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

  document.body.append(overlay, closeBtnContainer);

  setTimeout(() => {
    overlay.classList.remove("bg-white/0");
    overlay.classList.remove("backdrop-blur-none");
    overlay.classList.add("backdrop-blur");
    overlay.classList.add("bg-white/70");

    container.classList.remove("translate-y-[100%]");
    container.classList.add("transform-none");
    container.classList.remove("opacity-0");
  }, 1);

  setTimeout(() => {
    overlay.classList.remove("overflow-y-hidden");
    overlay.classList.add("overflow-y-scroll");

    closeBtnContainer.style.top = `calc(${
      container.getBoundingClientRect().top
    }px + 1rem`;
    closeBtnContainer.classList.remove("opacity-0");
  }, 750);

  // Close Button Container Properties
  const setCloseBtnContainerWidth = () => {
    closeBtnContainer.style.width = `calc(${container.offsetWidth}px - 2rem`;
  };

  overlay.addEventListener("scroll", () => {
    closeBtnContainer.style.top = `calc(${
      container.getBoundingClientRect().top
    }px + 1rem`;
    if (container.getBoundingClientRect().top <= 0) {
      closeBtnContainer.style.top = "1rem";
    }
  });

  setCloseBtnContainerWidth();

  window.addEventListener("resize", () => {
    setCloseBtnContainerWidth();
  });
}
