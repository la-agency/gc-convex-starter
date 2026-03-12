# GroupChat Convex Starter

Everything you need to ship something. Built with [Convex](https://convex.dev) (backend, database, auth), [Next.js](https://nextjs.org) (frontend), and [Resend](https://resend.com) (transactional email).

Auth, email, and a dashboard shell are already wired up — just describe what you want to your AI assistant and start building.

## Prerequisites

- [Node.js](https://nodejs.org) (v18+)
- [pnpm](https://pnpm.io)
- A [Convex](https://convex.dev) account (free)

## Setup

1. **Clone and install**

   ```bash
   git clone https://github.com/la-agency/gc-convex-starter.git my-project
   cd my-project
   pnpm install
   ```

   Replace `my-project` with whatever you want to name your project. Git creates the folder and clones into it.

2. **Set up Convex**

   ```bash
   npx convex dev --once
   ```

   This creates your Convex project and generates `.env.local` with `CONVEX_DEPLOYMENT`, `NEXT_PUBLIC_CONVEX_URL`, and `NEXT_PUBLIC_CONVEX_SITE_URL`.

3. **Run**

   ```bash
   pnpm dev
   ```

   This starts both the Next.js dev server and Convex dev server together.

4. **Open** [http://localhost:3000](http://localhost:3000) and sign up.

Sign up and sign in work out of the box. Password reset requires email — see below.

## Password reset (optional)

Password reset sends a one-time code via email using [Resend](https://resend.com). If you skip this step, everything else still works — users just won't be able to reset a forgotten password.

1. **Create a free Resend account** at [resend.com](https://resend.com).

2. **Get your API key** — after signing up, go to [resend.com/api-keys](https://resend.com/api-keys) and create a new key.

3. **Set up a sending domain** — go to [resend.com/domains](https://resend.com/domains) and add your domain (e.g. `yourdomain.com`). Resend will give you DNS records to add. Once verified, you can send from any address at that domain.

   > If you just want to test locally before setting up a domain, Resend lets you send to your own email using their default `onboarding@resend.dev` sender.

4. **Set the environment variables** in Convex:

   ```bash
   npx convex env set RESEND_API_KEY re_xxxxxxxxxx
   npx convex env set FROM_EMAIL "My App <hello@yourdomain.com>"
   ```

   `FROM_EMAIL` must use an email address at a domain you've verified in Resend. The format is `Display Name <email@yourdomain.com>`.

## What's included

- Email/password auth (sign up, sign in)
- Password reset via email (requires Resend — see above)
- Protected dashboard with sidebar navigation
- Environment variable validation (t3-env)
- Tailwind CSS v4 + shadcn/ui components

## Next steps

Once running, visit the **About** page in the dashboard sidebar for ready-to-use prompts that add common features like workspaces and team members.
