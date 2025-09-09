import Link from "next/link";
import HeroCalendar from "./components/HeroCalendar"; // ⬅️ add this

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-indigo-500 to-blue-500 text-white">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/2 -top-24 h-80 w-80 -translate-x-1/2 rounded-full bg-white/20 blur-3xl" />
          <div className="absolute -right-24 -bottom-24 h-96 w-96 rounded-full bg-fuchsia-500/10 blur-3xl" />
        </div>

        <div className="mx-auto max-w-7xl px-6 py-20 lg:py-28">
          {/* turn hero into a 2-col layout on large screens */}
          <div className="grid items-start gap-10 lg:grid-cols-2">
            {/* LEFT: your existing content */}
            <div className="max-w-3xl">
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-white/80">
                Appointments made simple
              </p>
              <h1 className="mt-3 text-balance text-4xl font-bold leading-tight md:text-5xl lg:text-6xl lg:leading-[1.05]">
                BookNest syncs your schedule across calendars
              </h1>
              <p className="mt-4 max-w-2xl text-white/90">
                Let clients book, reschedule, and cancel while your Google or Outlook calendar stays in sync.
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Link href="/dashboard/bookings" className="group inline-flex items-center rounded-xl bg-white px-5 py-3 text-sm font-medium text-indigo-700 shadow-sm ring-1 ring-black/5 hover:bg-white/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70">
                  Book a demo
                  <svg viewBox="0 0 24 24" className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" fill="none">
                    <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
                <Link href="/providers" className="inline-flex items-center rounded-xl bg-white/10 px-5 py-3 text-sm text-white ring-1 ring-white/30 backdrop-blur hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70">
                  See providers
                </Link>
              </div>

              <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
                {[
                  ["Bookings this month", "1,284"],
                  ["No-shows reduced", "-28%"],
                  ["Avg rating", "4.8/5"],
                  ["Calendar conflicts", "0"],
                ].map(([label, value]) => (
                  <div key={label} className="rounded-xl bg-white/10 p-4 ring-1 ring-white/20 backdrop-blur-sm">
                    <p className="text-xs text-white/80">{label}</p>
                    <p className="mt-1 text-2xl font-semibold">{value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT: calendar card */}
            <HeroCalendar />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
            <div className="h-10 w-10 rounded-lg bg-indigo-100 text-indigo-600 grid place-items-center">✓</div>
            <h3 className="mt-4 text-base font-semibold text-gray-900">One-click booking</h3>
            <p className="mt-2 text-sm text-gray-600">Clients pick a time that works and receive confirmations instantly.</p>
          </div>
          <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
            <div className="h-10 w-10 rounded-lg bg-indigo-100 text-indigo-600 grid place-items-center">↻</div>
            <h3 className="mt-4 text-base font-semibold text-gray-900">Real-time sync</h3>
            <p className="mt-2 text-sm text-gray-600">Connect Google or Outlook to block busy times and avoid double bookings.</p>
          </div>
          <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
            <div className="h-10 w-10 rounded-lg bg-indigo-100 text-indigo-600 grid place-items-center">⚡</div>
            <h3 className="mt-4 text-base font-semibold text-gray-900">Reminders</h3>
            <p className="mt-2 text-sm text-gray-600">Reduce no-shows with automated email and SMS reminders.</p>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100 lg:col-span-2">
            <h2 className="text-lg font-semibold text-gray-900">How it works</h2>
            <ol className="mt-4 grid gap-4 text-sm text-gray-700">
              <li className="rounded-xl border border-gray-200 p-4">Choose a service and provider</li>
              <li className="rounded-xl border border-gray-200 p-4">Pick an available slot</li>
              <li className="rounded-xl border border-gray-200 p-4">Add details and confirm</li>
              <li className="rounded-xl border border-gray-200 p-4">Calendar sync updates instantly</li>
            </ol>
            <div className="mt-6 flex items-center gap-3">
              <Link href="/book" className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700">Start booking</Link>
              <Link href="/dashboard" className="rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">View dashboard</Link>
            </div>
          </div>
          <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
            <h2 className="text-lg font-semibold text-gray-900">Trusted by teams</h2>
            <ul className="mt-4 space-y-3 text-sm text-gray-700">
              <li>Clinics and therapists</li>
              <li>Salons and spas</li>
              <li>Tutors and coaches</li>
              <li>Studios and consultants</li>
            </ul>
            <div className="mt-6 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 p-4 text-white">
              <p className="text-sm">Ready to reduce scheduling back-and-forth</p>
              <Link href="/contact" className="mt-2 inline-flex items-center rounded-lg bg-white px-3 py-2 text-xs font-medium text-indigo-700 hover:bg-white/90">Talk to us</Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

