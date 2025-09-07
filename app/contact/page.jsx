"use client";
import React, { useState } from "react";
import Link from "next/link";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState({ loading: false, ok: null, msg: "" });

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setStatus({ loading: false, ok: false, msg: "Please fill the required fields." });
      return;
    }
    try {
      setStatus({ loading: true, ok: null, msg: "" });
      // simulate request
      await new Promise((r) => setTimeout(r, 900));
      setStatus({ loading: true, ok: true, msg: "Message sent! We'll get back to you soon." });
      setForm({ name: "", email: "", phone: "", subject: "", message: "" });
    } catch {
      setStatus({ loading: false, ok: false, msg: "Something went wrong. Try again." });
    } finally {
      setTimeout(() => setStatus((s) => ({ ...s, loading: false })), 200);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-gradient-to-br from-indigo-600 to-blue-500 text-white">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <h1 className="text-4xl font-bold tracking-tight">Contact us</h1>
          <p className="mt-2 max-w-2xl text-white/90">
            Questions about bookings, calendar sync, or pricing? Send a message and our team will respond shortly.
          </p>
          <div className="mt-4 text-sm text-white/80">
            <Link href="/" className="hover:underline">Home</Link> <span className="px-1">/</span> Contact
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="mx-auto -mt-10 max-w-7xl px-6 pb-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {/* Form */}
          <div className="rounded-2xl bg-white p-6 shadow-lg ring-1 ring-gray-100">
            <h2 className="text-xl font-semibold text-gray-900">Send a message</h2>
            <p className="mt-1 text-sm text-gray-600">We usually reply within 24 hours.</p>

            <form onSubmit={onSubmit} className="mt-6 space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    name="name"
                    value={form.name}
                    onChange={onChange}
                    placeholder="Your name"
                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 outline-none ring-indigo-500 focus:ring-2"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={onChange}
                    placeholder="you@example.com"
                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 outline-none ring-indigo-500 focus:ring-2"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">Phone</label>
                  <input
                    name="phone"
                    value={form.phone}
                    onChange={onChange}
                    placeholder="+8801..."
                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 outline-none ring-indigo-500 focus:ring-2"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">Subject</label>
                  <input
                    name="subject"
                    value={form.subject}
                    onChange={onChange}
                    placeholder="How can we help?"
                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 outline-none ring-indigo-500 focus:ring-2"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={onChange}
                  rows="5"
                  placeholder="Write your message..."
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 outline-none ring-indigo-500 focus:ring-2"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={status.loading}
                className="inline-flex w-full items-center justify-center rounded-lg bg-indigo-600 px-4 py-2.5 font-medium text-white transition hover:bg-indigo-700 disabled:opacity-60"
              >
                {status.loading ? "Sending..." : "Send message"}
              </button>

              {status.msg ? (
                <p className={`text-sm ${status.ok ? "text-green-600" : "text-red-600"}`}>{status.msg}</p>
              ) : null}

              <p className="text-xs text-gray-500">By submitting, you agree to our{" "}
                <Link href="/terms" className="text-indigo-600 hover:underline">Terms</Link> and{" "}
                <Link href="/privacy" className="text-indigo-600 hover:underline">Privacy Policy</Link>.
              </p>
            </form>
          </div>

          {/* Contact info */}
          <div className="space-y-6">
            <div className="rounded-2xl bg-white p-6 shadow-lg ring-1 ring-gray-100">
              <h2 className="text-xl font-semibold text-gray-900">Contact information</h2>
              <div className="mt-4 space-y-5">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-50 text-indigo-600">
                    {/* map pin */}
                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2a7 7 0 00-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 00-7-7zm0 9.5A2.5 2.5 0 119.5 9 2.5 2.5 0 0112 11.5z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">BookNest HQ</p>
                    <p className="text-gray-600">Road 12, Sector 4, Dhaka</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-50 text-indigo-600">
                    {/* mail */}
                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M2 5.5A2.5 2.5 0 014.5 3h15A2.5 2.5 0 0122 5.5v13A2.5 2.5 0 0119.5 21h-15A2.5 2.5 0 012 18.5v-13zm2 .5v.38l8 4.6 8-4.6V6H4zm16 2.62l-8 4.6-8-4.6V19h16V8.62z"/>
                    </svg>
                  </div>
                  <div>
                    <a href="mailto:hello@booknest.app" className="font-medium text-indigo-600 hover:underline">
                      hello@booknest.app
                    </a>
                    <p className="text-gray-600">We reply within 24 hours</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-50 text-indigo-600">
                    {/* phone */}
                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M6.62 10.79a15 15 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24 12 12 0 003.58.57 1 1 0 011 1V20a1 1 0 01-1 1C10.3 21 3 13.7 3 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.46.57 3.58.12.35.04.74-.24 1.01l-2.2 2.2z"/>
                    </svg>
                  </div>
                  <div>
                    <a href="tel:+8801000000000" className="font-medium text-gray-900 hover:underline">
                      +880 10 0000 0000
                    </a>
                    <p className="text-gray-600">Sat–Thu, 10:00–18:00</p>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <iframe
                  title="BookNest map"
                  className="h-64 w-full rounded-xl border border-gray-200"
                  loading="lazy"
                  allowFullScreen
                  src="https://www.google.com/maps?q=Dhaka%2C%20Bangladesh&output=embed"
                />
              </div>
            </div>

            {/* FAQ (no JS, accessible) */}
            <div className="rounded-2xl bg-white p-6 shadow-lg ring-1 ring-gray-100">
              <h3 className="text-lg font-semibold text-gray-900">FAQs</h3>
              <div className="mt-4 space-y-3">
                {[
                  ["How soon can I start?", "You can connect your calendar and start accepting bookings the same day."],
                  ["Do you support Google and Outlook?", "Yes—both are supported. Apple Calendar via ICS export."],
                  ["Can clients reschedule?", "Yes. They can reschedule or cancel from the confirmation email."],
                ].map(([q, a]) => (
                  <details key={q} className="rounded-lg border border-gray-200 p-3">
                    <summary className="cursor-pointer list-none font-medium text-gray-900">
                      {q}
                    </summary>
                    <p className="mt-2 text-sm text-gray-600">{a}</p>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mx-auto mt-8 max-w-7xl">
          <div className="rounded-2xl bg-gradient-to-r from-indigo-600 to-blue-600 p-6 text-white shadow-md">
            <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
              <div>
                <h4 className="text-lg font-semibold">Prefer a quick chat?</h4>
                <p className="text-white/90">Schedule a 15-minute demo and see BookNest in action.</p>
              </div>
              <Link
                href="/book"
                className="inline-flex items-center rounded-xl bg-white px-5 py-3 text-sm font-medium text-indigo-700 hover:bg-white/90"
              >
                Book a demo
                <svg viewBox="0 0 24 24" className="ml-2 h-4 w-4" fill="none">
                  <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
