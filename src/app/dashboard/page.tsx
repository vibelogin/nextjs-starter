"use client";

import { useAuth, useUser } from "@vibelogin/nextjs/client";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const { signOut } = useAuth();
  const user = useUser();
  const router = useRouter();

  if (!user) {
    return <p>Loading...</p>;
  }

  async function handleSignOut() {
    await signOut();
    router.push("/");
  }

  return (
    <main>
      <h1>Dashboard</h1>
      <p>Welcome, <strong>{user.name ?? user.email}</strong>!</p>

      <table style={{ borderCollapse: "collapse", marginTop: "1rem" }}>
        <tbody>
          <tr><td style={{ padding: "4px 12px", fontWeight: "bold" }}>ID</td><td>{user.id}</td></tr>
          <tr><td style={{ padding: "4px 12px", fontWeight: "bold" }}>Email</td><td>{user.email}</td></tr>
          <tr><td style={{ padding: "4px 12px", fontWeight: "bold" }}>Verified</td><td>{user.emailVerified ? "Yes" : "No"}</td></tr>
          <tr><td style={{ padding: "4px 12px", fontWeight: "bold" }}>Role</td><td>{user.role}</td></tr>
          <tr><td style={{ padding: "4px 12px", fontWeight: "bold" }}>Name</td><td>{user.name ?? "—"}</td></tr>
        </tbody>
      </table>

      <button onClick={handleSignOut} style={{ marginTop: "1rem", padding: "8px 16px" }}>
        Sign Out
      </button>
    </main>
  );
}
