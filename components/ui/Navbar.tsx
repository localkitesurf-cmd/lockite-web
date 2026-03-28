'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const NAV = [
  { href: '/spots',   label: 'Spots' },
  { href: '/map',     label: 'Karte' },
  { href: '/forecast',label: 'Forecast' },
];

export function Navbar({ session }: { session: any }) {
  const path = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/[0.06] backdrop-blur-xl bg-ink/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className="font-bold text-xl tracking-[-0.05em] text-white" style={{ fontFamily: 'Syne, sans-serif' }}>
            LOCK<span className="text-cyan">ITE</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {NAV.map(n => (
            <Link key={n.href} href={n.href}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                path.startsWith(n.href)
                  ? 'bg-cyan/10 text-cyan'
                  : 'text-dim hover:text-white hover:bg-white/5'
              }`}>
              {n.label}
            </Link>
          ))}
        </nav>

        {/* Auth */}
        <div className="hidden md:flex items-center gap-3">
          {session ? (
            <Link href="/dashboard" className="btn-primary text-sm py-2 px-4">
              Dashboard
            </Link>
          ) : (
            <>
              <Link href="/auth/login" className="text-dim hover:text-white text-sm font-medium transition-colors">
                Anmelden
              </Link>
              <Link href="/auth/register" className="btn-primary text-sm py-2 px-4">
                Kostenlos starten
              </Link>
            </>
          )}
        </div>

        {/* Mobile menu button */}
        <button className="md:hidden text-dim hover:text-white p-2" onClick={() => setOpen(!open)}>
          {open ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-white/[0.06] bg-ink/95 backdrop-blur-xl px-4 py-4 flex flex-col gap-2">
          {NAV.map(n => (
            <Link key={n.href} href={n.href} onClick={() => setOpen(false)}
              className="px-4 py-3 rounded-lg text-sm font-medium text-dim hover:text-white hover:bg-white/5">
              {n.label}
            </Link>
          ))}
          <div className="border-t border-white/[0.06] pt-3 mt-1 flex flex-col gap-2">
            {session ? (
              <Link href="/dashboard" className="btn-primary" onClick={() => setOpen(false)}>Dashboard</Link>
            ) : (
              <>
                <Link href="/auth/login"    className="btn-secondary" onClick={() => setOpen(false)}>Anmelden</Link>
                <Link href="/auth/register" className="btn-primary"   onClick={() => setOpen(false)}>Kostenlos starten</Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
