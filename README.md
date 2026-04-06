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

1. **`middleware.ts`** — Protects your routes. Every request is checked for a valid JWT access token. If the user isn't logged in, they're redirected to the sign-in page.

2. **`api/auth/route.ts`** — A single API route that proxies all auth requests (sign in, sign up, sign out, session) to the VibeLogin API. This is the only server-side setup needed.

3. **`layout.tsx`** — Wraps the app in `VibeAuthProvider` so client components can use `useAuth()` and `useUser()` hooks.

4. **`page.tsx`** — Uses `getSession()` in a Server Component to check auth state without a network call (JWT-only verification).

## Route protection

The middleware controls which routes require login and which are open to everyone.

```ts
// middleware.ts
export default hostedAuthMiddleware({
  projectId: process.env.VIBELOGIN_PROJECT_ID!,
  publicRoutes: ["/", "/login", "/signup"],
  signInUrl: "/login",
});
```

**How it works:**

- **By default, every route requires login.** If a user visits any page without a valid session, they are redirected to `signInUrl` (defaults to `/login`).
- **`publicRoutes`** — An array of paths that anyone can access without logging in. Add your public pages here (landing page, pricing, docs, etc.).
- **`signInUrl`** — Where unauthenticated users are sent. After they log in, they're redirected back to the page they originally tried to visit.

**Examples:**

```ts
// Only the home page is public — everything else requires login
publicRoutes: ["/"]

// Marketing pages + auth pages are public
publicRoutes: ["/", "/pricing", "/about", "/login", "/signup"]

// Use wildcards to make an entire section public
publicRoutes: ["/", "/blog/:path*", "/docs/:path*", "/login", "/signup"]
```

**The `matcher` config** tells Next.js which requests the middleware should run on. The default excludes static assets:

```ts
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
```

This means the middleware runs on every page and API route, but skips Next.js internal assets like images and CSS. You generally don't need to change this.

## Learn more

- [Quickstart Guide](https://vibelogin.com/docs/quickstart)
- [Redirect Mode](https://vibelogin.com/docs/redirect-mode) — Use hosted login pages instead of custom forms
- [Security Architecture](https://vibelogin.com/docs/security)
- [Full Documentation](https://vibelogin.com/docs)

## License

MIT
