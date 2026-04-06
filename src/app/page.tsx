import Link from "next/link";
import { createHostedServerHelpers } from "@vibelogin/nextjs/server";

const { getSession } = createHostedServerHelpers({
  projectId: process.env.VIBELOGIN_PROJECT_ID!,
  apiUrl: process.env.VIBELOGIN_API_URL,
});

export default async function Home() {
  // Fast JWT-only check (no network call)
  const session = await getSession();

  return (
    <main>
      <h1>VibeLogin Hosted Example</h1>
      <p>Minimal example of VibeLogin hosted mode with Next.js.</p>

      {session ? (
        <div>
          <p>Signed in (role: <strong>{session.role}</strong>)</p>
          <Link href="/dashboard">Go to Dashboard</Link>
        </div>
      ) : (
        <div>
          <p>Not signed in.</p>
          <Link href="/login">Sign In</Link>
          {" | "}
          <Link href="/signup">Sign Up</Link>
        </div>
      )}
    </main>
  );
}
