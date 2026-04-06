# VibeLogin Next.js Starter

A minimal Next.js app with authentication powered by [VibeLogin](https://vibelogin.com). Clone this repo, add your keys, and you have login, signup, sessions, and protected routes working in under 5 minutes.

## What's included

- Email/password sign in and sign up
- Protected dashboard route
- Session reading in Server Components
- Middleware-based route protection
- Sign out

## Getting started

### 1. Create a VibeLogin project

Sign up at [app.vibelogin.com](https://app.vibelogin.com) and create a project. Copy your **Secret Key**, **Publishable Key**, and **Project ID** from the project settings.

### 2. Clone and install

```bash
git clone https://github.com/vibelogin/nextjs-starter.git
cd nextjs-starter
npm install
```

### 3. Set environment variables

```bash
cp .env.example .env.local
```

Edit `.env.local` with your keys:

```
VIBELOGIN_SECRET_KEY=sk_live_...
NEXT_PUBLIC_VIBELOGIN_PUBLISHABLE_KEY=pk_live_...
VIBELOGIN_PROJECT_ID=your-project-uuid
```

### 4. Run the app

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — sign up, sign in, and visit the protected dashboard.

## Project structure

```
src/
  app/
    layout.tsx            # Wraps app in VibeAuthProvider
    page.tsx              # Home page with session check
    login/page.tsx        # Sign in form
    signup/page.tsx       # Sign up form
    dashboard/page.tsx    # Protected page (shows user info)
    api/auth/route.ts     # Auth API proxy (single catch-all route)
  middleware.ts           # Route protection
```

> **Note:** The auth route uses a [Next.js catch-all segment](https://nextjs.org/docs/app/building-your-application/routing/dynamic-routes#catch-all-segments) (`[...all]`) so one file handles all auth endpoints — `/api/auth/signin`, `/api/auth/signup`, `/api/auth/signout`, etc.

## How it works

1. **`middleware.ts`** — Validates the JWT access token on every request. Unauthenticated users are redirected to `/login`. Public routes (`/`, `/login`, `/signup`) are excluded.

2. **`api/auth/route.ts`** — A single API route that proxies all auth requests (sign in, sign up, sign out, session) to the VibeLogin API. This is the only server-side setup needed.

3. **`layout.tsx`** — Wraps the app in `VibeAuthProvider` so client components can use `useAuth()` and `useUser()` hooks.

4. **`page.tsx`** — Uses `getSession()` in a Server Component to check auth state without a network call (JWT-only verification).

## Learn more

- [Quickstart Guide](https://vibelogin.com/docs/quickstart)
- [Redirect Mode](https://vibelogin.com/docs/redirect-mode) — Use hosted login pages instead of custom forms
- [Security Architecture](https://vibelogin.com/docs/security)
- [Full Documentation](https://vibelogin.com/docs)

## License

MIT
