# VS Code Enhanced UI

Minimal, fast, and beautiful UI polish for Visual Studio Code inspired by macOS/iOS smoothness. This skin keeps the editor productive with subtle animations, compact spacing, and tasteful highlights.

## Features

- Clean tabs with glow and subtle lift
- Centered command palette with blur + scale-in
- Minimal activity bar with gentle hover/press feedback
- Explorer rows slide + subtle highlight on hover
- Smooth pane resize/collapse transitions and resizer (sash) highlight
- Suggest/hover widgets with rise/slide animations
- Hidden scrollbars (editable in CSS)
- Status bar press feedback and compact layout

## Files

- `vs-code.css` — main stylesheet
- `vs-code.js` — optional JS (command palette backdrop overlay + click/Escape dismissal)

## Setup (Windows/macOS/Linux)

This skin uses the extension `be5invis.vscode-custom-css` to inject custom CSS/JS into VS Code.

### 1) Install the loader extension

- Open VS Code → Extensions → search “Custom CSS and JS Loader” (`be5invis.vscode-custom-css`) → Install

### 2) Put the files in a stable location

Keep `vs-code.css` (and optionally `vs-code.js`) somewhere that won’t move. You’ll reference them via absolute `file:///...` URLs.

### 3) Add the import paths (pick your OS)

Notes (all OSes):

- These must be `file:///` URLs (not plain file paths).
- Use forward slashes `/` in the URL.
- If your path contains spaces, encode them as `%20`.

#### Windows

Settings (JSON):

```json
{
  "vscode_custom_css.imports": [
    "file:///d:/CoreX/Customization/vscode-enhanced-ui/vs-code.css",
    "file:///d:/CoreX/Customization/vscode-enhanced-ui/vs-code.js"
  ]
}
```

CSS-only (optional): remove the JS line.

Enable/reload:

- `Ctrl+Shift+P` → “Reload Custom CSS and JS”

#### macOS

Settings (JSON):

```json
{
  "vscode_custom_css.imports": [
    "file:///Users/<you>/vscode-enhanced-ui/vs-code.css",
    "file:///Users/<you>/vscode-enhanced-ui/vs-code.js"
  ]
}
```

Enable/reload:

- `Cmd+Shift+P` → “Reload Custom CSS and JS”

#### Linux

Settings (JSON):

```json
{
  "vscode_custom_css.imports": [
    "file:///home/<you>/vscode-enhanced-ui/vs-code.css",
    "file:///home/<you>/vscode-enhanced-ui/vs-code.js"
  ]
}
```

Enable/reload:

- `Ctrl+Shift+P` → “Reload Custom CSS and JS”

## Customize

- Animations: Defaults are fast and subtle. You can tweak durations/curves in `vs-code.css`.
- Scrollbars: Currently fully hidden. Search for the "SCROLLBARS" section and relax/remove those rules to restore scrollbars.
- Activity bar: Sizes, spacing, and hover/active effects live in the "ACTIVITY BAR" section.
- Accent color: Primary blue is `#61afef`; update to your theme if desired.

## Troubleshooting

- After updates, re-run from the Command Palette → “Reload Custom CSS and JS”
- VS Code updates may disable the loader. Re-enable via the same command.
- If something looks broken:
  - Disable the extension temporarily
  - Check for conflicting custom themes/extensions
  - Verify paths in `vscode_custom_css.imports`

## Known Limitations

- Do NOT use the CSS `:has()` selector in VS Code UI — it can break the entire interface.
- Heavy physics animations (overshoot/spring on many elements) may cause jitter; this skin sticks to short, gentle transitions.

## Safety Notes

- Custom CSS/JS injection is supported via the extension but not officially endorsed by Microsoft.
- Use at your own risk; keep a backup of your settings and be ready to disable if needed.

## Uninstall / Revert

- Remove the entries from `vscode_custom_css.imports`
- Run from the Command Palette → “Reload Custom CSS and JS”

## License

Personal use focused. Please respect original theme authors. No copyrighted assets are included.
