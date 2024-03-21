export function addBackdrop() {
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
}

export function activateBackdrop() {
  const backdrop = document.getElementById("backdrop");
  backdrop.classList.remove("hidden");
  backdrop.classList.remove("-z-10");
  setTimeout(() => {
    backdrop.classList.add("opacity-100");
    backdrop.classList.add("backdrop-blur");
  }, 0);
}

export function deactivateBackdrop() {
  const backdrop = document.getElementById("backdrop");
  backdrop.classList.remove("opacity-100");
  backdrop.classList.remove("backdrop-blur");
  setTimeout(() => {
    backdrop.classList.add("hidden");
    backdrop.classList.add("-z-10");

    backdrop.innerHTML = "";
  }, 300);
}
