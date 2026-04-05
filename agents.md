# agents.md — Primary Authority for All AI Agents

> **This file is the single source of truth for every AI agent working on this repository.**
> All agents (Cursor, Claude, Copilot, etc.) must read and follow these instructions before making any changes.

---

## Tech Stack

| Layer | Technology | Version / Notes |
|-------|-----------|-----------------|
| **Runtime** | Next.js (App Router) | 16.x |
| **UI** | React | 19.x |
| **Backend** | Convex | real-time backend, schema + HTTP router in `convex/` |
| **Auth** | @convex-dev/auth + @auth/core | password, OTP, password-reset via Resend |
| **Styling** | Tailwind CSS v4 | PostCSS plugin (`@tailwindcss/postcss`) |
| **Components** | shadcn/ui (radix-nova style) | Radix UI primitives, CVA, clsx + tailwind-merge |
| **Validation** | Zod v4 | runtime schema validation |
| **Typed Env** | @t3-oss/env-nextjs | typed environment variables |
| **Email** | Resend | transactional email |
| **Linting/Formatting** | Biome | replaces ESLint + Prettier |
| **Language** | TypeScript 5 | strict mode enabled |
| **Package Manager** | pnpm | version 10.x — **never use npm or yarn** |
| **Fonts** | Geist / Geist Mono | via `next/font/google` |

---

## Coding Standards

### TypeScript

- **Strict mode is on** — always provide explicit types, avoid `any` unless absolutely necessary
- Use **named functions** — prefer `function foo()` over `const foo = () =>`
- Use **named exports** for shared code; **default exports** only for Next.js pages/layouts (`page.tsx`, `layout.tsx`)

### Formatting (enforced by Biome)

- **Indentation:** tabs
- **Quotes:** double quotes
- **Semicolons:** omit (ASI style — no semicolons at end of statements)
- **Imports:** organize imports automatically (Biome assist)
- Run `pnpm lint` / `pnpm format` to check and fix

### React / Next.js

- **Functional components only** — no class components
- Add `"use client"` directive only on components that use client-side hooks or browser APIs
- Use the **`cn()` helper** from `@/lib/utils` for merging Tailwind classes
- Follow the **Slot / `asChild`** pattern from shadcn/ui for composable primitives
- Use **CVA (class-variance-authority)** for component variants

### Convex

- Backend functions live in `convex/` — do not import server-only Convex code from Next.js client components
- Schema is in `convex/schema.ts` — always keep it in sync when adding tables
- Never edit files under `convex/_generated/` — they are auto-generated

### General

- Keep files small and focused — one component/function per file when practical
- Path alias `@/*` maps to the project root (e.g., `@/components/ui/button`)
- No `src/` directory — code lives at the repo root

---

## Project Architecture

```
/
├── app/                    # Next.js App Router
│   ├── layout.tsx          # Root layout (fonts, providers)
│   ├── globals.css         # Global styles + Tailwind imports
│   ├── ConvexClientProvider.tsx
│   ├── page.tsx            # Landing / marketing page
│   ├── (auth)/             # Auth routes (signin, signup, reset-password)
│   └── dashboard/          # Protected dashboard shell + nested routes
├── components/
│   ├── ui/                 # shadcn/ui primitives (Button, etc.)
│   └── *.tsx               # App-level components (sign-in, user-menu)
├── hooks/                  # Client-side React hooks
├── lib/                    # Shared utilities (cn, etc.)
├── convex/                 # Convex backend
│   ├── schema.ts           # Database schema (includes authTables)
│   ├── auth.ts             # Auth provider config
│   ├── auth.config.ts      # Auth config
│   ├── http.ts             # HTTP router
│   ├── env.ts              # Server env validation
│   └── _generated/         # Auto-generated — DO NOT EDIT
├── env.ts                  # Next.js public env (t3-oss)
├── middleware.ts            # Route protection (Convex Auth)
├── biome.json              # Linter + formatter config
├── components.json          # shadcn/ui config
├── next.config.ts
├── postcss.config.mjs
├── tsconfig.json
└── package.json
```

### Key Patterns

- **Route protection:** `middleware.ts` guards `/dashboard` and redirects authenticated users away from auth pages
- **Providers:** Server-side Convex provider in `layout.tsx`, client-side in `ConvexClientProvider.tsx`
- **Data flow:** Convex queries/mutations on the client via hooks; Convex HTTP actions for webhooks and auth endpoints
- **Styling:** Tailwind utility classes composed with `cn()`, component variants via CVA
