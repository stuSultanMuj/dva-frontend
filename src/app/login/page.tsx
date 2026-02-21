"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Mountain } from "lucide-react";

export default function LoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        router.push("/");
        router.refresh();
      } else {
        setError("Falsches Passwort");
      }
    } catch {
      setError("Verbindungsfehler");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="flex min-h-dvh items-center justify-center relative"
      style={{ background: "#F9F8F6" }}
    >
      {/* Ambient background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 80% 60% at 50% 40%, rgba(13,148,136,0.08) 0%, transparent 60%),
            radial-gradient(ellipse 60% 80% at 80% 60%, rgba(14,165,233,0.05) 0%, transparent 60%),
            transparent
          `,
        }}
      />

      <div className="dva-fade-in w-full max-w-sm px-4 relative z-10">
        {/* Branding */}
        <div className="mb-8 text-center">
          <div
            className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl"
            style={{
              background: "linear-gradient(135deg, rgba(13,148,136,0.12), rgba(13,148,136,0.04))",
              border: "1px solid rgba(13,148,136,0.15)",
              boxShadow: "0 8px 32px rgba(13,148,136,0.1)",
            }}
          >
            <Mountain className="h-7 w-7 text-[#0D9488]" />
          </div>
          <h1 className="text-lg font-semibold" style={{ color: "#1A1A2E" }}>
            Digital Visibility Agent
          </h1>
          <p className="mt-1 text-sm" style={{ color: "#8C8C9A" }}>
            Marketing-Berater für digitale Sichtbarkeit
          </p>
        </div>

        {/* Login card */}
        <form
          onSubmit={handleSubmit}
          className="rounded-2xl p-6"
          style={{
            background: "#FFFFFF",
            border: "1px solid #E8E6E1",
            boxShadow: "0 8px 32px -8px rgba(0,0,0,0.08)",
          }}
        >
          <label
            className="mb-2 block text-sm font-medium"
            style={{ color: "#4B5563" }}
          >
            Passwort
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Passwort eingeben"
            className="mb-4 w-full rounded-xl px-4 py-2.5 text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#0D9488]/20 focus:border-[#0D9488]/50"
            style={{
              background: "#F9F8F6",
              border: "1px solid #E8E6E1",
              color: "#1A1A2E",
            }}
            autoFocus
            required
          />
          {error && (
            <p className="mb-4 flex items-center gap-1.5 text-sm text-red-500">
              <svg
                className="h-4 w-4 shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
                />
              </svg>
              {error}
            </p>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl px-4 py-2.5 text-sm font-medium text-white transition-all duration-200 active:scale-[0.98] disabled:opacity-50"
            style={{
              background: "linear-gradient(135deg, #0D9488 0%, #0F766E 100%)",
              boxShadow: "0 4px 14px rgba(13, 148, 136, 0.3)",
            }}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg
                  className="h-4 w-4 animate-spin"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Wird geprüft...
              </span>
            ) : (
              "Anmelden"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
