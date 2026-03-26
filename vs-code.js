document.addEventListener("DOMContentLoaded", function () {
  let observedDialog = null;
  let dialogObserver = null;
  let rafPending = false;

  const checkElement = setInterval(() => {
    const commandDialog = document.querySelector(".quick-input-widget");
    if (!commandDialog) return;

    if (commandDialog === observedDialog) {
      syncBackdrop();
      return;
    }

    if (dialogObserver) dialogObserver.disconnect();
    observedDialog = commandDialog;

    dialogObserver = new MutationObserver(() => syncBackdrop());
    dialogObserver.observe(commandDialog, {
      attributes: true,
      attributeFilter: ["style", "class", "aria-hidden"],
    });

    // Check immediately so backdrop appears on first open
    syncBackdrop();

    // The Command Palette widget generally persists; stop polling once attached.
    clearInterval(checkElement);
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

  function isCommandPaletteVisible(commandDialog) {
    if (!commandDialog) return false;

    // Most robust across VS Code changes: use computed style + layout visibility.
    const styles = window.getComputedStyle(commandDialog);
    if (styles.display === "none") return false;
    if (styles.visibility === "hidden") return false;
    if (styles.opacity === "0") return false;
    if (commandDialog.getAttribute("aria-hidden") === "true") return false;
    if (commandDialog.offsetParent === null && styles.position !== "fixed")
      return false;

    const rect = commandDialog.getBoundingClientRect();
    return rect.width > 0 && rect.height > 0;
  }

  function syncBackdrop() {
    if (rafPending) return;
    rafPending = true;
    requestAnimationFrame(() => {
      rafPending = false;
      const commandDialog = document.querySelector(".quick-input-widget");
      const isVisible = isCommandPaletteVisible(commandDialog);
      isVisible ? showBackdrop() : hideBackdrop();
    });
  }

  function showBackdrop() {
    if (document.getElementById("command-blur")) return;

    const targetDiv = document.querySelector(".monaco-workbench");
    if (!targetDiv) return;

    const backdrop = document.createElement("div");
    backdrop.id = "command-blur";
    backdrop.addEventListener("click", hideBackdrop);

    // Insert behind the Command Palette so it never blocks interaction.
    const commandDialog = document.querySelector(".quick-input-widget");
    if (commandDialog && commandDialog.parentNode) {
      commandDialog.parentNode.insertBefore(backdrop, commandDialog);
    } else {
      targetDiv.appendChild(backdrop);
    }

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
