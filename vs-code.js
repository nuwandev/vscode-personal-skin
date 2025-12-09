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
      clearInterval(checkElement);
    }
  }, 500);

  // Handle keyboard shortcuts
  document.addEventListener(
    "keydown",
    function (event) {
      if (event.key === "Escape") {
        hideBackdrop();
      }
    },
    true
  );

  function showBackdrop() {
    if (document.getElementById("command-blur")) return; // Already exists

    const targetDiv = document.querySelector(".monaco-workbench");
    if (!targetDiv) return;

    const backdrop = document.createElement("div");
    backdrop.id = "command-blur";
    backdrop.addEventListener("click", hideBackdrop);
    targetDiv.appendChild(backdrop);
  }

  function hideBackdrop() {
    const element = document.getElementById("command-blur");
    if (element) {
      element.remove();
    }
  }
});
