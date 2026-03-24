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
   git clone https://github.com/groupchatai/gc-convex-starter.git my-project
   cd my-project
   pnpm install
  ```
   Replace `my-project` with whatever you want to name your project. Git creates the folder and clones into it.
2. **Set up Convex**
  ```bash
   npx convex dev --once
  ```
   This creates your Convex project and generates `.env.local` with `CONVEX_DEPLOYMENT`, `NEXT_PUBLIC_CONVEX_URL`, and `NEXT_PUBLIC_CONVEX_SITE_URL`.

   > **Important:** When prompted, choose to **create a new Convex account** (or sign in to an existing one). Do **not** select the option to continue without an account — you'll need a linked account later to generate deploy keys and set up preview branches.
3. **Set up auth**
  ```bash
   npx @convex-dev/auth
  ```
   Auth configuration needs to be initialized for each Convex deployment. This uses the `CONVEX_DEPLOYMENT` from `.env.local` created in the previous step. It will prompt for a `SITE_URL` — `http://localhost:3000` is fine, just accept it.
4. **Run**
  ```bash
   pnpm dev
  ```
   This starts both the Next.js dev server and Convex dev server together.
5. **Open** [http://localhost:3000](http://localhost:3000) and sign up.

Sign up and sign in work out of the box. Password reset requires email — see below.

## Deploy to Vercel

The `build` script already includes `npx convex deploy`, so Vercel just needs the right environment variables.

1. **Push your repo to GitHub.**

2. **Generate deploy keys** — in the [Convex dashboard](https://dashboard.convex.dev), open your project. The dashboard opens to the development deployment by default — you need the **project** settings instead. Click the **"Development (Cloud)..."** link at the top of the screen, then click **"Project Settings"**.
   - **Preview deploy key** — under *Preview Deploy Keys*, generate a key and name it **Vercel**.
   - **Production deploy key** — under *Production Deploy Keys*, click **"Deployment Settings"**, then click **"Generate Production Deploy Key"**. Name it **Vercel**.

3. **Get your production URLs** — while on the production deployment settings page (from step 2), copy both URLs shown at the top:
   - **Convex URL** — looks like `some-url.convex.cloud` (ends in `.cloud`)
   - **Site URL** — looks like `some-url.convex.site` (ends in `.site`)

4. **Initialize auth for production**
   ```bash
   npx @convex-dev/auth --prod
   ```
   It will prompt for a `SITE_URL` — enter your Vercel URL (e.g. `https://your-app.vercel.app`). If you don't know it yet, enter `vercel.app` as a placeholder and update it later in the Convex dashboard.

5. **Generate and set auth keys** — these keys secure the auth for the app.
   ```bash
   npx tsx generate-keys.ts
   ```
   Copy the entire output, then go to **Project Settings** > **Environment Variables** in the Convex dashboard. Under *Default Environment Variables*, paste the whole block into the first input field — it will automatically parse both `JWT_PRIVATE_KEY` and `JWKS`.

6. **Create a new project at [vercel.com/new](https://vercel.com/new)**, linking it to your GitHub repo. On the new project form, add these environment variables:

   | Variable | Value |
   |---|---|
   | `CONVEX_DEPLOY_KEY` | Production deploy key from step 2 |
   | `NEXT_PUBLIC_CONVEX_URL` | Your `.convex.cloud` URL from step 3 |
   | `NEXT_PUBLIC_CONVEX_SITE_URL` | Your `.convex.site` URL from step 3 |

7. **Deploy** — click Deploy. Vercel will automatically deploy both Convex and your site.

8. **Set up the preview deploy key** — after the first deploy, go to your Vercel project's Settings > Environment Variables. Uncheck *Preview* and *Development* on the existing `CONVEX_DEPLOY_KEY` so it only applies to Production. Then create a new `CONVEX_DEPLOY_KEY` entry with the preview deploy key from step 2, and set it to *Preview* only. This ensures preview branches deploy to isolated Convex preview deployments.

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

## Deploying with an AI agent

The [Deploy Guide](DEPLOY_GUIDE.md) is a step-by-step walkthrough designed for AI agents. Paste it into your assistant and it will walk you through the entire setup and deploy process, running what it can and telling you when it needs you to do something.

## Next steps

Once running, visit the **About** page in the dashboard sidebar for ready-to-use prompts that add common features like workspaces and team members.