"use client";
import Link from "next/link";
import { useState } from "react";

export default function LoginClient() {
  const [showPwd, setShowPwd] = useState(false);
  const [status, setStatus] = useState({ loading: false, msg: "" });

  async function onSubmit(e) {
    e.preventDefault();
    setStatus({ loading: true, msg: "" });
    // simulate API call
    await new Promise((r) => setTimeout(r, 900));
    setStatus({ loading: false, msg: "Signed in (demo)." });
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <section className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid items-stretch gap-8 lg:grid-cols-2">
          {/* Left: Brand panel */}
          <div className="order-2 rounded-2xl bg-gradient-to-br from-indigo-600 to-blue-600 p-8 text-white shadow-sm ring-1 ring-white/10 lg:order-1">
            <h1 className="font-heading text-3xl font-semibold">Welcome back</h1>
            <p className="mt-2 max-w-md text-white/90">
              Manage bookings, sync your calendars, and keep no-shows low.
            </p>
            <ul className="mt-6 space-y-3 text-sm text-white/90">
              <li className="flex items-start gap-2">
                <span className="mt-1 inline-grid h-5 w-5 place-items-center rounded-full bg-white/20">✓</span>
                Real-time Google & Outlook sync
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 inline-grid h-5 w-5 place-items-center rounded-full bg-white/20">✓</span>
                Automatic reminders to reduce no-shows
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 inline-grid h-5 w-5 place-items-center rounded-full bg-white/20">✓</span>
                Beautiful dashboards and reports
              </li>
            </ul>
          </div>

          {/* Right: Sign in card */}
          <div className="order-1 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100 lg:order-2">
            <h2 className="font-heading text-xl font-semibold text-gray-900">Sign in to BookNest</h2>
            <p className="mt-1 text-sm text-gray-600">
              Or{" "}
              <Link href="/register" className="text-indigo-600 hover:underline">
                create an account
              </Link>
            </p>

            <div className="mt-6 grid grid-cols-1 gap-3">
              <button
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm text-gray-800 hover:bg-gray-50"
                type="button"
              >
                {/* Google */}
                <svg viewBox="0 0 24 24" className="h-5 w-5"><path fill="#EA4335" d="M12 10.2v3.7h5.3c-.2 1.3-1.6 3.8-5.3 3.8a6.2 6.2 0 110-12.4c1.8 0 3 0.7 3.7 1.3l2.6-2.5C16.9 2.6 14.7 1.8 12 1.8 6.9 1.8 2.8 5.9 2.8 11S6.9 20.2 12 20.2c7 0 9.7-4.9 9.7-7.4 0-.5 0-.9-.1-1.3H12z"/></svg>
                Continue with Google
              </button>
              <button
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm text-gray-800 hover:bg-gray-50"
                type="button"
              >
                {/* GitHub */}
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor"><path d="M12 .5A11.5 11.5 0 0 0 .5 12 11.5 11.5 0 0 0 8 23.1c.6.1.8-.3.8-.6v-2.2c-3.3.7-4-1.6-4-1.6-.5-1.3-1.2-1.6-1.2-1.6-1-.7.1-.7.1-.7 1 .1 1.6 1 1.6 1 .9 1.6 2.5 1.1 3.1.8.1-.7.4-1.1.7-1.3-2.7-.3-5.6-1.3-5.6-6 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.6.1-3.3 0 0 1-.3 3.3 1.2a11.4 11.4 0 0 1 6 0C16.3 4.1 17.3 4.3 17.3 4.3c.6 1.7.2 3 .1 3.3.8.8 1.2 1.9 1.2 3.2 0 4.7-2.9 5.6-5.6 5.9.5.4.8 1.1.8 2.3v3.4c0 .3.2.7.8.6A11.5 11.5 0 0 0 23.5 12 11.5 11.5 0 0 0 12 .5z"/></svg>
                Continue with GitHub
              </button>
            </div>

            <div className="my-6 flex items-center gap-3">
              <div className="h-px flex-1 bg-gray-200" />
              <span className="text-xs text-gray-500">or</span>
              <div className="h-px flex-1 bg-gray-200" />
            </div>

            <form onSubmit={onSubmit} className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">Email</label>
                <input
                  name="email"
                  type="email"
                  required
                  placeholder="you@example.com"
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-[15px] text-gray-900 outline-none ring-indigo-500 focus:ring-2"
                />
              </div>
              <div className="relative">
                <label className="mb-1 block text-sm font-medium text-gray-700">Password</label>
                <input
                  name="password"
                  type={showPwd ? "text" : "password"}
                  required
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 pr-10 text-[15px] text-gray-900 outline-none ring-indigo-500 focus:ring-2"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPwd((s) => !s)}
                  className="absolute right-2 top-8 rounded-md p-1 text-gray-500 hover:bg-gray-100"
                  aria-label="Toggle password visibility"
                >
                  {showPwd ? "🙈" : "👁️"}
                </button>
              </div>

              <div className="flex items-center justify-between">
                <label className="inline-flex items-center gap-2 text-sm text-gray-700">
                  <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                  Remember me
                </label>
                <Link href="/reset" className="text-sm text-indigo-600 hover:underline">Forgot password?</Link>
              </div>

              <button
                type="submit"
                disabled={status.loading}
                className="inline-flex w-full items-center justify-center rounded-lg bg-indigo-600 px-4 py-2.5 font-medium text-white transition hover:bg-indigo-700 disabled:opacity-60"
              >
                {status.loading ? "Signing in..." : "Sign in"}
              </button>
              {status.msg && <p className="text-sm text-green-600">{status.msg}</p>}
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
