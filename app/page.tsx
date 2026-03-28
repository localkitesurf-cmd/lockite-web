import Link from 'next/link';
import { Navbar } from '@/components/ui/Navbar';
import { SpotCard } from '@/components/spot/SpotCard';
import { getSession } from '@/lib/supabase';
import { MOCK_SPOTS, MOCK_FORECAST } from '@/lib/types';

export default async function HomePage() {
  const session = null;
  const featuredSpots = MOCK_SPOTS.slice(0, 3);

  return (
    <div className="min-h-screen bg-ink">
      <Navbar session={session} />

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-24 px-4 overflow-hidden">
        {/* Background glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] rounded-full"
            style={{ background: 'radial-gradient(ellipse, rgba(0,194,203,0.07) 0%, transparent 70%)' }} />
          <div className="absolute bottom-0 right-0 w-[400px] h-[400px]"
            style={{ background: 'radial-gradient(ellipse, rgba(10,110,189,0.08) 0%, transparent 70%)' }} />
        </div>

        <div className="relative max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full border border-cyan/20 bg-cyan/5">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            <span className="text-xs font-semibold text-dim tracking-wider uppercase">Live-Winddaten für 2.400+ Spots</span>
          </div>

          <h1 className="text-5xl sm:text-7xl font-bold text-white mb-6 leading-none"
            style={{ fontFamily: 'Syne, sans-serif', letterSpacing: '-0.04em' }}>
            Finde deinen<br />
            <span className="text-cyan">perfekten Spot.</span>
          </h1>

          <p className="text-lg text-dim max-w-xl mx-auto mb-10 leading-relaxed font-light">
            Echtzeit-Winddaten, weltweite Kitesurf-Spots und smarte Reiseplanung — alles in einer Plattform.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/spots" className="btn-primary text-base px-8 py-3.5">
              Spots entdecken
            </Link>
            <Link href="/map" className="btn-secondary text-base px-8 py-3.5">
              Karte öffnen
            </Link>
          </div>
        </div>
      </section>

      {/* ── Stats ────────────────────────────────────────────── */}
      <section className="border-y border-white/[0.06]">
        <div className="max-w-5xl mx-auto grid grid-cols-3 divide-x divide-white/[0.06]">
          {[
            { n: '2.400+', l: 'Spots weltweit' },
            { n: '⌀ 7 min', l: 'bis zur Spot-Entscheidung' },
            { n: '48h', l: 'Wind-Forecast' },
          ].map((s) => (
            <div key={s.l} className="py-10 text-center">
              <div className="text-3xl sm:text-4xl font-bold text-white mb-1.5"
                style={{ fontFamily: 'Syne, sans-serif', letterSpacing: '-0.04em' }}>
                {s.n}
              </div>
              <div className="text-xs text-dim font-medium">{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Featured Spots ───────────────────────────────────── */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="section-eyebrow">Top Spots</p>
              <h2 className="section-title text-3xl sm:text-4xl">Jetzt perfekte<br />Bedingungen.</h2>
            </div>
            <Link href="/spots" className="btn-ghost hidden sm:flex">
              Alle Spots →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {featuredSpots.map(spot => (
              <SpotCard key={spot.id} spot={spot} forecast={MOCK_FORECAST[spot.id]} />
            ))}
          </div>
          <div className="text-center mt-8 sm:hidden">
            <Link href="/spots" className="btn-secondary px-8">Alle Spots →</Link>
          </div>
        </div>
      </section>

      {/* ── Features ─────────────────────────────────────────── */}
      <section className="py-20 px-4 border-t border-white/[0.06]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <p className="section-eyebrow">Was Lockite kann</p>
            <h2 className="section-title text-3xl sm:text-4xl">Alles was du brauchst.<br />Nichts was du nicht brauchst.</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-white/[0.06] border border-white/[0.06] rounded-xl overflow-hidden">
            {[
              { icon:'🗺️', title:'Interaktive Karte',     desc:'2.400+ Spots weltweit, filterbar nach Level, Windrichtung und Spot-Typ.' },
              { icon:'🌬️', title:'Echtzeit-Winddaten',    desc:'Live-Wind, Böen, Richtung und 7-Tage-Forecast für jeden Spot — stündlich aktualisiert.' },
              { icon:'⭐', title:'Smarte Empfehlungen',   desc:'Lockite empfiehlt Spots passend zu deinem Level, deiner Region und Reisezeit.' },
              { icon:'🏨', title:'Unterkünfte in Spotnähe',desc:'Hotels, Apartments und Kitecamps direkt neben deinem Wunsch-Spot.' },
              { icon:'🔔', title:'Wind-Alerts',            desc:'Du definierst dein Windfenster — wir benachrichtigen dich wenn Bedingungen perfekt sind.' },
              { icon:'📊', title:'Community-Ratings',      desc:'Ehrliche Bewertungen zu Wind, Crowd, Preis und Anfängerfreundlichkeit.' },
            ].map((f) => (
              <div key={f.title} className="bg-card hover:bg-card2 transition-colors p-7 group">
                <div className="text-3xl mb-4">{f.icon}</div>
                <h3 className="font-bold text-white mb-2" style={{ fontFamily: 'Syne, sans-serif' }}>{f.title}</h3>
                <p className="text-dim text-sm leading-relaxed font-light">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section className="py-20 px-4 border-t border-white/[0.06]">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="section-title text-3xl sm:text-4xl mb-4">Bereit zum Kiten?</h2>
          <p className="text-dim mb-8 font-light">Kostenlos registrieren — kein Abo, kein Kreditkarte nötig.</p>
          <Link href="/auth/register" className="btn-primary text-base px-10 py-4 inline-flex">
            Jetzt kostenlos starten
          </Link>
        </div>
      </section>

      {/* ── Footer ───────────────────────────────────────────── */}
      <footer className="border-t border-white/[0.06] py-8 px-4">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="font-bold text-dim" style={{ fontFamily: 'Syne, sans-serif' }}>
            LOCK<span className="text-cyan">ITE</span>
          </span>
          <p className="text-dim text-xs">© 2025 Lockite · Location + Kite</p>
          <div className="flex gap-6 text-xs text-dim">
            <Link href="/spots"   className="hover:text-white transition-colors">Spots</Link>
            <Link href="/map"     className="hover:text-white transition-colors">Karte</Link>
            <Link href="/auth/login" className="hover:text-white transition-colors">Login</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
