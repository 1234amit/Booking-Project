"use client";
import Link from "next/link";
import { useMemo, useState } from "react";

export default function RegisterPage() {
  const [showPwd, setShowPwd] = useState(false);
  const [showPwd2, setShowPwd2] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "", agree: false });
  const [status, setStatus] = useState({ loading: false, msg: "" });

  const pwdStrength = useMemo(() => {
    const p = form.password;
    let score = 0;
    if (p.length >= 8) score++;
    if (/[A-Z]/.test(p)) score++;
    if (/[0-9]/.test(p)) score++;
    if (/[^A-Za-z0-9]/.test(p)) score++;
    return score; // 0–4
  }, [form.password]);

  function onChange(e) {
    const { name, type, checked, value } = e.target;
    setForm((f) => ({ ...f, [name]: type === "checkbox" ? checked : value }));
  }

  async function onSubmit(e) {
    e.preventDefault();
    if (form.password !== form.confirm) {
      setStatus({ loading: false, msg: "Passwords do not match." });
      return;
    }
    if (!form.agree) {
      setStatus({ loading: false, msg: "Please accept the Terms to continue." });
      return;
    }
    setStatus({ loading: true, msg: "" });
    await new Promise((r) => setTimeout(r, 1000));
    setStatus({ loading: false, msg: "Account created (demo)." });
    setForm({ name: "", email: "", password: "", confirm: "", agree: false });
  }

  const strengthColors = ["bg-gray-200", "bg-red-400", "bg-amber-400", "bg-green-500", "bg-emerald-600"];
  const strengthLabels = ["Too short", "Weak", "Okay", "Good", "Strong"];

  return (
    <main className="min-h-screen bg-gray-50">
      <section className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid items-stretch gap-8 lg:grid-cols-2">
          {/* Left: Sign up card */}
          <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
            <h1 className="font-heading text-xl font-semibold text-gray-900">Create your account</h1>
            <p className="mt-1 text-sm text-gray-600">
              Already have an account?{" "}
              <Link href="/login" className="text-indigo-600 hover:underline">Sign in</Link>
            </p>

            <form onSubmit={onSubmit} className="mt-6 space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label className="mb-1 block text-sm font-medium text-gray-700">Full name</label>
                  <input
                    name="name"
                    value={form.name}
                    onChange={onChange}
                    required
                    placeholder="Your name"
                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-[15px] text-gray-900 outline-none ring-indigo-500 focus:ring-2"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="mb-1 block text-sm font-medium text-gray-700">Email</label>
                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={onChange}
                    required
                    placeholder="you@example.com"
                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-[15px] text-gray-900 outline-none ring-indigo-500 focus:ring-2"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="relative">
                  <label className="mb-1 block text-sm font-medium text-gray-700">Password</label>
                  <input
                    name="password"
                    type={showPwd ? "text" : "password"}
                    value={form.password}
                    onChange={onChange}
                    required
                    placeholder="At least 8 characters"
                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 pr-10 text-[15px] text-gray-900 outline-none ring-indigo-500 focus:ring-2"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPwd((s) => !s)}
                    className="absolute right-2 top-8 rounded-md p-1 text-gray-500 hover:bg-gray-100"
                    aria-label="Toggle password visibility"
                  >
                    {showPwd ? "🙈" : "👁️"}
                  </button>

                  {/* Strength meter */}
                  <div className="mt-2 flex items-center gap-2">
                    {[0, 1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className={`h-1.5 w-full rounded ${i < pwdStrength ? strengthColors[pwdStrength] : "bg-gray-200"}`}
                      />
                    ))}
                    <span className="text-xs text-gray-500">{strengthLabels[pwdStrength]}</span>
                  </div>
                </div>

                <div className="relative">
                  <label className="mb-1 block text-sm font-medium text-gray-700">Confirm password</label>
                  <input
                    name="confirm"
                    type={showPwd2 ? "text" : "password"}
                    value={form.confirm}
                    onChange={onChange}
                    required
                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 pr-10 text-[15px] text-gray-900 outline-none ring-indigo-500 focus:ring-2"
                    placeholder="Repeat password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPwd2((s) => !s)}
                    className="absolute right-2 top-8 rounded-md p-1 text-gray-500 hover:bg-gray-100"
                    aria-label="Toggle password visibility"
                  >
                    {showPwd2 ? "🙈" : "👁️"}
                  </button>
                </div>
              </div>

              <label className="mt-1 inline-flex items-center gap-2 text-sm text-gray-700">
                <input
                  type="checkbox"
                  name="agree"
                  checked={form.agree}
                  onChange={onChange}
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                I agree to the{" "}
                <Link href="/terms" className="text-indigo-600 hover:underline">Terms</Link>{" "}
                and{" "}
                <Link href="/privacy" className="text-indigo-600 hover:underline">Privacy Policy</Link>.
              </label>

              <button
                type="submit"
                disabled={status.loading}
                className="mt-1 inline-flex w-full items-center justify-center rounded-lg bg-indigo-600 px-4 py-2.5 font-medium text-white transition hover:bg-indigo-700 disabled:opacity-60"
              >
                {status.loading ? "Creating account..." : "Create account"}
              </button>

              {status.msg && <p className="text-sm text-green-600">{status.msg}</p>}

              <div className="mt-2 text-center text-sm text-gray-600">
                By creating an account, you agree to our policies.
              </div>
            </form>
          </div>

          {/* Right: Promo panel */}
          <div className="hidden rounded-2xl bg-gradient-to-br from-indigo-600 to-blue-600 p-8 text-white shadow-sm ring-1 ring-white/10 lg:block">
            <h2 className="font-heading text-3xl font-semibold">Join BookNest</h2>
            <p className="mt-2 max-w-md text-white/90">
              Book smarter. Share links, avoid double-booking, and delight your clients.
            </p>
            <div className="mt-8 grid grid-cols-2 gap-4">
              {[
                ["Avg rating", "4.8/5"],
                ["No-show drop", "-28%"],
                ["Providers", "850+"],
                ["Bookings/mo", "1,200+"],
              ].map(([k, v]) => (
                <div key={k} className="rounded-xl bg-white/10 p-4 ring-1 ring-white/20 backdrop-blur-sm">
                  <p className="text-xs text-white/80">{k}</p>
                  <p className="mt-1 text-2xl font-semibold">{v}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
