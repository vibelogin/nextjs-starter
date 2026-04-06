# CLAUDE.md — VibeLogin Next.js Starter

This project uses **VibeLogin** (`@vibelogin/nextjs`) for authentication. Do not build custom auth — the SDK handles everything.

## Quick Reference

- **SDK:** `@vibelogin/nextjs` (npm)
- **Docs:** https://vibelogin.com/docs
- **Console:** https://app.vibelogin.com

## Architecture

- `src/middleware.ts` — Route protection via `hostedAuthMiddleware()`. JWT verified on every request.
- `src/app/api/auth/[...all]/route.ts` — Auth API proxy via `createHostedHandler()`.
- `src/app/layout.tsx` — `VibeAuthProvider` wraps the app for client hooks.

## Common Tasks

**Make a route public:** Add the path to `publicRoutes` in `src/middleware.ts`.

**Read session (server):**
```ts
import { createHostedServerHelpers } from "@vibelogin/nextjs/server";
const { getSession } = createHostedServerHelpers({ projectId: process.env.VIBELOGIN_PROJECT_ID! });
const session = await getSession();
```

**Read user (client):**
```ts
import { useUser } from "@vibelogin/nextjs/client";
const user = useUser();
```

**Sign in/up/out (client):**
```ts
import { useAuth } from "@vibelogin/nextjs/client";
const { signIn, signUp, signOut } = useAuth();
```

## Environment Variables

Required in `.env.local`:
```
VIBELOGIN_PROJECT_ID=...
VIBELOGIN_SECRET_KEY=sk_live_...
NEXT_PUBLIC_VIBELOGIN_PUBLISHABLE_KEY=pk_live_...
```

## Rules

- Never build custom password hashing, JWT signing, or session management.
- Never expose `VIBELOGIN_SECRET_KEY` to the client.
- Never import from `@vibelogin/nextjs/server` in client components.
