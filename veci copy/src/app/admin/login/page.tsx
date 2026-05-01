"use client";

import { FormEvent, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function AdminLoginPage() {
  const [role, setRole] = useState<"admin" | "worker">("admin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const params = useSearchParams();

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ role, email, password }),
    });
    setLoading(false);

    if (!res.ok) {
      setError("Wrong email or password.");
      return;
    }

    router.push(params.get("next") ?? "/admin");
    router.refresh();
  }

  return (
    <div className="mx-auto max-w-md px-4 py-16">
      <h1 className="font-display text-4xl text-mauve">Login</h1>
      <p className="mt-2 text-sm text-text-dark/70">Sign in as admin or worker.</p>
      <form onSubmit={onSubmit} className="mt-6 space-y-4">
        <select
          className="booking-field"
          value={role}
          onChange={(e) => setRole(e.target.value as "admin" | "worker")}
        >
          <option value="admin">Admin</option>
          <option value="worker">Worker</option>
        </select>
        <input
          type="email"
          className="booking-field"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          className="booking-field"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        {error ? <p className="text-sm text-rose">{error}</p> : null}
        <button className="booking-btn-confirm w-full" disabled={loading} type="submit">
          {loading ? "Signing in..." : "Sign in"}
        </button>
      </form>
    </div>
  );
}
