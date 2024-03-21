import { addBackdrop } from "./backdrop";
import SideBar from "./sideBar";
import TopBar from "./topBar";
import { homeView } from "./uiViews";

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

export default function Ui() {
  addBackdrop();
  TopBar();
  SideBar();
  homeView();
}
