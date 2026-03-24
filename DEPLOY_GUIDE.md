# Deploy Guide (for AI agents)

Step-by-step guide for deploying this project. Designed to be pasted into an AI assistant — it will walk you through each step, running what it can and telling you when it needs you to do something.

## Overview

This deploys a Next.js + Convex app to Vercel with:
- Convex backend (database, auth, serverless functions)
- Vercel frontend (Next.js)
- GitHub for source control

## Prerequisites

- Node.js v18+, pnpm installed
- GitHub CLI (`gh`) installed and authenticated
- A Convex account (free at convex.dev)
- A Vercel account (free at vercel.com)

---

## Phase 1: Local setup

### Step 1 — Clone and install

```
git clone https://github.com/groupchatai/gc-convex-starter.git PROJECT_NAME
cd PROJECT_NAME
pnpm install
```

Replace `PROJECT_NAME` with the desired project/folder name.

### Step 2 — Initialize git

Remove the cloned repo's git history and start fresh:

```
rm -rf .git
git init
git branch -M main
```

### Step 3 — Set up Convex

> **INTERACTIVE — user must run this in their terminal.**

```
npx convex dev --once
```

This opens a browser to sign in to Convex, creates a project, and generates `.env.local` with:
- `CONVEX_DEPLOYMENT` — identifies the dev deployment
- `NEXT_PUBLIC_CONVEX_URL` — the `.convex.cloud` URL
- `NEXT_PUBLIC_CONVEX_SITE_URL` — the `.convex.site` URL

Tell the user: "When prompted, sign in or create a Convex account. Do NOT choose 'continue without an account' — you need an account for deploy keys later."

### Step 4 — Set up auth

> **INTERACTIVE — user must run this in their terminal.**

```
npx @convex-dev/auth
```

Tell the user: "Accept the default `http://localhost:3000` for the SITE_URL prompt."

### Step 5 — Verify locally

```
pnpm dev
```

This starts both the Next.js dev server and Convex dev server. Open http://localhost:3000 and verify sign-up works.

---

## Phase 2: Push to GitHub

### Step 6 — Create repo and push

Ask the user for their GitHub org/username and whether the repo should be public or private. Then:

```
git add .
git commit -m "Initial commit"
gh repo create ORG/PROJECT_NAME --private --source=. --push
```

If the user already has a repo, just add the remote and push:

```
git remote add origin git@github.com:ORG/PROJECT_NAME.git
git push -u origin main
```

---

## Phase 3: Production deploy

### Step 7 — Generate deploy keys

> **USER ACTION — Convex dashboard.**

The Convex dashboard opens to the development deployment by default. The deployment settings are not what we need — we need the **project** settings.

Tell the user:
1. Go to https://dashboard.convex.dev and open the project
2. Click the **"Development (Cloud)..."** link at the top of the screen, then click **"Project Settings"**
3. Under **Preview Deploy Keys**, generate a preview deploy key. Name it **Vercel**. Copy it.
4. Under **Production Deploy Keys**, click **"Deployment Settings"**. This takes you to the production deployment settings.
5. Click **"Generate Production Deploy Key"**. Name it **Vercel**. Copy it.
6. While on this page, copy both URLs shown at the top:
   - **Convex URL** — ends in `.convex.cloud`
   - **Site URL** — ends in `.convex.site`

Ask the user to confirm they have both deploy keys and both URLs.

### Step 8 — Initialize auth for production

> **INTERACTIVE — user must run this in their terminal.**

Tell the user:

```
npx @convex-dev/auth --prod
```

Tell the user: "When prompted for SITE_URL, enter `vercel.app` for now — you can update it later in the Convex dashboard once you have your actual Vercel URL."

### Step 9 — Generate and set JWT auth keys

Run this (non-interactive, agent can run it):

```
npx tsx generate-keys.ts
```

This outputs two environment variables (`JWT_PRIVATE_KEY` and `JWKS`) as a single block.

Tell the user: "Copy the entire output. Go to the Convex dashboard → your project → **Project Settings** → **Environment Variables**. Under *Default Environment Variables*, paste the whole block into the first input field — it will automatically parse both key-value pairs."

### Step 10 — Create Vercel project

> **USER ACTION — Vercel dashboard.**

Tell the user:
1. Go to https://vercel.com/new
2. Link the GitHub repo from step 6
3. Add these environment variables:

| Variable | Value |
|---|---|
| `CONVEX_DEPLOY_KEY` | Production deploy key from step 7 |
| `NEXT_PUBLIC_CONVEX_URL` | The `.convex.cloud` URL from step 7 |
| `NEXT_PUBLIC_CONVEX_SITE_URL` | The `.convex.site` URL from step 7 |

4. Click Deploy.

The build script (`npx convex deploy --cmd 'next build'`) handles deploying both Convex and the Next.js app.

### Step 11 — Set up preview deploy key

> **USER ACTION — Vercel dashboard.**

Tell the user:
1. Go to the Vercel project → **Settings** → **Environment Variables**
2. Edit the existing `CONVEX_DEPLOY_KEY` — uncheck *Preview* and *Development* so it only applies to **Production**
3. Create a new `CONVEX_DEPLOY_KEY` entry with the **preview deploy key** from step 7, set to **Preview** only

This ensures preview branches get isolated Convex preview deployments.

---

## Phase 4: Optional — Password reset via email

Only needed if the user wants password reset functionality. Everything else works without this.

### Step 12 — Set up Resend

> **USER ACTION.**

Tell the user:
1. Create a free account at https://resend.com
2. Create an API key at https://resend.com/api-keys
3. Add and verify a sending domain at https://resend.com/domains

The Resend env vars need to be set in **all Convex environments** — production, development, and default. The CLI command only sets them on the development deployment. Default environment variables cannot be set via CLI yet.

Tell the user:
1. Run these commands to set them on the development deployment:
   ```
   npx convex env set RESEND_API_KEY re_xxxxxxxxxx
   npx convex env set FROM_EMAIL "App Name <hello@yourdomain.com>"
   ```
2. Then go to the Convex dashboard → **Project Settings** → **Environment Variables**. Add `RESEND_API_KEY` and `FROM_EMAIL` under **Default Environment Variables** so they apply to all deployments (including production and preview).
