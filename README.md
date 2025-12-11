# VS Code Enhanced UI

Minimal, fast, and beautiful UI polish for Visual Studio Code inspired by macOS/iOS smoothness. This skin keeps the editor productive with subtle animations, compact spacing, and tasteful highlights.

## Features

- Clean tabs with glow and subtle lift
- Centered command palette with blur + scale
- Minimal activity bar (decorative) with gentle hover
- Explorer rows slide/fade on hover
- Smooth pane collapse/expand and resizer highlight
- Suggest/hover widgets with rise/slide animations
- Thin (or hidden) scrollbars — configurable
- Status bar press feedback and compact layout

## Files

- `vs-code.css` — main stylesheet
- `vs-code.js` — optional JS (command palette backdrop/blur)

## Quick Start (Windows/macOS/Linux)

This skin uses the extension `be5invis.vscode-custom-css` to inject custom CSS/JS into VS Code.

1. Install extension

   - Open VS Code → Extensions → search "Custom CSS and JS Loader" (`be5invis.vscode-custom-css`) and install

2. Clone or download this repo

   ```bash
   git clone https://github.com/nuwandev/vscode-personal-skin.git
   cd vscode-personal-skin
   ```

3. Point VS Code to the CSS/JS files

   Open VS Code Settings (JSON) and add:

   ```json
   {
     "vscode_custom_css.imports": [
       "file:///d:/CoreX/Customization/vscode-enhanced-ui/vs-code.css",
       "file:///d:/CoreX/Customization/vscode-enhanced-ui/vs-code.js"
     ]
   }
   ```

   Notes:

   - Use `file:///` absolute paths. On macOS/Linux, change the path accordingly (examples below).
   - If you only want CSS, you can remove the JS line.

4. Enable the custom CSS/JS
   - Run command: `Ctrl+Shift+P` → "Reload Custom CSS and JS"
   - VS Code will restart and apply the skin

### Path Examples

- Windows: `file:///d:/CoreX/Customization/vscode-enhanced-ui/vs-code.css`
- macOS: `file:///Users/<you>/vscode-personal-skin/vs-code.css`
- Linux: `file:///home/<you>/vscode-personal-skin/vs-code.css`

## Customize

- Animations: Defaults are fast and subtle. You can tweak durations/curves in `vs-code.css`.
- Scrollbars: Currently hidden. Search for "SCROLLBARS" section to switch to thin/fade variant.
- Activity bar: Decorative and minimal; sizes and spacing in the "ACTIVITY BAR" section.
- Accent color: Primary blue is `#61afef`; update to your theme if desired.

## Troubleshooting

- After updates, re-run: `Ctrl+Shift+P` → "Reload Custom CSS and JS"
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
- Run: `Ctrl+Shift+P` → "Reload Custom CSS and JS"

## License

Personal use focused. Please respect original theme authors. No copyrighted assets are included.
