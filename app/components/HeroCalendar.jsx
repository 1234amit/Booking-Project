"use client";
import { useMemo, useState } from "react";

function monthCells(year, month) {
  const first = new Date(year, month, 1);
  const start = first.getDay();               // 0 = Sun
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const total = Math.ceil((start + daysInMonth) / 7) * 7; // 5–6 weeks
  const cells = [];
  for (let i = 0; i < total; i++) {
    const d = new Date(year, month, i - start + 1);
    cells.push({ d, inMonth: d.getMonth() === month });
  }
  return cells;
}

export default function HeroCalendar() {
  const [offset, setOffset] = useState(0);
  const base = new Date();
  const view = new Date(base.getFullYear(), base.getMonth() + offset, 1);
  const cells = useMemo(
    () => monthCells(view.getFullYear(), view.getMonth()),
    [view]
  );
  const todayKey = new Date().toDateString();
  const DOW = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <aside className="w-full max-w-md rounded-2xl bg-white/10 p-4 text-white ring-1 ring-white/20 backdrop-blur-sm lg:ml-auto">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium">
          {view.toLocaleString(undefined, { month: "long", year: "numeric" })}
        </h3>
        <div className="flex gap-2">
          <button
            aria-label="Previous month"
            onClick={() => setOffset((o) => o - 1)}
            className="rounded-md bg-white/10 p-1 hover:bg-white/20"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M15 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
          <button
            aria-label="Next month"
            onClick={() => setOffset((o) => o + 1)}
            className="rounded-md bg-white/10 p-1 hover:bg-white/20"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </div>

      <div className="mt-3 grid grid-cols-7 gap-1 text-center text-xs text-white/80">
        {DOW.map((d) => (
          <div key={d} className="py-1">{d}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1 text-center">
        {cells.map(({ d, inMonth }, i) => {
          const isToday = d.toDateString() === todayKey;
          return (
            <div key={i} className={`rounded-md py-2 text-sm ${inMonth ? "text-white" : "text-white/40"}`}>
              <span
                className={`inline-flex h-8 w-8 items-center justify-center rounded-md
                  ${isToday ? "bg-white text-indigo-700 font-semibold" : "hover:bg-white/10"}`}
              >
                {d.getDate()}
              </span>
            </div>
          );
        })}
      </div>

      <p className="mt-3 text-xs text-white/70">Click a day to start booking.</p>
    </aside>
  );
}
