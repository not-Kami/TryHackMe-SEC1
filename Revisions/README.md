# Revisions — Interactive quiz

One questionnaire **per module** (Linux, Windows, AD, Networking, etc.). Choose a module on the home screen, answer the questions, get feedback and a score.

## Requirements
- **Node.js** (v18+ recommended), which includes npm.

## Install & run

```bash
npm install
npm run dev
```

Then open the URL shown in the terminal (e.g. `http://localhost:5173`) in your browser.

**Build for production:** `npm run build` → output in `dist/`. Serve that folder with any static host.

## Structure
- **`src/revisions/`** — One file per module:
  - `linux.js` — Linux Fundamentals (TryHackMe)
  - `windows.js` — Windows & AD Fundamentals (TryHackMe)
  - *(later)* `networking.js`, etc.
- **`src/revisions/index.js`** — Imports all revisions and exports a single `revisions` array. Add new modules here.

## Adding a new module (e.g. Windows)
1. Create `src/revisions/windows.js` with:
   - `export const id = 'windows'`
   - `export const title = 'Windows Fundamentals'`
   - `export const description = '...'`
   - `export const questions = [ { text, options, correct (0–3), hint }, ... ]`
2. In `src/revisions/index.js`, import and add the new revision to the `revisions` array.
