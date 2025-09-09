"use client";
import Link from "next/link";
import { useState } from "react";
import CustomLink from "./CustomLink";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-gray-200">
      <div className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
        <Link href="/" className="text-xl font-semibold text-indigo-600" style={{ fontFamily: '"Story Script", cursive' }}>BookNest</Link>
        <div className="hidden md:flex items-center gap-6">
          <CustomLink href="/dashboard/providers" className="text-gray-700 hover:text-indigo-600">Providers</CustomLink>
          <CustomLink href="/dashboard/bookings" className="text-gray-700 hover:text-indigo-600">Book</CustomLink>
          <CustomLink href="/dashboard" className="text-gray-700 hover:text-indigo-600">Dashboard</CustomLink>
          <CustomLink href="/contact" className="text-gray-700 hover:text-indigo-600">Contact</CustomLink>
          <Link href="/login" className="rounded-lg bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700">Sign in</Link>
        </div>
        <button aria-label="Menu" onClick={() => setOpen(v=>!v)} className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:bg-gray-100">
          <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none"><path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
        </button>
      </div>
      <div className={`${open ? "block" : "hidden"} md:hidden border-t border-gray-200`}>
        <div className="px-6 py-3 space-y-2">
          <CustomLink href="/dashboard/providers" className="block text-gray-700 hover:text-indigo-600">Providers</CustomLink>
          <CustomLink href="/dashboard/bookings" className="block text-gray-700 hover:text-indigo-600">Book</CustomLink>
          <CustomLink href="/dashboard" className="block text-gray-700 hover:text-indigo-600">Dashboard</CustomLink>
          <CustomLink href="/contact" className="block text-gray-700 hover:text-indigo-600">Contact</CustomLink>
          <CustomLink href="/login" className="block rounded-lg bg-indigo-600 px-4 py-2 text-center text-white hover:bg-indigo-700">Sign in</CustomLink>
        </div>
      </div>
    </nav>
  );
}
