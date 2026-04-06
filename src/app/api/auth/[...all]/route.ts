/**
 * Auth route handler — proxies to VibeLogin hosted API.
 *
 * This is the only server-side setup needed. Everything else
 * is handled by the VibeAuth SDK.
 */
import { createHostedHandler } from "@vibelogin/nextjs";

const handler = createHostedHandler({
  secretKey: process.env.VIBELOGIN_SECRET_KEY!,
  publishableKey: process.env.NEXT_PUBLIC_VIBELOGIN_PUBLISHABLE_KEY!,
  apiUrl: process.env.VIBELOGIN_API_URL,
});

export const { GET, POST, PATCH, DELETE } = handler;
