"use client";

import { useState } from "react";
import { useAuth } from "@vibelogin/nextjs/client";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignupPage() {
  const { signUp } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await signUp({ email, password, name });
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message ?? "Sign up failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "1rem" }}>
          <label htmlFor="name" style={{ display: "block", marginBottom: 4 }}>Name</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ width: "100%", padding: 8, boxSizing: "border-box" }}
          />
        </div>
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
            minLength={8}
            style={{ width: "100%", padding: 8, boxSizing: "border-box" }}
          />
        </div>
        {error && <p role="alert" style={{ color: "red" }}>{error}</p>}
        <button type="submit" disabled={loading} style={{ padding: "8px 16px" }}>
          {loading ? "Creating account..." : "Sign Up"}
        </button>
      </form>
      <p style={{ marginTop: "1rem" }}>
        Already have an account? <Link href="/login">Sign in</Link>
      </p>
    </main>
  );
}
