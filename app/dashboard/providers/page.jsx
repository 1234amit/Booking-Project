"use client";
import Link from "next/link";
import { useMemo, useState } from "react";

/* ----- demo data ----- */
const PROVIDERS = [
  { id: "ayesha-rahman", name: "Dr. Ayesha Rahman", cat: "Dental", city: "Dhaka", rating: 4.9, reviews: 182, price: 1800, tags: ["In-person", "Online"], next: "Tomorrow · 10:30" },
  { id: "sajid-khan", name: "Sajid Khan", cat: "Therapy", city: "Chittagong", rating: 4.7, reviews: 120, price: 1400, tags: ["Online"], next: "Today · 17:00" },
  { id: "nabila-rahman", name: "Nabila Rahman", cat: "Coaching", city: "Dhaka", rating: 4.8, reviews: 96,  price: 1300, tags: ["In-person"], next: "Thu · 11:00" },
  { id: "rifa-sultana", name: "Rifa Sultana", cat: "Physio",  city: "Sylhet", rating: 4.6, reviews: 77,  price: 1100, tags: ["In-person", "Online"], next: "Fri · 09:00" },
  { id: "tahmid-ali",   name: "Tahmid Ali",   cat: "Therapy", city: "Dhaka", rating: 4.5, reviews: 64,  price: 1200, tags: ["Online"], next: "Tomorrow · 14:30" },
  { id: "farhana-akter",name: "Dr. Farhana Akter", cat: "Dental", city: "Rajshahi", rating: 4.8, reviews: 145, price: 1700, tags: ["In-person"], next: "Mon · 12:00" },
  { id: "arif-hasan",   name: "Arif Hasan",   cat: "Physio",  city: "Dhaka", rating: 4.7, reviews: 88,  price: 1500, tags: ["In-person", "Online"], next: "Today · 19:00" },
  { id: "maliha-noor",  name: "Maliha Noor",  cat: "Coaching", city: "Khulna", rating: 4.6, reviews: 52,  price: 900,  tags: ["Online"], next: "Sat · 16:30" },
  { id: "rezaul-karim", name: "Rezaul Karim", cat: "Therapy", city: "Dhaka", rating: 4.4, reviews: 39,  price: 800,  tags: ["In-person"], next: "Sun · 10:00" },
  { id: "sumaiya-huda", name: "Sumaiya Huda", cat: "Dental",  city: "Dhaka", rating: 4.9, reviews: 210, price: 2000, tags: ["In-person"], next: "Today · 13:00" },
  { id: "anisul-hoque", name: "Anisul Hoque", cat: "Physio",  city: "Chittagong", rating: 4.5, reviews: 61, price: 1000, tags: ["Online"], next: "Tue · 18:15" },
  { id: "shahidul-islam", name: "Shahidul Islam", cat: "Coaching", city: "Dhaka", rating: 4.3, reviews: 28, price: 700, tags: ["Online"], next: "Wed · 09:30" },
];

const CATEGORIES = ["Dental", "Therapy", "Physio", "Coaching"];
const CITIES = ["All", "Dhaka", "Chittagong", "Sylhet", "Rajshahi", "Khulna"];

function initials(name) {
  return name.split(" ").map(w => w[0]).slice(0,2).join("").toUpperCase();
}
function Stars({ value }) {
  const full = Math.round(value);
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} viewBox="0 0 20 20" className={`h-4 w-4 ${i < full ? "text-amber-400" : "text-gray-300"}`} fill="currentColor">
          <path d="M10 15l-5.878 3.09L5.64 11.9 1 7.91l6.06-.88L10 1.5l2.94 5.53 6.06.88-4.64 3.99 1.517 6.19z" />
        </svg>
      ))}
      <span className="text-xs text-gray-600">{value.toFixed(1)}</span>
    </div>
  );
}
function priceTier(p) {
  if (p < 1000) return "Low";
  if (p <= 1500) return "Medium";
  return "High";
}

export default function ProvidersPage() {
  const [q, setQ] = useState("");
  const [selectedCats, setSelectedCats] = useState(new Set());
  const [city, setCity] = useState("All");
  const [minRating, setMinRating] = useState(0);
  const [tiers, setTiers] = useState(new Set()); // Low/Medium/High
  const [sort, setSort] = useState("relevance");
  const [page, setPage] = useState(1);
  const pageSize = 9;

  const toggle = (set, v) => {
    const n = new Set(set);
    n.has(v) ? n.delete(v) : n.add(v);
    return n;
  };

  const filtered = useMemo(() => {
    const term = q.toLowerCase().trim();
    let list = PROVIDERS.filter(p => {
      const matchesQ =
        !term ||
        p.name.toLowerCase().includes(term) ||
        p.cat.toLowerCase().includes(term) ||
        p.city.toLowerCase().includes(term);
      const matchesCat = selectedCats.size === 0 || selectedCats.has(p.cat);
      const matchesCity = city === "All" || p.city === city;
      const matchesRating = p.rating >= minRating;
      const tier = priceTier(p.price);
      const matchesTier = tiers.size === 0 || tiers.has(tier);
      return matchesQ && matchesCat && matchesCity && matchesRating && matchesTier;
    });

    switch (sort) {
      case "rating":
        list.sort((a, b) => b.rating - a.rating);
        break;
      case "price-asc":
        list.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        list.sort((a, b) => b.price - a.price);
        break;
      case "reviews":
        list.sort((a, b) => b.reviews - a.reviews);
        break;
      default:
        // relevance keeps current order (demo)
        break;
    }
    return list;
  }, [q, selectedCats, city, minRating, tiers, sort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const pageItems = filtered.slice((page - 1) * pageSize, page * pageSize);

  function clearAll() {
    setQ("");
    setSelectedCats(new Set());
    setCity("All");
    setMinRating(0);
    setTiers(new Set());
    setSort("relevance");
    setPage(1);
  }

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-gradient-to-br from-indigo-600 to-blue-500 text-white">
        <div className="mx-auto max-w-7xl px-6 py-12">
          <h1 className="font-heading text-3xl md:text-4xl font-semibold tracking-tight">Find a provider</h1>
          <p className="mt-2 max-w-2xl text-white/90">
            Search, filter, and book with specialists near you or online.
          </p>
        </div>
      </section>

      {/* Search + filters */}
      <section className="mx-auto -mt-8 max-w-7xl px-6 pb-16">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Filters */}
          <aside className="lg:col-span-3 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-gray-100 h-fit">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-gray-900">Filters</h3>
              <button onClick={clearAll} className="text-xs text-indigo-600 hover:underline">Clear all</button>
            </div>

            <div className="mt-4 space-y-5">
              {/* Category */}
              <div>
                <p className="text-xs font-medium text-gray-700">Category</p>
                <div className="mt-2 space-y-2">
                  {CATEGORIES.map(c => (
                    <label key={c} className="flex items-center gap-2 text-sm">
                      <input
                        type="checkbox"
                        checked={selectedCats.has(c)}
                        onChange={() => { setSelectedCats(s => toggle(s, c)); setPage(1); }}
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      />
                      {c}
                    </label>
                  ))}
                </div>
              </div>

              {/* City */}
              <div>
                <p className="text-xs font-medium text-gray-700">City</p>
                <select
                  value={city}
                  onChange={e => { setCity(e.target.value); setPage(1); }}
                  className="mt-2 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm outline-none ring-indigo-500 focus:ring-2"
                >
                  {CITIES.map(c => <option key={c}>{c}</option>)}
                </select>
              </div>

              {/* Min rating */}
              <div>
                <p className="text-xs font-medium text-gray-700">Minimum rating</p>
                <div className="mt-2 grid grid-cols-5 gap-1">
                  {[0, 3, 4, 4.5, 5].map(r => (
                    <button
                      key={r}
                      onClick={() => { setMinRating(r); setPage(1); }}
                      className={`rounded-lg px-2 py-1 text-xs ring-1 ${minRating === r ? "bg-indigo-600 text-white ring-indigo-600" : "bg-white text-gray-700 ring-gray-200 hover:bg-gray-50"}`}
                    >
                      {r === 0 ? "Any" : `${r}+`}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price tier */}
              <div>
                <p className="text-xs font-medium text-gray-700">Price per session</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {["Low", "Medium", "High"].map(t => (
                    <button
                      key={t}
                      onClick={() => { setTiers(s => toggle(s, t)); setPage(1); }}
                      className={`rounded-full px-3 py-1 text-xs ring-1 ${tiers.has(t) ? "bg-indigo-50 text-indigo-700 ring-indigo-200" : "bg-white text-gray-700 ring-gray-200 hover:bg-gray-50"}`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
                <p className="mt-1 text-[11px] text-gray-500">Low &lt; ৳1000 · Medium ≤ ৳1500 · High &gt; ৳1500</p>
              </div>
            </div>
          </aside>

          {/* Results */}
          <div className="lg:col-span-9">
            {/* Search + sort */}
            <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-gray-100">
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div className="relative w-full md:max-w-md">
                  <input
                    value={q}
                    onChange={e => { setQ(e.target.value); setPage(1); }}
                    placeholder="Search by name, category, city..."
                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 pl-9 text-sm outline-none ring-indigo-500 focus:ring-2"
                  />
                  <span className="pointer-events-none absolute left-2 top-1/2 -translate-y-1/2 text-gray-400">⌕</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500">{filtered.length} providers</span>
                  <select
                    value={sort}
                    onChange={e => setSort(e.target.value)}
                    className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm outline-none ring-indigo-500 focus:ring-2"
                  >
                    <option value="relevance">Sort: Relevance</option>
                    <option value="rating">Highest rating</option>
                    <option value="reviews">Most reviews</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Cards */}
            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {pageItems.map(p => (
                <article key={p.id} className="group rounded-2xl bg-white p-5 shadow-sm ring-1 ring-gray-100 transition hover:shadow-md">
                  <div className="flex items-start gap-4">
                    <div className="grid h-12 w-12 place-items-center rounded-full bg-indigo-100 text-indigo-700 font-semibold">
                      {initials(p.name)}
                    </div>
                    <div className="min-w-0">
                      <h3 className="truncate font-medium text-gray-900">{p.name}</h3>
                      <p className="truncate text-sm text-gray-600">{p.cat} · {p.city}</p>
                      <div className="mt-1 flex items-center gap-3">
                        <Stars value={p.rating} />
                        <span className="text-xs text-gray-500">{p.reviews} reviews</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 flex flex-wrap items-center gap-2">
                    {p.tags.map(t => (
                      <span key={t} className="rounded-full bg-gray-100 px-2.5 py-1 text-xs text-gray-700">{t}</span>
                    ))}
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    <div>
                      <p className="text-xs text-gray-500">Next available</p>
                      <p className="text-sm font-medium text-gray-900">{p.next}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-500">Price</p>
                      <p className="text-sm font-semibold text-gray-900">৳{p.price}</p>
                    </div>
                  </div>

                  <div className="mt-5 flex items-center justify-between">
                    <Link
                      href={`/dashboard/providers/${p.id}`}
                      className="text-sm text-indigo-600 hover:underline"
                    >
                      View profile
                    </Link>
                    <Link
                      href={`/book?provider=${p.id}`}
                      className="inline-flex items-center rounded-lg bg-indigo-600 px-3 py-2 text-sm font-medium text-white hover:bg-indigo-700"
                    >
                      Book
                      <svg viewBox="0 0 24 24" className="ml-1 h-4 w-4" fill="none">
                        <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </Link>
                  </div>
                </article>
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-6 flex items-center justify-between">
              <p className="text-xs text-gray-500">
                Page {page} of {totalPages}
              </p>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 disabled:opacity-50 hover:bg-gray-50"
                >
                  Previous
                </button>
                <button
                  onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 disabled:opacity-50 hover:bg-gray-50"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
