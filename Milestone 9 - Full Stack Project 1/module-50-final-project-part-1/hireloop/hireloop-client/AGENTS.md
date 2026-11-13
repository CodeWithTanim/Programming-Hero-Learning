<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Standing Rule: Keep `AGENTS.md` Updated

- **Update this file every time** you make changes to the project (new or modified routes, components, hooks, utilities, API integrations, dependencies, configs, scripts, or conventions).
- Keep all entries strictly accurate to the current codebase—remove deleted items and update changed paths, symbols, or behaviors before finishing your task.
- **Do not** remove or alter the `<!-- BEGIN:nextjs-agent-rules -->` ... `<!-- END:nextjs-agent-rules -->` block above, as `next dev` manages it automatically.

---

## Project Overview (`hireloop-client`)

Frontend Next.js application for **HireLoop** (`hireloop-client`, `0.0.1`, ESM `"type": "module"`).

### Tech Stack

- **Framework**: Next.js `16.4.4` (App Router), React `19.3.1`, TypeScript `^5` (`strict: true`, `@/*` -> `./*` in `tsconfig.json`)
- **Authentication & Database**: `better-auth` (`^1.7.21`), `@better-auth/mongo-adapter` (`^1.7.21`), `mongodb` (`^7.8.0`)
- **UI & Styling**: Tailwind CSS v4 (`@tailwindcss/postcss`, `tw-animate-css`), shadcn/ui (`base-nova` style in `components.json`), `@base-ui/react`, `@shadcn/react`, `class-variance-authority`, `cn`, `lucide-react`, plus supporting component deps (`cmdk`, `date-fns`, `embla-carousel-react`, `input-otp`, `react-day-picker`, `react-resizable-panels`, `recharts`, `shiki`)
- **Theming**: `next-themes` (`class` attribute, `defaultTheme="dark"`) with `oklch` CSS variables in `app/globals.css`; Figma dark palette uses `#010103` page canvas, `#222222` frosted navbar surface, and `#5c53fe` primary brand indigo
- **Linting & Formatting**: ESLint 9 (`eslint-config-next/core-web-vitals`, `eslint-config-next/typescript`), Prettier (`prettier-plugin-tailwindcss`, no semicolons, double quotes, 2-space indent, `printWidth: 80`, `endOfLine: "lf"`)

### Scripts

Run from `hireloop-client/`:

- `npm run dev` — Start Next.js dev server
- `npm run build` — Production build
- `npm run start` — Start production server
- `npm run lint` — Run ESLint
- `npm run format` — Format `**/*.{ts,tsx}` with Prettier
- `npm run typecheck` — Run `tsc --noEmit`
- `npx shadcn@latest add <component>` — Add shadcn/ui components into `components/ui/`

---

## Current Project Structure

- `app/`
  - `(auth)/sign-in/page.tsx` — Client Sign In form page (`/sign-in`) with Better Auth `authClient.signIn.email` in `handleSignIn`, loading spinner state, error display, and redirect to `/`
  - `(auth)/sign-up/page.tsx` — Client Sign Up form page (`/sign-up`) with role selection (`seeker`, `recruiter`, `admin`), Better Auth `authClient.signUp.email` in `handleSignUp`, loading spinner state, error display, and redirect to `/`
  - `api/auth/[...all]/route.ts` — Better Auth Next.js API route handler (`GET`, `POST`)
  - `assets/` — Static brand/marketing PNGs (`images/logo.png`, `images/globe.png`, `images/cta-bg.png`) and company logos (`logos/*.png`)
  - `layout.tsx` — `RootLayout` loads `Geist` (`--font-sans`) and `Geist_Mono` (`--font-mono`), wraps `{children}` in `ThemeProvider`, and renders `Navbar`
  - `page.tsx` — Homepage rendering `<main><Hero /></main>`
  - `globals.css` — Tailwind v4 + `tw-animate-css` + `shadcn/tailwind.css` imports, `@custom-variant dark`, `@theme inline` mappings, and `:root`/`.dark` `oklch` tokens
  - `favicon.ico` — App icon
- `components/`
  - `auth-shell.tsx` — Shared dark `AuthShell` (with `app/assets/images/logo.png`, centered title/subtitle, card layout with bottom switch link between `/sign-in` and `/sign-up`), `AuthTextField` & `PasswordField` (with `disabled` support), and `AuthSubmitButton` (supporting `disabled`, loading states, and passthrough Button props)
  - `hero.tsx` — Full-width responsive homepage `Hero` section (`w-full` container) featuring the announcement pill, headline/subtitle, job search bar (`Input`, `Separator`, `Button` routing to `/jobs`), trending role `Badge` links, `app/assets/images/globe.png` backdrop, and 4 platform stat `Card`s
  - `navbar.tsx` — Responsive floating `Navbar` (`max-w-[1800px]`) using shadcn `NavigationMenu`, `Separator`, `Sheet`, `Button`, and `app/assets/images/logo.png` (`Browse Jobs`, `Company`, `Pricing`, dynamic user session welcome/sign-out or `Sign In` / `Get Started` linking to `/sign-up`)
  - `theme-provider.tsx` — `ThemeProvider` (`next-themes`, `defaultTheme="dark"`) and `ThemeHotkey` (press `d` outside `INPUT`/`TEXTAREA`/`SELECT`/`contentEditable` to toggle light/dark)
  - `ui/` — Installed shadcn/ui (`base-nova`) primitives (including `button.tsx`, `navigation-menu.tsx`, `separator.tsx`, `sheet.tsx`, and the rest of the UI library)
- `hooks/`
  - `use-mobile.ts` — `useIsMobile` (`768px` breakpoint media query hook)
  - `use-highlighted-code.ts` — `useHighlightedCode` streaming syntax-highlighting hook
- `lib/`
  - `auth.ts` — Better Auth server configuration (`hireloop-db` MongoDB adapter, email/password, `user.additionalFields.role` enum `["seeker", "recruiter", "admin"]`, Google OAuth)
  - `auth-client.ts` — Better Auth React client (`authClient`) with `inferAdditionalFields<typeof auth>()` plugin plugin integration
  - `highlighter.tsx` — Shiki syntax highlighter helper
  - `utils.ts` — Re-exports `cn` from `"cn"`
- `public/` — Placeholder (`.gitkeep`)
- Configs: `components.json`, `next.config.ts` (redirects `/get-started` -> `/sign-up`), `tsconfig.json`, `eslint.config.mjs`, `postcss.config.mjs`, `.prettierrc`, `.prettierignore`, `CLAUDE.md` (`@AGENTS.md`)

---

## Coding Conventions

- Follow **Prettier** rules in `.prettierrc` (double quotes, no semicolons, LF line endings, Tailwind class sorting).
- Use `@/*` path aliases for internal imports (e.g., `@/components/ui/button`, `@/lib/utils`).
- UI components in `components/ui/` use **Base UI** (`@base-ui/react`, `base-nova` shadcn style) rather than Radix UI—use `render` (not `asChild`) for trigger composition, and style `next/link` / `<a>` directly rather than rendering links through `@base-ui/react/button`.
- With Next.js 16 `next/image`, prefer `loading="eager"` or `preload` instead of the deprecated `priority` prop.
- Keep `AGENTS.md` synchronized with any structural, dependency, or architectural changes at the end of every coding turn.
