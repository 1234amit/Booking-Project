"use client";
import { useMemo, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

/* ---- demo catalog ---- */
const PROVIDERS = [
  { id: "ayesha-rahman", name: "Dr. Ayesha Rahman" },
  { id: "sajid-khan", name: "Sajid Khan" },
  { id: "nabila-rahman", name: "Nabila Rahman" },
  { id: "arif-hasan", name: "Arif Hasan" },
];
const SERVICES = [
  { id: "consult-30", name: "Initial consultation (30 min)", price: 800 },
  { id: "follow-45", name: "Follow-up (45 min)", price: 1200 },
  { id: "extended-60", name: "Extended session (60 min)", price: 1600 },
];

function fmtDay(d) {
  return d.toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric" });
}
function fmtLong(d) {
  return d.toLocaleDateString(undefined, { weekday: "long", year: "numeric", month: "long", day: "numeric" });
}
function pad(n) {
  return n.toString().padStart(2, "0");
}
function asKeyDate(d) {
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}
function generateDays(count = 14) {
  const start = new Date();
  start.setHours(0, 0, 0, 0);
  return Array.from({ length: count }, (_, i) => {
    const d = new Date(start);
    d.setDate(d.getDate() + i);
    return d;
  });
}
function generateSlots(date) {
  // 09:00 → 17:00 every 30 min, skip past times if today
  const startH = 9, endH = 17;
  const todayKey = asKeyDate(new Date());
  const key = asKeyDate(date);
  const now = new Date();

  const slots = [];
  for (let h = startH; h <= endH; h++) {
    for (let m of [0, 30]) {
      const slot = new Date(date);
      slot.setHours(h, m, 0, 0);

      const label = `${pad(h)}:${pad(m)}`;
      const disabled = key === todayKey && slot <= now;
      if (h === endH && m === 30) continue; // don’t go beyond 17:30
      slots.push({ label, disabled, value: label });
    }
  }
  return slots;
}

export default function BookingsClient() {
  const sp = useSearchParams();
  const providerFromQuery = sp.get("provider") || "";

  const [provider, setProvider] = useState(providerFromQuery);
  const [service, setService] = useState(SERVICES[0].id);
  const [location, setLocation] = useState("online"); // online | inperson

  const days = useMemo(() => generateDays(14), []);
  const [dateKey, setDateKey] = useState(asKeyDate(days[0]));
  const [time, setTime] = useState("");

  const selectedDate = useMemo(() => {
    const [y, m, d] = dateKey.split("-").map(Number);
    return new Date(y, m - 1, d);
  }, [dateKey]);

  const slots = useMemo(() => generateSlots(selectedDate), [selectedDate]);

  useEffect(() => {
    // If query provider doesn’t exist in our list, clear it
    if (provider && !PROVIDERS.some(p => p.id === provider)) {
      setProvider("");
    }
  }, [provider]);

  // Client details
  const [client, setClient] = useState({ name: "", email: "", phone: "", notes: "" });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(null); // ref string

  const selectedService = SERVICES.find(s => s.id === service);
  const basePrice = selectedService?.price ?? 0;
  const locationFee = location === "inperson" ? 200 : 0;
  const total = basePrice + locationFee;

  async function onConfirm(e) {
    e.preventDefault();
    if (!provider || !service || !dateKey || !time || !client.name || !client.email) return;

    setSubmitting(true);
    // simulate request
    await new Promise(r => setTimeout(r, 900));
    const ref = "BN-" + Math.random().toString(36).slice(2, 8).toUpperCase();
    setSuccess(ref);
    setSubmitting(false);
  }

  if (success) {
    const prov = PROVIDERS.find(p => p.id === provider)?.name ?? "Any provider";
    return (
      <main className="min-h-screen bg-gray-50">
        <section className="bg-gradient-to-br from-indigo-600 to-blue-500 text-white">
          <div className="mx-auto max-w-5xl px-6 py-14">
            <h1 className="font-heading text-3xl md:text-4xl font-semibold">Booking confirmed 🎉</h1>
            <p className="mt-2 text-white/90">We’ve emailed your confirmation and calendar invite.</p>
          </div>
        </section>

        <section className="mx-auto -mt-8 max-w-5xl px-6 pb-16">
          <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Reference</p>
                <p className="text-lg font-semibold text-gray-900">{success}</p>
              </div>
              <span className="rounded-full bg-emerald-50 px-3 py-1 text-sm text-emerald-700 ring-1 ring-emerald-200">
                Confirmed
              </span>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <div className="rounded-lg border border-gray-200 p-4">
                <p className="text-sm text-gray-500">Appointment</p>
                <p className="mt-1 font-medium text-gray-900">
                  {selectedService?.name} — {prov}
                </p>
                <p className="text-gray-700">{fmtLong(selectedDate)} at {time}</p>
              </div>
              <div className="rounded-lg border border-gray-200 p-4">
                <p className="text-sm text-gray-500">Client</p>
                <p className="mt-1 font-medium text-gray-900">{client.name}</p>
                <p className="text-gray-700">{client.email}{client.phone ? ` · ${client.phone}` : ""}</p>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between">
              <p className="text-sm text-gray-500">Total paid</p>
              <p className="text-lg font-semibold text-gray-900">৳{total}</p>
            </div>

            <div className="mt-6">
              <a
                href="/"
                className="inline-flex items-center rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-indigo-700"
              >
                Back to home
              </a>
            </div>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-gradient-to-br from-indigo-600 to-blue-500 text-white">
        <div className="mx-auto max-w-7xl px-6 py-14">
          <h1 className="font-heading text-3xl md:text-4xl font-semibold tracking-tight">Book an appointment</h1>
          <p className="mt-2 max-w-2xl text-white/90">
            Choose a provider, pick a slot, and we’ll sync your calendar automatically.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="mx-auto -mt-8 max-w-7xl px-6 pb-16">
        <form onSubmit={onConfirm} className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* LEFT: Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Provider & Service */}
            <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
              <h2 className="font-heading text-lg font-semibold text-gray-900">1) Provider & service</h2>

              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">Provider</label>
                  <select
                    value={provider}
                    onChange={e => setProvider(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm outline-none ring-indigo-500 focus:ring-2"
                    required
                  >
                    <option value="" disabled>Choose a provider</option>
                    {PROVIDERS.map(p => (
                      <option key={p.id} value={p.id}>{p.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">Service</label>
                  <select
                    value={service}
                    onChange={e => setService(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm outline-none ring-indigo-500 focus:ring-2"
                  >
                    {SERVICES.map(s => (
                      <option key={s.id} value={s.id}>{s.name} — ৳{s.price}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mt-4">
                <span className="text-sm font-medium text-gray-700">Location</span>
                <div className="mt-2 flex gap-3">
                  <label className={`inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm ${location === "online" ? "border-indigo-300 bg-indigo-50 text-indigo-700" : "border-gray-300"}`}>
                    <input type="radio" name="loc" checked={location === "online"} onChange={() => setLocation("online")} />
                    Online (Zoom/Meet)
                  </label>
                  <label className={`inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm ${location === "inperson" ? "border-indigo-300 bg-indigo-50 text-indigo-700" : "border-gray-300"}`}>
                    <input type="radio" name="loc" checked={location === "inperson"} onChange={() => setLocation("inperson")} />
                    In-person (+৳200)
                  </label>
                </div>
              </div>
            </div>

            {/* Date */}
            <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
              <h2 className="font-heading text-lg font-semibold text-gray-900">2) Choose a date</h2>
              <div className="mt-4 grid grid-cols-4 gap-2 sm:grid-cols-7">
                {days.map((d) => {
                  const key = asKeyDate(d);
                  const active = key === dateKey;
                  return (
                    <button
                      type="button"
                      key={key}
                      onClick={() => { setDateKey(key); setTime(""); }}
                      className={`rounded-lg px-2 py-2 text-sm ring-1 ${active ? "bg-indigo-600 text-white ring-indigo-600" : "bg-white text-gray-700 ring-gray-200 hover:bg-gray-50"}`}
                    >
                      <div className="text-xs opacity-70">{d.toLocaleDateString(undefined, { weekday: "short" })}</div>
                      <div className="font-medium">{d.getDate()}</div>
                    </button>
                  );
                })}
              </div>
              <p className="mt-2 text-xs text-gray-500">Selected: {fmtLong(selectedDate)}</p>
            </div>

            {/* Time */}
            <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
              <h2 className="font-heading text-lg font-semibold text-gray-900">3) Pick a time</h2>
              <div className="mt-4 grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-6">
                {slots.map(s => (
                  <button
                    key={s.value}
                    type="button"
                    disabled={s.disabled}
                    onClick={() => setTime(s.value)}
                    className={`rounded-lg px-3 py-2 text-sm ring-1 disabled:opacity-40 ${time === s.value ? "bg-indigo-600 text-white ring-indigo-600" : "bg-white text-gray-700 ring-gray-200 hover:bg-gray-50"}`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Client details */}
            <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
              <h2 className="font-heading text-lg font-semibold text-gray-900">4) Your details</h2>
              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">Full name</label>
                  <input
                    value={client.name}
                    onChange={e => setClient({ ...client, name: e.target.value })}
                    required
                    placeholder="Your name"
                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm outline-none ring-indigo-500 focus:ring-2"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    value={client.email}
                    onChange={e => setClient({ ...client, email: e.target.value })}
                    required
                    placeholder="you@example.com"
                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm outline-none ring-indigo-500 focus:ring-2"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">Phone (optional)</label>
                  <input
                    value={client.phone}
                    onChange={e => setClient({ ...client, phone: e.target.value })}
                    placeholder="+8801..."
                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm outline-none ring-indigo-500 focus:ring-2"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="mb-1 block text-sm font-medium text-gray-700">Notes (optional)</label>
                  <textarea
                    rows={4}
                    value={client.notes}
                    onChange={e => setClient({ ...client, notes: e.target.value })}
                    placeholder="Anything the provider should know?"
                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm outline-none ring-indigo-500 focus:ring-2"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: Summary */}
          <aside className="lg:col-span-1">
            <div className="sticky top-24 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
              <h3 className="font-heading text-lg font-semibold text-gray-900">Summary</h3>
              <div className="mt-4 space-y-3 text-sm">
                <div className="flex items-start justify-between gap-4">
                  <span className="text-gray-600">Provider</span>
                  <span className="font-medium text-gray-900">
                    {PROVIDERS.find(p => p.id === provider)?.name || "—"}
                  </span>
                </div>
                <div className="flex items-start justify-between gap-4">
                  <span className="text-gray-600">Service</span>
                  <span className="text-right font-medium text-gray-900">
                    {selectedService?.name || "—"}
                  </span>
                </div>
                <div className="flex items-start justify-between gap-4">
                  <span className="text-gray-600">When</span>
                  <span className="text-right font-medium text-gray-900">
                    {dateKey ? `${fmtDay(selectedDate)} · ${time || "--:--"}` : "—"}
                  </span>
                </div>
                <div className="flex items-start justify-between gap-4">
                  <span className="text-gray-600">Location</span>
                  <span className="font-medium text-gray-900">
                    {location === "online" ? "Online" : "In-person"}
                  </span>
                </div>

                <div className="my-3 h-px bg-gray-200" />

                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Service</span>
                  <span className="font-medium text-gray-900">৳{basePrice}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Location fee</span>
                  <span className="font-medium text-gray-900">৳{locationFee}</span>
                </div>

                <div className="my-3 h-px bg-gray-200" />
                <div className="flex items-center justify-between text-base">
                  <span className="font-semibold text-gray-900">Total</span>
                  <span className="font-semibold text-gray-900">৳{total}</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={submitting || !provider || !service || !dateKey || !time || !client.name || !client.email}
                className="mt-6 inline-flex w-full items-center justify-center rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-700 disabled:opacity-50"
              >
                {submitting ? "Confirming..." : "Confirm booking"}
              </button>

              <p className="mt-3 text-xs text-gray-500">
                You won’t be charged now. We’ll hold the slot for 10 minutes while you confirm.
              </p>
            </div>
          </aside>
        </form>
      </section>
    </main>
  );
}
