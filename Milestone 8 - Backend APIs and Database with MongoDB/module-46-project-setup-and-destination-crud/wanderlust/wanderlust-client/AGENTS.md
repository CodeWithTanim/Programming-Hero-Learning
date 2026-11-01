# AGENTS.md

## What this repo is

A personal learning/coursework archive, **not a real monorepo**: no root `package.json`, no workspaces, no CI, no root lint/test/format tooling. Each `Milestone N .../module-NN-.../` folder is an independent, self-contained project with its own `package.json`, `node_modules`, and `.gitignore`.

- Always `cd` into the specific project before running anything — there are no root-level commands.
- Folder names contain spaces; quote paths in shell commands (shell is PowerShell on Windows).
- `node_modules` is not tracked; there is no root `.gitignore`, only per-project ones.
- The root `README.md` is a long per-module content summary — useful for locating a module, not for build commands.

## Project types by milestone

- **Milestones 1–4**: bare HTML/CSS/JS/TS files, run directly with `node file.js`. TS modules compile with `tsc`; committed `dist/` output is normal here, not a build artifact to clean up.
- **Milestone 5**: React + Vite + TS apps.
- **Milestones 6–7**: Next.js App Router projects (some JS, some TS).
- **Milestone 8**: Express + MongoDB APIs (`*-server`) paired with Next.js frontends (`*-client`) as sibling folders.

## Existing AGENTS.md files are machine-generated — do not edit

Every `AGENTS.md` inside a project folder contains only the auto-generated `<!-- BEGIN:nextjs-agent-rules -->` block, written and re-added by `next dev` (source: `node_modules/next/dist/server/lib/generate-agent-files.js`). Deleting or "cleaning up" the block only recreates an uncommitted diff. Leave those files alone; this root file is the hand-written one.

The block's core instruction stands: Next.js 16 here has breaking changes vs. common training data — read `node_modules/next/dist/docs/` inside the relevant project before writing Next.js code.

## Milestone 8 server convention (Express + MongoDB)

Verified in `module-44/simple-crud-server` and reused by later modules:

- ESM (`"type": "module"`), entry point `index.js`, run with `node index.js` (no start script).
- Deps: `express@5`, `mongodb` (native driver, **not** mongoose), `cors`, `dotenv`.
- `.env` holds the MongoDB connection string and is committed in some modules — don't assume it's gitignored.

## Current project: wanderlust (module-46)

`Milestone 8 - .../module-46-project-setup-and-destination-crud/wanderlust/` contains only `wanderlust-client` (plus `b14-wanderlust-resources/` design assets). No server yet.

Client stack and quirks (`wanderlust-client/`):

- Next.js 16.4.3 + React 19.3 + TypeScript. Scripts: `npm run dev`, `build`, `start`, `lint` (eslint). **No test framework or test script exists anywhere in this repo** — don't invent test commands.
- `next.config.ts`: `cacheComponents: true`, `partialPrefetching: true`, `reactCompiler: true`, and Tailwind wired via a `@tailwindcss/turbopack` loader rule.
- Tailwind **v4, CSS-first**: config lives in `src/app/globals.css` (`@import "tailwindcss"`, `@theme inline`); there is no `tailwind.config.*` to edit.
- shadcn/ui was initialized with the **`base-nova` style built on `@base-ui/react`, not Radix** (`components.json` → `style: "base-nova"`). Generated `src/components/ui/*` primitives import from `@base-ui/react/*` — don't swap them for Radix equivalents.
- `cn` comes from the `cn` npm package, re-exported by `src/lib/utils.ts` — not the usual hand-rolled `clsx` + `tailwind-merge` helper.
