document.addEventListener("DOMContentLoaded", function () {
  if (window.__vscodeEnhancedUiCommandPaletteFxInstalled) return;
  window.__vscodeEnhancedUiCommandPaletteFxInstalled = true;

  let observedDialog = null;
  let dialogObserver = null;
  let rafPending = false;
  let lastVisible = false;

  const checkElement = setInterval(() => {
    const commandDialog = document.querySelector(".quick-input-widget");

    // If the widget is removed from the DOM when closed, we still need to run a
    // sync to hide the backdrop and reset internal state.
    if (!commandDialog) {
      if (lastVisible || document.getElementById("command-blur")) {
        syncBackdrop();
      }
      return;
    }

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
  }, 200);

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
    if (commandDialog.getAttribute("aria-hidden") === "true") return false;
    if (commandDialog.offsetParent === null && styles.position !== "fixed")
      return false;

    const rect = commandDialog.getBoundingClientRect();
    return rect.width > 0 && rect.height > 0;
  }

  function restartPaletteAnimation(commandDialog) {
    if (!commandDialog) return;

    // Restart the CSS animation on every open. We need !important because the
    // stylesheet sets animation with !important.
    commandDialog.style.setProperty("animation", "none", "important");
    // Force reflow so the browser commits the 'none' state.
    void commandDialog.offsetWidth;
    commandDialog.style.removeProperty("animation");
  }

  function syncBackdrop() {
    if (rafPending) return;
    rafPending = true;
    requestAnimationFrame(() => {
      rafPending = false;
      const commandDialog = document.querySelector(".quick-input-widget");
      const isVisible = isCommandPaletteVisible(commandDialog);

      if (isVisible && !lastVisible) {
        restartPaletteAnimation(commandDialog);
      }

      lastVisible = isVisible;
      isVisible ? showBackdrop(commandDialog) : hideBackdrop();
    });
  }

  function showBackdrop(commandDialog) {
    const existing = document.getElementById("command-blur");
    const targetDiv = document.querySelector(".monaco-workbench");
    if (!targetDiv) return;

    const widget =
      commandDialog || document.querySelector(".quick-input-widget");

    if (existing) {
      // If the palette was closed then re-opened quickly, a fade-out removal may
      // still be pending. Make it visible again.
      existing.style.opacity = "1";

      // Keep it directly behind the current widget to avoid stacking-context bugs.
      if (widget && widget.parentNode) {
        if (
          existing.parentNode !== widget.parentNode ||
          existing.nextSibling !== widget
        ) {
          widget.parentNode.insertBefore(existing, widget);
        }
      }

      return;
    }

    const backdrop = document.createElement("div");
    backdrop.id = "command-blur";
    backdrop.addEventListener("click", hideBackdrop);

    // Insert behind the Command Palette so it never blocks interaction.
    if (widget && widget.parentNode) {
      widget.parentNode.insertBefore(backdrop, widget);
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
        // If the palette reopened mid-fade, don't remove.
        if (element.style.opacity !== "0") return;
        element.remove();
      };

      element.addEventListener("transitionend", remove, { once: true });

      // Fallback in case transitionend doesn't fire
      setTimeout(remove, 200);
    }
  }
});
