"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

/* -------------------- demo data -------------------- */
const kpis = {
  bookings: 1284,
  revenue: 186400, // BDT
  noShowPct: -28,
  rating: 4.8,
};
const bookingsTrend = [32, 28, 36, 30, 40, 44, 48, 42, 46, 52, 57, 60]; // last 12 weeks
const revenueTrend = [10, 12, 11, 15, 14, 18, 20, 17, 19, 22, 25, 27].map((v) => v * 1000);
const upcoming = [
  { id: "b1", when: "Today · 13:00", client: "Shafin Khan", provider: "Sumaiya Huda", svc: "Consultation (30m)", loc: "In-person", status: "Confirmed" },
  { id: "b2", when: "Today · 17:30", client: "Maliha Noor", provider: "Sajid Khan", svc: "Follow-up (45m)", loc: "Online", status: "Confirmed" },
  { id: "b3", when: "Tomorrow · 10:30", client: "Nusrat Jahan", provider: "Dr. Ayesha Rahman", svc: "Consultation (30m)", loc: "In-person", status: "Pending" },
  { id: "b4", when: "Thu · 11:00", client: "Rayhan Islam", provider: "Nabila Rahman", svc: "Extended (60m)", loc: "Online", status: "Confirmed" },
];
const topProviders = [
  { name: "Sumaiya Huda", rating: 4.9, bookings: 112, revenue: 224000 },
  { name: "Dr. Ayesha Rahman", rating: 4.8, bookings: 96, revenue: 205000 },
  { name: "Arif Hasan", rating: 4.7, bookings: 88, revenue: 176000 },
  { name: "Sajid Khan", rating: 4.6, bookings: 77, revenue: 154000 },
];

function numberize(n) {
  return n.toLocaleString();
}

/* -------------------- tiny charts -------------------- */
function LineChart({ data, height = 80, stroke = "#4f46e5" }) {
  const width = 320;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const pad = 8;
  const scaleX = (i) => (i / (data.length - 1)) * (width - pad * 2) + pad;
  const scaleY = (v) =>
    (1 - (v - min) / (max - min || 1)) * (height - pad * 2) + pad;

  const d = data.map((v, i) => `${i === 0 ? "M" : "L"} ${scaleX(i)} ${scaleY(v)}`).join(" ");
  const lastY = scaleY(data[data.length - 1]);

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full">
      <path d={d} fill="none" stroke={stroke} strokeWidth="2.5" />
      <circle cx={scaleX(data.length - 1)} cy={lastY} r="3.5" fill={stroke} />
    </svg>
  );
}
function BarChart({ data, height = 120, fill = "#4f46e5" }) {
  const width = 360;
  const pad = 10;
  const max = Math.max(...data);
  const barW = (width - pad * 2) / data.length - 6;

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full">
      {data.map((v, i) => {
        const h = ((v / (max || 1)) * (height - 20)) | 0;
        const x = pad + i * (barW + 6);
        const y = height - h - 6;
        return (
          <rect
            key={i}
            x={x}
            y={y}
            width={barW}
            height={h}
            rx="4"
            fill={fill}
            opacity={0.9 - i * 0.02}
          />
        );
      })}
    </svg>
  );
}

/* -------------------- page -------------------- */
export default function Dashboard() {
  const [range, setRange] = useState("Last 12 weeks");

  const totals = useMemo(() => {
    const bookings = bookingsTrend.reduce((a, b) => a + b, 0);
    const revenue = revenueTrend.reduce((a, b) => a + b, 0);
    return { bookings, revenue };
  }, []);

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Top bar */}
      <section className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-6">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <div>
              <h1 className="font-heading text-2xl font-semibold text-gray-900">
                Dashboard
              </h1>
              <p className="text-sm text-gray-600">
                Overview of bookings, revenue, and provider performance.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <select
                value={range}
                onChange={(e) => setRange(e.target.value)}
                className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm outline-none ring-indigo-500 focus:ring-2"
              >
                <option>Last 12 weeks</option>
                <option>Last 3 months</option>
                <option>Last 12 months</option>
              </select>
              <Link
                href="/book"
                className="inline-flex items-center rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
              >
                New booking
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="mx-auto max-w-7xl px-6 py-8">
        {/* KPI cards */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          <div className="rounded-2xl bg-white p-4 ring-1 ring-gray-100 shadow-sm">
            <p className="text-xs text-gray-500">Bookings this month</p>
            <p className="mt-1 text-2xl font-semibold text-gray-900">
              {numberize(kpis.bookings)}
            </p>
            <div className="mt-2">
              <LineChart data={bookingsTrend.slice(-8)} />
            </div>
          </div>

          <div className="rounded-2xl bg-white p-4 ring-1 ring-gray-100 shadow-sm">
            <p className="text-xs text-gray-500">Revenue</p>
            <p className="mt-1 text-2xl font-semibold text-gray-900">
              ৳{numberize(kpis.revenue)}
            </p>
            <div className="mt-2">
              <BarChart data={revenueTrend.slice(-8)} />
            </div>
          </div>

          <div className="rounded-2xl bg-white p-4 ring-1 ring-gray-100 shadow-sm">
            <p className="text-xs text-gray-500">No-shows reduced</p>
            <p className="mt-1 text-2xl font-semibold text-gray-900">
              {kpis.noShowPct}%
            </p>
            <p className="mt-1 text-xs text-emerald-600">vs last month</p>
          </div>

          <div className="rounded-2xl bg-white p-4 ring-1 ring-gray-100 shadow-sm">
            <p className="text-xs text-gray-500">Avg rating</p>
            <p className="mt-1 text-2xl font-semibold text-gray-900">
              {kpis.rating}/5
            </p>
            <div className="mt-2 flex gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <svg
                  key={i}
                  viewBox="0 0 20 20"
                  className={`h-5 w-5 ${
                    i < Math.round(kpis.rating)
                      ? "text-amber-400"
                      : "text-gray-200"
                  }`}
                  fill="currentColor"
                >
                  <path d="M10 15l-5.878 3.09L5.64 11.9 1 7.91l6.06-.88L10 1.5l2.94 5.53 6.06.88-4.64 3.99 1.517 6.19z" />
                </svg>
              ))}
            </div>
          </div>
        </div>

        {/* Charts row */}
        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="rounded-2xl bg-white p-6 ring-1 ring-gray-100 shadow-sm lg:col-span-2">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="font-heading text-lg font-semibold text-gray-900">
                  Appointments trend
                </h2>
                <p className="text-sm text-gray-600">
                  {range} · Total {numberize(totals.bookings)} bookings
                </p>
              </div>
              <Link href="/reports" className="text-sm text-indigo-600 hover:underline">
                View report
              </Link>
            </div>
            <div className="mt-2">
              <LineChart data={bookingsTrend} />
            </div>
          </div>

          <div className="rounded-2xl bg-white p-6 ring-1 ring-gray-100 shadow-sm">
            <div className="flex items-start justify-between">
              <h2 className="font-heading text-lg font-semibold text-gray-900">
                Revenue trend
              </h2>
              <span className="rounded-full bg-indigo-50 px-2.5 py-1 text-xs font-medium text-indigo-700 ring-1 ring-indigo-200">
                BDT
              </span>
            </div>
            <div className="mt-2">
              <BarChart data={revenueTrend} />
            </div>
            <p className="mt-2 text-sm text-gray-600">
              {range} · Total ৳{numberize(totals.revenue)}
            </p>
          </div>
        </div>

        {/* Lower grid: upcoming + top providers */}
        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Upcoming */}
          <div className="rounded-2xl bg-white p-6 ring-1 ring-gray-100 shadow-sm lg:col-span-2">
            <div className="flex items-center justify-between">
              <h2 className="font-heading text-lg font-semibold text-gray-900">
                Upcoming appointments
              </h2>
              <Link
                href="/book"
                className="text-sm text-indigo-600 hover:underline"
              >
                Create booking
              </Link>
            </div>

            <div className="mt-3 overflow-hidden rounded-xl border border-gray-200">
              <table className="min-w-full divide-y divide-gray-200 text-sm">
                <thead className="bg-gray-50">
                  <tr className="text-left text-gray-600">
                    <th className="px-4 py-3">When</th>
                    <th className="px-4 py-3">Client</th>
                    <th className="px-4 py-3">Provider</th>
                    <th className="px-4 py-3">Service</th>
                    <th className="px-4 py-3">Location</th>
                    <th className="px-4 py-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {upcoming.map((b) => (
                    <tr key={b.id}>
                      <td className="px-4 py-3 text-gray-900">{b.when}</td>
                      <td className="px-4 py-3">{b.client}</td>
                      <td className="px-4 py-3">{b.provider}</td>
                      <td className="px-4 py-3 text-gray-700">{b.svc}</td>
                      <td className="px-4 py-3">{b.loc}</td>
                      <td className="px-4 py-3">
                        <span
                          className={`rounded-full px-2.5 py-1 text-xs ring-1 ${
                            b.status === "Confirmed"
                              ? "bg-emerald-50 text-emerald-700 ring-emerald-200"
                              : "bg-amber-50 text-amber-700 ring-amber-200"
                          }`}
                        >
                          {b.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Top providers */}
          <div className="rounded-2xl bg-white p-6 ring-1 ring-gray-100 shadow-sm">
            <h2 className="font-heading text-lg font-semibold text-gray-900">
              Top providers
            </h2>
            <ul className="mt-3 space-y-3">
              {topProviders.map((p) => (
                <li
                  key={p.name}
                  className="flex items-center justify-between rounded-lg border border-gray-200 p-3"
                >
                  <div>
                    <p className="font-medium text-gray-900">{p.name}</p>
                    <p className="text-xs text-gray-600">
                      {p.bookings} bookings · ৳{numberize(p.revenue)}
                    </p>
                  </div>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <svg
                        key={i}
                        viewBox="0 0 20 20"
                        className={`h-4 w-4 ${
                          i < Math.round(p.rating)
                            ? "text-amber-400"
                            : "text-gray-200"
                        }`}
                        fill="currentColor"
                      >
                        <path d="M10 15l-5.878 3.09L5.64 11.9 1 7.91l6.06-.88L10 1.5l2.94 5.53 6.06.88-4.64 3.99 1.517 6.19z" />
                      </svg>
                    ))}
                    <span className="ml-1 text-sm font-medium text-gray-900">
                      {p.rating.toFixed(1)}
                    </span>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-4">
              <Link href="/providers" className="text-sm text-indigo-600 hover:underline">
                Manage providers
              </Link>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-8 rounded-2xl bg-gradient-to-r from-indigo-600 to-blue-600 p-6 text-white shadow-sm">
          <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
            <div>
              <h3 className="font-heading text-lg font-semibold">
                Reduce no-shows with reminders
              </h3>
              <p className="text-white/90">
                Enable email & SMS reminders from settings in one click.
              </p>
            </div>
            <Link
              href="/settings"
              className="inline-flex items-center rounded-xl bg-white px-5 py-3 text-sm font-medium text-indigo-700 hover:bg-white/90"
            >
              Go to settings
              <svg viewBox="0 0 24 24" className="ml-2 h-4 w-4" fill="none">
                <path
                  d="M5 12h14M13 5l7 7-7 7"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
