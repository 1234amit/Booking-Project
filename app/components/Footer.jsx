import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-300">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2">
            <Link href="/" className="text-2xl font-semibold text-white">BookNest</Link>
            <p className="mt-3 max-w-sm text-sm text-slate-400">Simple appointments with calendar sync for modern businesses.</p>
            <div className="mt-6 flex items-center gap-3">
              <a href="#" aria-label="Twitter" className="rounded-md bg-white/10 p-2 hover:bg-white/20">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M19.6 7.2c.01.17.01.34.01.51 0 5.2-3.96 11.19-11.19 11.19-2.22 0-4.28-.65-6.01-1.78.31.04.62.06.94.06 1.84 0 3.53-.63 4.88-1.69a3.95 3.95 0 01-3.68-2.73c.24.04.49.06.74.06.36 0 .71-.05 1.04-.14A3.94 3.94 0 013 8.79v-.05c.53.29 1.15.47 1.8.5A3.93 3.93 0 013.8 6.1c0-.73.2-1.41.56-2 2.06 2.54 5.14 4.2 8.61 4.37a3.94 3.94 0 016.71-3.59 7.9 7.9 0 002.5-.95 3.95 3.95 0 01-1.73 2.18 7.89 7.89 0 002.26-.62 8.46 8.46 0 01-1.11 1.13z"/></svg>
              </a>
              <a href="#" aria-label="LinkedIn" className="rounded-md bg-white/10 p-2 hover:bg-white/20">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M20.45 20.45h-3.56v-5.62c0-1.34-.02-3.06-1.86-3.06-1.86 0-2.14 1.45-2.14 2.95v5.73H9.33V9.5h3.41v1.5h.05c.47-.88 1.61-1.81 3.31-1.81 3.54 0 4.19 2.33 4.19 5.36v5.9zM5.34 8h-.02C4.13 8 3.3 7.15 3.3 6.08c0-1.1.85-1.92 2.08-1.92 1.23 0 2.06.83 2.09 1.92 0 1.07-.85 1.92-2.13 1.92zM3.61 20.45h3.56V9.5H3.61v10.95z"/></svg>
              </a>
            </div>
          </div>
          <div>
            <p className="text-sm font-semibold text-white">Product</p>
            <ul className="mt-3 space-y-2 text-sm">
              <li><Link href="/features" className="hover:text-white">Features</Link></li>
              <li><Link href="/pricing" className="hover:text-white">Pricing</Link></li>
              <li><Link href="/providers" className="hover:text-white">Providers</Link></li>
            </ul>
          </div>
          <div>
            <p className="text-sm font-semibold text-white">Company</p>
            <ul className="mt-3 space-y-2 text-sm">
              <li><Link href="/about" className="hover:text-white">About</Link></li>
              <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
              <li><Link href="/blog" className="hover:text-white">Blog</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-10 border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-xs text-slate-400">© {new Date().getFullYear()} BookNest</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="text-xs text-slate-400 hover:text-white">Privacy</Link>
            <Link href="/terms" className="text-xs text-slate-400 hover:text-white">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
