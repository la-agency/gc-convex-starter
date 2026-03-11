# Starter

Everything you need to ship something. Built with [Convex](https://convex.dev) (backend, database, auth), [Next.js](https://nextjs.org) (frontend), and [Resend](https://resend.com) (transactional email).

Auth, email, and a dashboard shell are already wired up — just describe what you want to your AI assistant and start building.

## Prerequisites

- [Node.js](https://nodejs.org) (v18+)
- [pnpm](https://pnpm.io)
- A [Convex](https://convex.dev) account (free)
- A [Resend](https://resend.com) account (free)

## Setup

1. **Clone and install**

   ```bash
   git clone <your-repo-url>
   cd <your-repo>
   pnpm install
   ```

2. **Set up Convex**

   ```bash
   npx convex dev --once
   ```

   This creates your Convex project and generates `.env.local` with `CONVEX_DEPLOYMENT`, `NEXT_PUBLIC_CONVEX_URL`, and `NEXT_PUBLIC_CONVEX_SITE_URL`.

3. **Set Convex server environment variables**

   ```bash
   npx convex env set AUTH_RESEND_KEY <your-resend-api-key>
   npx convex env set FROM_EMAIL "YourApp <hello@yourdomain.com>"
   ```

4. **Run**

   ```bash
   pnpm dev
   ```

   This starts both the Next.js dev server and Convex dev server together.

5. **Open** [http://localhost:3000](http://localhost:3000) and sign up.

## What's included

- Email/password auth (sign up, sign in, password reset)
- Protected dashboard with sidebar navigation
- Resend integration for password reset emails
- Environment variable validation (t3-env)
- Tailwind CSS v4 + shadcn/ui components

## Next steps

Once running, visit the **About** page in the dashboard sidebar for ready-to-use prompts that add common features like workspaces and team members.
