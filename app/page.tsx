import Link from 'next/link';
import { MOCK_SPOTS } from '@/lib/types';

const spotCount = MOCK_SPOTS.length;
const countryCount = [...new Set(MOCK_SPOTS.map(s => s.country))].length;

function IconWind() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2"/>
      <path d="M9.6 4.6A2 2 0 1 1 11 8H2"/>
      <path d="M12.6 19.4A2 2 0 1 0 14 16H2"/>
    </svg>
  );
}

function IconMap() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"/>
      <line x1="9" y1="3" x2="9" y2="18"/>
      <line x1="15" y1="6" x2="15" y2="21"/>
    </svg>
  );
}

function IconStar() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
    </svg>
  );
}

function IconArrow() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12"/>
      <polyline points="12 5 19 12 12 19"/>
    </svg>
  );
}

function IconCheck() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  );
}

function SpotCard({ spot }: { spot: typeof MOCK_SPOTS[0] }) {
  return (
    <Link href={`/spots/${spot.slug}`}
      className="group flex flex-col border-b last:border-0 py-5 transition-all"
      style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium mb-1" style={{ color: '#5A7A8A', letterSpacing: '0.05em' }}>
            {spot.region ? `${spot.region}, ` : ''}{spot.country}
          </p>
          <h3 className="text-base font-semibold text-white transition-colors group-hover:text-cyan-400"
            style={{ fontFamily: 'Syne, sans-serif', letterSpacing: '-0.02em' }}>
            {spot.name}
          </h3>
          {spot.options?.length > 0 && (
            <p className="text-xs mt-1" style={{ color: '#5A7A8A' }}>
              {spot.options.length} Kite-Option{spot.options.length > 1 ? 'en' : ''}
            </p>
          )}
        </div>
        <div className="flex items-center gap-3 mt-1">
          <span className="text-xs font-medium" style={{ color: '#5A7A8A' }}>
            {spot.avg_rating.toFixed(1)}
          </span>
          <span className="opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: '#00C2CB' }}>
            <IconArrow />
          </span>
        </div>
      </div>
    </Link>
  );
}

export default async function HomePage() {
  const featured = MOCK_SPOTS.slice(0, 6);

  return (
    <div style={{ background: '#07111C', fontFamily: 'DM Sans, sans-serif', color: 'white' }}>

      {/* Nav */}
      <nav style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link href="/">
            <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 17, letterSpacing: '-0.04em' }}>
              LOCK<span style={{ color: '#00C2CB' }}>ITE</span>
            </span>
          </Link>
          <div className="hidden md:flex items-center gap-6">
            <Link href="/spots" className="text-sm transition-colors" style={{ color: '#5A7A8A' }}>Spots</Link>
            <Link href="/map" className="text-sm transition-colors" style={{ color: '#5A7A8A' }}>Karte</Link>
          </div>
          <Link href="/auth/register"
            className="text-sm font-semibold px-4 py-2 rounded-lg"
            style={{ background: 'rgba(0,194,203,0.1)', color: '#00C2CB', border: '1px solid rgba(0,194,203,0.2)' }}>
            Kostenlos starten
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-5xl mx-auto px-6 pt-28 pb-24 relative">
        <div className="absolute left-1/2 top-0 -translate-x-1/2 w-96 h-96 rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(0,194,203,0.06) 0%, transparent 70%)', marginTop: 60 }} />
        <div className="relative max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-widest mb-6" style={{ color: '#00C2CB', letterSpacing: '0.15em' }}>
            Kitesurf Platform
          </p>
          <h1 style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(40px, 6vw, 72px)', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1.05, color: 'white', marginBottom: 24 }}>
            Finde deinen<br />
            <span style={{ color: '#00C2CB' }}>perfekten Spot.</span>
          </h1>
          <p className="text-lg mb-10 max-w-xl leading-relaxed" style={{ color: '#5A7A8A', fontWeight: 300 }}>
            Echtzeit-Winddaten, weltweite Kitesurf-Destinationen und smarte Reiseplanung — in einer Plattform.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/spots"
              className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold"
              style={{ background: '#00C2CB', color: '#07111C', fontFamily: 'Syne, sans-serif' }}>
              Spots entdecken <IconArrow />
            </Link>
            <Link href="/map"
              className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold"
              style={{ border: '1px solid rgba(255,255,255,0.1)', color: '#5A7A8A' }}>
              Karte öffnen
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section style={{ borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-3">
          {[
            { value: `${spotCount}`,   label: 'Destinationen' },
            { value: `${countryCount}`,label: 'Länder' },
            { value: 'Live',           label: 'Wind-Forecast' },
          ].map((s, i) => (
            <div key={s.label} className="py-10 px-6 text-center"
              style={{ borderLeft: i > 0 ? '1px solid rgba(255,255,255,0.06)' : 'none' }}>
              <div style={{ fontFamily: 'Syne, sans-serif', fontSize: 36, fontWeight: 800, letterSpacing: '-0.04em', color: 'white', lineHeight: 1 }}>
                {s.value}
              </div>
              <div className="text-xs mt-2 font-medium" style={{ color: '#5A7A8A', letterSpacing: '0.05em' }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Spot list + features */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: '#5A7A8A', letterSpacing: '0.15em' }}>
              Destinationen
            </p>
            <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: 36, fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1.1, marginBottom: 40 }}>
              Die besten Spots<br />der Welt.
            </h2>
            <div>
              {featured.map(spot => <SpotCard key={spot.id} spot={spot} />)}
            </div>
            <Link href="/spots"
              className="flex items-center gap-2 mt-6 text-sm font-semibold"
              style={{ color: '#00C2CB' }}>
              Alle {spotCount} Destinationen <IconArrow />
            </Link>
          </div>

          <div className="hidden md:block pt-16">
            <div className="sticky top-8 space-y-8">
              {[
                { icon: <IconWind />, title: 'Live Winddaten', desc: 'Echtzeit-Windstärke, Böen, Richtung und 7-Tage-Forecast für jede Destination — direkt vom Wettermodell.' },
                { icon: <IconMap />,  title: 'Interaktive Karte', desc: 'Alle Spots auf einer Karte. Filter nach Level, Spot-Typ und Region. Klick zeigt Live-Wind.' },
                { icon: <IconStar />, title: 'Kite-Optionen', desc: 'Jede Destination zeigt die konkreten Kite-Optionen vor Ort — mit Typ, Level und bester Windrichtung.' },
              ].map(f => (
                <div key={f.title} className="flex gap-4">
                  <div className="mt-0.5 flex-shrink-0" style={{ color: '#00C2CB' }}>{f.icon}</div>
                  <div>
                    <h3 className="text-sm font-semibold text-white mb-1.5">{f.title}</h3>
                    <p className="text-sm leading-relaxed font-light" style={{ color: '#5A7A8A' }}>{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Feature grid */}
      <section style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="max-w-5xl mx-auto px-6 py-20">
          <div className="max-w-lg mb-14">
            <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: '#5A7A8A', letterSpacing: '0.15em' }}>
              Plattform
            </p>
            <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: 36, fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1.1 }}>
              Alles was du brauchst.<br />Nichts was du nicht brauchst.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px" style={{ background: 'rgba(255,255,255,0.06)' }}>
            {[
              { title: 'Wind-Forecast',     desc: 'Aktuelle Wetterdaten von Open-Meteo. Windstärke, Böen, Richtung und 7-Tage-Vorschau für jede Destination.' },
              { title: 'Kite-Optionen',     desc: 'Konkrete Spot-Optionen innerhalb einer Destination — mit Level, Typ und bester Windrichtung.' },
              { title: 'Interaktive Karte', desc: 'Alle Destinationen auf einer übersichtlichen Karte mit Live-Winddaten und Filter-Funktion.' },
              { title: 'Beste Reisezeit',   desc: 'Für jede Destination die optimalen Reisemonate — damit du nie in der falschen Saison anreist.' },
              { title: 'Level-Filter',      desc: 'Beginner, Intermediate oder Pro — filtere Spots nach deinem Erfahrungslevel.' },
              { title: 'Windy-Integration', desc: 'Direktlink zu Windy.com mit den genauen Koordinaten jedes Spots für detailliertere Analysen.' },
            ].map(f => (
              <div key={f.title} className="p-8" style={{ background: '#07111C' }}>
                <div className="mb-3" style={{ color: '#00C2CB' }}><IconCheck /></div>
                <h3 className="text-sm font-semibold text-white mb-2">{f.title}</h3>
                <p className="text-sm leading-relaxed font-light" style={{ color: '#5A7A8A' }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="max-w-5xl mx-auto px-6 py-24 text-center">
          <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: 48, fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1.05, marginBottom: 16 }}>
            Bereit?
          </h2>
          <p className="text-lg mb-10 font-light" style={{ color: '#5A7A8A' }}>
            Kostenlos registrieren — kein Abo, keine Kreditkarte.
          </p>
          <Link href="/auth/register"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-base font-semibold"
            style={{ background: '#00C2CB', color: '#07111C', fontFamily: 'Syne, sans-serif' }}>
            Jetzt starten <IconArrow />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="max-w-5xl mx-auto px-6 py-8 flex items-center justify-between">
          <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 14, color: '#5A7A8A', letterSpacing: '-0.02em' }}>
            LOCK<span style={{ color: '#00C2CB' }}>ITE</span>
          </span>
          <p className="text-xs" style={{ color: '#3A5A6A' }}>© 2025 Lockite</p>
          <div className="flex gap-6">
            {[['Spots', '/spots'], ['Karte', '/map'], ['Login', '/auth/login']].map(([l, h]) => (
              <Link key={h} href={h} className="text-xs" style={{ color: '#3A5A6A' }}>{l}</Link>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
