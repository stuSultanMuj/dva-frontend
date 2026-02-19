"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

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
    <div className="relative z-[1] flex min-h-dvh items-center justify-center">
      <div className="dva-fade-in w-full max-w-sm px-4">
        {/* Branding */}
        <div className="mb-8 text-center">
          <div
            className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl"
            style={{
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))",
              backdropFilter: "blur(20px) saturate(140%)",
              boxShadow:
                "inset 0 1px rgba(255,255,255,0.2), 0 0 0 1px rgba(255,255,255,0.08)",
            }}
          >
            <svg
              className="h-7 w-7 text-[#4da5fc]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path
                d="M2 12C2 12 6.5 5 12 5C17.5 5 22 12 22 12C22 12 17.5 19 12 19C6.5 19 2 12 2 12Z"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity="0.4"
              />
              <path
                d="M8 14L10.5 10.5L13.5 12.5L17 8"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="17" cy="8" r="1.5" fill="currentColor" stroke="none" />
            </svg>
          </div>
          <h1 className="text-lg font-semibold text-white">
            Digital Visibility Agent
          </h1>
          <p className="mt-1 text-sm text-[#6a6a6f]">
            Marketing-Berater für digitale Sichtbarkeit
          </p>
        </div>

        {/* Login card — frosted glass */}
        <form
          onSubmit={handleSubmit}
          className="rounded-2xl p-6 ring-1 ring-white/[0.08]"
          style={{
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))",
            backdropFilter: "blur(20px) saturate(140%)",
            boxShadow: "0 8px 32px -8px rgba(0,0,0,0.3)",
          }}
        >
          <label className="mb-2 block text-sm font-medium text-[#a0a0a5]">
            Passwort
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Passwort eingeben"
            className="mb-4 w-full rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-2.5 text-sm text-white placeholder-[#5a5a5f] transition-all duration-200 focus:border-[#1488fc]/50 focus:outline-none focus:ring-2 focus:ring-[#1488fc]/20"
            autoFocus
            required
          />
          {error && (
            <p className="mb-4 flex items-center gap-1.5 text-sm text-red-400">
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
            className="w-full rounded-xl bg-[#1488fc] px-4 py-2.5 text-sm font-medium text-white transition-all duration-200 hover:bg-[#1a94ff] active:scale-[0.98] disabled:opacity-50 shadow-[0_0_20px_rgba(20,136,252,0.3)]"
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
