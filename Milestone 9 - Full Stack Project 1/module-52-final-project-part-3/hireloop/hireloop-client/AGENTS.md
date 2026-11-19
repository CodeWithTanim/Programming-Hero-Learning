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

- **Framework**: Next.js `16.4.6` (App Router), React `19.3.1`, TypeScript `^5` (`strict: true`, `@/*` -> `./*` in `tsconfig.json`)
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
  - `(auth)/sign-in/page.tsx` — Client Sign In form page (`/sign-in`) with Better Auth `authClient.signIn.email` in `handleSignIn`, dynamic `callbackUrl` redirect support via `useSearchParams()` wrapped in `Suspense`, loading spinner state, error display, and redirect to `/` or target callback URL
  - `(auth)/sign-up/page.tsx` — Client Sign Up form page (`/sign-up`) with role selection (`seeker`, `recruiter`, `admin`), Better Auth `authClient.signUp.email` in `handleSignUp`, loading spinner state, error display, and redirect to `/`
  - `browse-jobs/` — Public job search, browsing, and details views matching Figma specifications:
    - `page.tsx` — Server component fetching dynamic listings and total counts from MongoDB database with full query parameter support (`jobType`, `isRemote`, `category`, `search`, `sort`)
    - `BrowseJobsView.tsx` — Interactive client component replicating Figma UI (`media_1795093299598_94fdbdbc.png`), featuring top search bar, custom sidebar filter with dynamic database counts, "Found X Professional Jobs" header, "Sort by" selector, horizontal job list cards with salary/workmode badges, bookmarking, pagination, and fully clickable card links navigating to `/browse-jobs/[id]`
    - `[id]/` — Dynamic job details page matching Figma specification (`media_1795093986652_d6e1ec09.png`):
      - `page.tsx` — Server component fetching real job listing data by ObjectId from MongoDB database via `getJobById(id)`, dynamic SEO metadata generation, and `notFound()` handling for invalid or missing IDs
      - `JobDetailsClient.tsx` — High-fidelity client component featuring top logo/title/verified employer/bookmark/apply header, strict role-based application protection (only users with the `seeker` role can submit applications; non-seekers such as recruiters and admins are blocked with `403 Forbidden` and informative client toast feedback, and see a "Seekers Only" button state), seamless return-and-apply authentication flow (unauthenticated users clicking "Apply Now" are redirected to `/sign-in` with `callbackUrl` pointing back to `/browse-jobs/[id]?applied=ready`; on successful authentication as a seeker, they return immediately to the job details page and the application is submitted seamlessly), 4-column Bento metrics grid (`SALARY RANGE`, `LOCATION`, `JOB TYPE`, `EXPERIENCE`), 2-column content layout with `Job Description`, bulleted `Responsibilities`, `Requirements` with interactive skill tag pills, 2x2 `Benefits` grid with icons, and right-hand `Company Overview` card with office image (`/images/company-office.png`), company size, industry, and "Visit Website" link (`target="_blank"` with `rel="noopener noreferrer"`) opening the company's website in a new tab
  - `dashboard/` — Dashboard layouts and views:
    - `page.tsx` — Server component root dashboard redirect handler checking Better Auth session via `headers()`; routes seekers to `/dashboard/seeker`, recruiters to `/dashboard/recruiter`, and admins to `/dashboard/admin`, redirecting unauthenticated users to `/sign-in`
    - `layout.tsx` — Client dashboard layout with `SidebarProvider`, `DashboardSidebar`, full-screen `<Spinner />` during session loading, and client-side route authorization guard
    - `seeker/` — Seeker dashboard:
      - `layout.tsx` — Server layout enforcing seeker role (redirects non-seekers to their authorized role dashboard or unauthenticated users to `/sign-in`)
      - `page.tsx` — Seeker dashboard overview page powered 100% by live database and account data with ZERO demo data: top search bar routing to `/browse-jobs`, 4 Bento stat cards reflecting actual live metrics (`Saved Jobs` from synced bookmarks, `Applications Submitted` from MongoDB `applications`, `Interviews Scheduled`, and `Offers Received`), and authentic `Recent Activity` feed using the exact circular Figma icons (`rounded-full bg-[#222228]` with status loop arrows, green megaphone, and mail envelope) displaying exclusively the user's real submitted applications with live dates. Strictly adheres to Figma layout without extra floating action buttons.
      - `applications/page.tsx` — Seeker "My Applications" tracking page pixel-matching Figma specifications (`media_1795106973969_dfa1503c.png`): Top bar with search input, notifications bell, recruiter mail icon, and user avatar; page header with `Active` / `Archived` segmented toggle and `Export PDF` action; 4 Bento stat cards (`Total Applied`, `Shortlisted`, `Interviews` with amber accent, and `Success Rate` with emerald accent); data table with custom role icons (`<>` for engineering, compass for design, database for data, cloud for network/rejected, bot for AI), company name, relative applied timestamps (`2 hours ago`, `1 day ago`), status pill badges (`Applied`, `Review`, `Shortlisted`, `Interview`, `Offered`, `Rejected`), and interactive `Details` button opening a modal with hiring timeline steps (`Application Submitted`, `Resume Review`, `Interview & Decision`), candidate info, and direct link to job posting; plus pagination controls (`Showing 1-X of Y`, `< 1 2 3 >`)
      - `saved/page.tsx` — Seeker "Saved Jobs" page pixel-matching Figma specifications (`media_1795106844066_ee48561f.png`): Top bar with search input, notifications bell (alerts when saved jobs are closing), and interactive "+ Upload Resume" action (saves to profile for 1-click apply); 2 Bento stat cards (`Total Saved` and `Closing Soon` based on deadline); dynamic category filter pills (`All Saved`, `Design`, `Engineering`, `Product`, etc., calculated from real saved listings); `Sort by:` dropdown (`Recently Saved`, `Closing Soonest`, `Highest Salary`, `Title (A-Z)`); list cards with matching company SVG brand logos (Cube for TechFlow, Triangle for Vercel, Bloom for Linear, Infinity for Meta, Leaf for Spotify), location/salary pills, saved relative timestamps, closing status badges (`Closes in X days`, `Closed yesterday`), instant bookmark toggle to unsave, responsive status buttons (`Apply Now`, `Applied`, `Remove from List`), and `Load More ⌵` pagination
    - `recruiter/` — Recruiter dashboard:
      - `layout.tsx` — Server layout enforcing recruiter role (redirects non-recruiters to their authorized role dashboard or unauthenticated users to `/sign-in`)
      - `page.tsx` — Recruiter dashboard overview page
      - `jobs/` — Job management pages:
        - `page.tsx` — Recruiter "Manage Job Posts" page following Figma specifications with plan usage indicator, search and status/type filters, and real database data table with columns (`JOB TITLE & DEPT`, `COMPANY & LOCATION`, `TYPE`, `COMPENSATION`, `APPLICANTS`, `STATUS`, `DEADLINE`, `ACTIONS`) showing exclusively listings created by the logged-in recruiter (`postedBy === session.user.email`), quick status toggle (`Active` / `Closed`), edit dialog, and delete confirmation dialog with backend API integration (`GET`, `PATCH`, `DELETE /jobs`)
        - `new/page.tsx` — Recruiter "Create Job Post" page following Figma specifications (60% Form + 40% Live Preview layout), built with shadcn/ui primitives (`Card`, `Input`, `Label`, `NativeSelect`, `Switch`, `Textarea`, `Button`, `Badge`), clean single-state data collection, automatic form clearing, instant redirection to `/dashboard/recruiter/jobs` on successful submission, toast notification, active post quota checking, and integration with `http://localhost:5000/jobs`
        - `edit/[id]/page.tsx` — Recruiter "Update Job Post" page matching Figma specifications with pre-filled database job data, real-time 40% Live Preview, and backend `PATCH /jobs/:id` update integration
    - `admin/` — Admin dashboard:
      - `layout.tsx` — Server layout enforcing admin role (redirects non-admins to their authorized role dashboard or unauthenticated users to `/sign-in`)
      - `page.tsx` — Admin dashboard overview page
  - `components/`
    - `DashboardPageHeader.tsx` — Reusable dashboard page header with support for breadcrumbs, back navigation button, page title, subtitle description, and customizable actions slot
    - `DashboardSidebar.tsx` — Dashboard sidebar navigation with typed `menuItemsByRole` (`seeker`, `recruiter`, `admin`) matching Figma specifications, active route detection, and role fallback
    - `DashboardStatCard.tsx` — Reusable metric card with loading spinner support, customizable highlight text colors, icons, and description styling
    - `DeleteJobDialog.tsx` — Reusable delete confirmation modal dialog component handling job deletion (`DELETE /jobs/:id`), loading spinner state, error display, toast notifications (`toast.success`/`toast.error`), Next.js route refresh (`router.refresh()`), and optimistic UI updates via callbacks (`onDeleted`) for Manage Jobs and Edit Job views
    - `JobForm.tsx` — Reusable 3-section job creation/update form (`Basic Information`, `Compensation & Salary Range`, `Responsibilities & Requirements`) with switch controls, typed constants, and unified submission handlers
    - `JobPreviewCard.tsx` — Reusable sticky live job preview card matching Figma candidate card specifications, dynamically rendering reactive form data with formatted salary ranges, badges, and company details
    - `JobStatusBadge.tsx` — Reusable status badge component providing consistent theme colors and borders for `Active`, `Closed`, `Expired`, and `Draft` jobs
    - `JobTableRow.tsx` — Reusable table row component for recruiter job listings table featuring compensation formatting, relative timestamps, status badge, and action buttons
  - `api/auth/[...all]/route.ts` — Better Auth Next.js API route handler (`GET`, `POST`)
  - `assets/` — Static brand/marketing PNGs (`images/logo.png`, `images/globe.png`, `images/cta-bg.png`) and company logos (`logos/*.png`)
  - `layout.tsx` — `RootLayout` loads `Geist` (`--font-sans`) and `Geist_Mono` (`--font-mono`), wraps `{children}` in `ThemeProvider`, and renders `Navbar` and `<Toaster />`
  - `not-found.tsx` — Custom responsive 404 error page aligned with HireLoop's cosmic dark theme (`#010103`), featuring glowing indigo ambient lighting, globe background, interactive job search bar, quick navigation buttons, and destination cards
  - `page.tsx` — Homepage rendering `<main><Hero /></main>`
  - `globals.css` — Tailwind v4 + `tw-animate-css` + `shadcn/tailwind.css` imports, `@custom-variant dark`, `@theme inline` mappings, and `:root`/`.dark` `oklch` tokens
  - `favicon.ico` — App icon
- `components/`
  - `auth-shell.tsx` — Shared dark `AuthShell` (with `app/assets/images/logo.png`, centered title/subtitle, card layout with bottom switch link between `/sign-in` and `/sign-up`), `AuthTextField` & `PasswordField` (with `disabled` support), and `AuthSubmitButton` (supporting `disabled`, loading states, and passthrough Button props)
  - `hero.tsx` — Full-width responsive homepage `Hero` section (`w-full` container) featuring the announcement pill, headline/subtitle, job search bar (`Input`, `Separator`, `Button` routing to `/browse-jobs`), trending role `Badge` links, `app/assets/images/globe.png` backdrop, and 4 platform stat `Card`s
  - `navbar.tsx` — Responsive floating `Navbar` (`max-w-[1800px]`) using shadcn `NavigationMenu`, `Separator`, `Sheet`, `Button`, and `app/assets/images/logo.png` (hidden on `/dashboard*` routes; dynamically displays role-specific `Dashboard` navigation link when authenticated and hides it when logged out; navigation links to `/browse-jobs`, `/company`, `/pricing`; user session welcome link/sign-out or `Sign In` / `Get Started` linking to `/sign-up`)
  - `sign-out-button.tsx` — Reusable interactive `SignOutButton` calling `authClient.signOut()`, handling loading spinners, and redirecting via `router.replace("/sign-in")`
  - `theme-provider.tsx` — `ThemeProvider` (`next-themes`, `defaultTheme="dark"`) and `ThemeHotkey` (press `d` outside `INPUT`/`TEXTAREA`/`SELECT`/`contentEditable` to toggle light/dark)
  - `ui/` — Installed shadcn/ui (`base-nova`) primitives (including `button.tsx`, `navigation-menu.tsx`, `separator.tsx`, `sheet.tsx`, and the rest of the UI library)
- `hooks/`
  - `use-mobile.ts` — `useIsMobile` (`768px` breakpoint media query hook)
  - `use-highlighted-code.ts` — `useHighlightedCode` streaming syntax-highlighting hook
- `types/`
  - `auth.ts` — Authentication and user role types (`UserRole`, `Role`, `DashboardRole`, `USER_ROLES`, `AuthSessionUser`)
  - `dashboard.ts` — Dashboard navigation and layout types (`DashboardMenuItem`, `BreadcrumbItem`, `DashboardStatItem`)
  - `job.ts` — TypeScript types (`JobListing`, `JobFormData`, `JobStatus`, `JobCategory`, `JobType`, `SalaryPeriod`) and shared constants (`JOB_CATEGORIES`, `JOB_TYPES`, `SALARY_PERIODS`) plus initial state factory
  - `application.ts` — Application types (`JobApplication`, `CreateApplicationPayload`, `ApplicationStatus`)
  - `index.ts` — Centralized barrel re-exporting all types from `auth`, `dashboard`, `job`, and `application`
- `lib/`
  - `api/jobs.ts` — Typed HTTP client for job endpoints (`getJobs` with dual support for recruiter email and query string filtering with `cache: "no-store"`, `getJobById`, `getJobsByIds`, `createJob`, `updateJob`, `deleteJob`) using `NEXT_PUBLIC_API_URL`
  - `api/applications.ts` — Typed HTTP client for application endpoints (`applyForJob`, `getUserApplications`, `checkHasApplied`) connected to MongoDB backend `applications` collection
  - `auth.ts` — Better Auth server configuration (`hireloop-db` MongoDB adapter, email/password, `user.additionalFields.role` enum `["seeker", "recruiter", "admin"]`, Google OAuth)
  - `auth-client.ts` — Better Auth React client (`authClient`) with `inferAdditionalFields<typeof auth>()` plugin plugin integration
  - `highlighter.tsx` — Shiki syntax highlighter helper
  - `utils.ts` — Re-exports `cn` from `"cn"`
- `public/`
  - `hireloop.fig` — Primary Figma design file for HireLoop platform
- Configs: `components.json`, `next.config.ts` (redirects `/get-started` -> `/sign-up`, `/jobs` -> `/browse-jobs`), `tsconfig.json`, `eslint.config.mjs`, `postcss.config.mjs`, `.prettierrc`, `.prettierignore`, `CLAUDE.md` (`@AGENTS.md`)

---

## Coding Conventions

- Follow **Prettier** rules in `.prettierrc` (double quotes, no semicolons, LF line endings, Tailwind class sorting).
- Use `@/*` path aliases for internal imports (e.g., `@/components/ui/button`, `@/lib/utils`, `@/types`).
- All shared types must be maintained in `types/` (`auth.ts`, `dashboard.ts`, `job.ts`) and exported via `types/index.ts`.
- UI components in `components/ui/` use **Base UI** (`@base-ui/react`, `base-nova` shadcn style) rather than Radix UI—use `render` (not `asChild`) for trigger composition, and style `next/link` / `<a>` directly rather than rendering links through `@base-ui/react/button`.
- Public job browsing views (`/browse-jobs`) use real database records via `getJobs(undefined, query)` and replicate Figma horizontal list cards with salary pills, type pills, and bookmarking.
- With Next.js 16 `next/image`, prefer `loading="eager"` or `preload` instead of the deprecated `priority` prop.
- Keep `AGENTS.md` synchronized with any structural, dependency, or architectural changes at the end of every coding turn.
