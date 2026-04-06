"use client";

import { useState } from "react";
import { useAuth } from "@vibelogin/nextjs/client";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const { signIn } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await signIn(email, password);
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message ?? "Sign in failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main>
      <h1>Sign In</h1>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "1rem" }}>
          <label htmlFor="email" style={{ display: "block", marginBottom: 4 }}>Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: "100%", padding: 8, boxSizing: "border-box" }}
          />
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <label htmlFor="password" style={{ display: "block", marginBottom: 4 }}>Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: "100%", padding: 8, boxSizing: "border-box" }}
          />
        </div>
        {error && <p role="alert" style={{ color: "red" }}>{error}</p>}
        <button type="submit" disabled={loading} style={{ padding: "8px 16px" }}>
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </form>
      <p style={{ marginTop: "1rem" }}>
        No account? <Link href="/signup">Sign up</Link>
      </p>
    </main>
  );
}
