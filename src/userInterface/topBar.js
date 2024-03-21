import icon from "../assets/icon";
import SettingsOverlay from "./settingsOverlay";

export default function TopBar() {
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
    SettingsOverlay();
  });

  topBar.append(appIcon, settingsIcon);
  topBar.className = "flex px-4 py-6 justify-between items-center select-none";
}
