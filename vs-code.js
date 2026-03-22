document.addEventListener("DOMContentLoaded", function () {
  const checkElement = setInterval(() => {
    const commandDialog = document.querySelector(".quick-input-widget");
    if (commandDialog) {
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (
            mutation.type === "attributes" &&
            mutation.attributeName === "style"
          ) {
            const isVisible = commandDialog.style.display !== "none";
            isVisible ? showBackdrop() : hideBackdrop();
          }
        });
      });

      observer.observe(commandDialog, { attributes: true });

      // Fix: Check initial state immediately so backdrop appears on first open
      const isVisible = commandDialog.style.display !== "none";
      if (isVisible) showBackdrop();

      clearInterval(checkElement);
    }
  }, 500);

  document.addEventListener(
    "keydown",
    function (event) {
      if (event.key === "Escape") {
        hideBackdrop();
      }
    },
    true,
  );

  function showBackdrop() {
    if (document.getElementById("command-blur")) return;

    const targetDiv = document.querySelector(".monaco-workbench");
    if (!targetDiv) return;

    const backdrop = document.createElement("div");
    backdrop.id = "command-blur";
    backdrop.addEventListener("click", hideBackdrop);
    targetDiv.appendChild(backdrop);

    // Trigger CSS opacity transition for a smooth fade-in
    requestAnimationFrame(() => {
      backdrop.style.opacity = "1";
    });
  }

  function hideBackdrop() {
    const element = document.getElementById("command-blur");
    if (element) {
      // Fade out, then remove after transition
      element.style.opacity = "0";

      const remove = () => {
        if (element && element.parentNode) {
          element.parentNode.removeChild(element);
        }
      };

      element.addEventListener("transitionend", remove, { once: true });

      // Fallback in case transitionend doesn't fire
      setTimeout(remove, 200);
    }
  }
});
