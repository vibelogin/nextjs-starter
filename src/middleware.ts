import { hostedAuthMiddleware } from "@vibelogin/nextjs";

export default hostedAuthMiddleware({
  projectId: process.env.VIBELOGIN_PROJECT_ID!,
  publicRoutes: ["/", "/login", "/signup"],
  signInUrl: "/login",
});

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
