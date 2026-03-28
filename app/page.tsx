import Link from 'next/link';
import { MOCK_SPOTS } from '@/lib/types';

const spotCount = MOCK_SPOTS.length;
const countryCount = [...new Set(MOCK_SPOTS.map(s => s.country))].length;

function IconWind() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2"/>
      <path d="M9.6 4.6A2 2 0 1 1 11 8H2"/>
      <path d="M12.6 19.4A2 2 0 1 0 14 16H2"/>
    </svg>
  );
}
function IconMap() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"/>
      <line x1="9" y1="3" x2="9" y2="18"/>
      <line x1="15" y1="6" x2="15" y2="21"/>
    </svg>
  );
}
function IconStar() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
    </svg>
  );
}
function IconArrow() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12"/>
      <polyline points="12 5 19 12 12 19"/>
    </svg>
  );
}
function IconCheck() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  );
}

function SpotRow({ spot }: { spot: typeof MOCK_SPOTS[0] }) {
  return (
    <Link href={`/spots/${spot.slug}`}
      className="group flex items-center justify-between py-4 border-b last:border-0 transition-all"
      style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
      <div className="min-w-0 flex-1 pr-4">
        <p className="text-xs font-medium truncate" style={{ color: '#5A7A8A', letterSpacing: '0.04em' }}>
          {spot.country}
        </p>
        <h3 className="text-sm font-semibold text-white mt-0.5 group-hover:text-cyan-400 transition-colors truncate"
          style={{ fontFamily: 'Syne, sans-serif', letterSpacing: '-0.02em' }}>
          {spot.name}
        </h3>
      </div>
      <div className="flex items-center gap-3 flex-shrink-0">
        <span className="text-xs hidden sm:block" style={{ color: '#3A5A6A' }}>
          {spot.options?.length ?? 0} Optionen
        </span>
        <span className="text-xs font-medium" style={{ color: '#5A7A8A' }}>
          {spot.avg_rating.toFixed(1)}
        </span>
        <span className="opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: '#00C2CB' }}>
          <IconArrow />
        </span>
      </div>
    </Link>
  );
}

export default async function HomePage() {
  const featured = MOCK_SPOTS.slice(0, 6);

  return (
    <div style={{ background: '#07111C', fontFamily: 'DM Sans, sans-serif', color: 'white', minHeight: '100vh' }}>

      {/* Nav */}
      <nav style={{ borderBottom: '1px solid rgba(255,255,255,0.06)', position: 'sticky', top: 0, zIndex: 50, backdropFilter: 'blur(20px)', background: 'rgba(7,17,28,0.9)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 20px', height: 56, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link href="/">
            <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 17, letterSpacing: '-0.04em' }}>
              LOCK<span style={{ color: '#00C2CB' }}>ITE</span>
            </span>
          </Link>
          <div className="hidden md:flex items-center gap-8">
            {[['Spots', '/spots'], ['Karte', '/map'], ['Login', '/auth/login']].map(([l, h]) => (
              <Link key={h} href={h} style={{ color: '#5A7A8A', fontSize: 14 }}>{l}</Link>
            ))}
          </div>
          <Link href="/auth/register"
            style={{ background: 'rgba(0,194,203,0.1)', color: '#00C2CB', border: '1px solid rgba(0,194,203,0.2)', fontSize: 13, fontWeight: 600, padding: '8px 16px', borderRadius: 10 }}>
            Starten
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section style={{ maxWidth: 1100, margin: '0 auto', padding: 'clamp(60px, 10vw, 120px) 20px clamp(48px, 8vw, 96px)', position: 'relative' }}>
        <div style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', width: 600, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,194,203,0.05) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#00C2CB', marginBottom: 20 }}>
          Kitesurf Platform
        </p>
        <h1 style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(36px, 7vw, 76px)', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1.04, color: 'white', marginBottom: 20, maxWidth: 800 }}>
          Finde deinen<br />
          <span style={{ color: '#00C2CB' }}>perfekten Spot.</span>
        </h1>
        <p style={{ fontSize: 'clamp(15px, 2vw, 18px)', color: '#5A7A8A', fontWeight: 300, lineHeight: 1.7, maxWidth: 520, marginBottom: 36 }}>
          Echtzeit-Winddaten, weltweite Kitesurf-Destinationen und smarte Reiseplanung — in einer Plattform.
        </p>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <Link href="/spots"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 24px', borderRadius: 12, background: '#00C2CB', color: '#07111C', fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 14 }}>
            Spots entdecken <IconArrow />
          </Link>
          <Link href="/map"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 24px', borderRadius: 12, border: '1px solid rgba(255,255,255,0.1)', color: '#5A7A8A', fontSize: 14, fontWeight: 500 }}>
            Karte öffnen
          </Link>
        </div>
      </section>

      {/* Stats */}
      <section style={{ borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 20px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)' }}>
          {[
            { value: `${spotCount}`,    label: 'Destinationen' },
            { value: `${countryCount}`, label: 'Länder' },
            { value: 'Live',            label: 'Wind-Forecast' },
          ].map((s, i) => (
            <div key={s.label} style={{ padding: 'clamp(24px, 4vw, 40px) 16px', textAlign: 'center', borderLeft: i > 0 ? '1px solid rgba(255,255,255,0.06)' : 'none' }}>
              <div style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(26px, 4vw, 40px)', fontWeight: 800, letterSpacing: '-0.04em', color: 'white', lineHeight: 1 }}>
                {s.value}
              </div>
              <div style={{ fontSize: 11, marginTop: 8, fontWeight: 500, color: '#5A7A8A', letterSpacing: '0.06em' }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Spots + Features */}
      <section style={{ maxWidth: 1100, margin: '0 auto', padding: 'clamp(48px, 6vw, 80px) 20px' }}>
        <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: 'clamp(40px, 6vw, 80px)' }}>
          <div>
            <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#5A7A8A', marginBottom: 12 }}>
              Destinationen
            </p>
            <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(26px, 4vw, 36px)', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1.1, marginBottom: 32 }}>
              Die besten Spots<br />der Welt.
            </h2>
            {featured.map(spot => <SpotRow key={spot.id} spot={spot} />)}
            <Link href="/spots"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 6, marginTop: 20, fontSize: 13, fontWeight: 600, color: '#00C2CB' }}>
              Alle {spotCount} Destinationen <IconArrow />
            </Link>
          </div>
          <div className="hidden sm:flex flex-col justify-center" style={{ gap: 32 }}>
            {[
              { icon: <IconWind />, title: 'Live Winddaten',    desc: 'Echtzeit-Windstärke, Böen, Richtung und 7-Tage-Forecast für jede Destination — direkt vom Wettermodell.' },
              { icon: <IconMap />,  title: 'Interaktive Karte', desc: 'Alle Spots auf einer Karte mit Live-Wind. Filter nach Level, Typ und Region.' },
              { icon: <IconStar />, title: 'Kite-Optionen',     desc: 'Jede Destination zeigt konkrete Optionen vor Ort — mit Typ, Level und bester Windrichtung.' },
            ].map(f => (
              <div key={f.title} style={{ display: 'flex', gap: 16 }}>
                <div style={{ color: '#00C2CB', flexShrink: 0, marginTop: 2 }}>{f.icon}</div>
                <div>
                  <h3 style={{ fontSize: 14, fontWeight: 600, color: 'white', marginBottom: 6 }}>{f.title}</h3>
                  <p style={{ fontSize: 13, lineHeight: 1.65, color: '#5A7A8A', fontWeight: 300 }}>{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature grid */}
      <section style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: 'clamp(48px, 6vw, 80px) 20px' }}>
          <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#5A7A8A', marginBottom: 12 }}>
            Plattform
          </p>
          <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(26px, 4vw, 36px)', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1.1, marginBottom: 40 }}>
            Alles was du brauchst.
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3" style={{ gap: 1, background: 'rgba(255,255,255,0.06)', borderRadius: 16, overflow: 'hidden' }}>
            {[
              { title: 'Wind-Forecast',     desc: 'Windstärke, Böen, Richtung und 7-Tage-Vorschau für jede Destination.' },
              { title: 'Kite-Optionen',     desc: 'Konkrete Spot-Optionen mit Level, Typ und bester Windrichtung.' },
              { title: 'Interaktive Karte', desc: 'Alle Destinationen mit Live-Winddaten und Filterfunktion.' },
              { title: 'Beste Reisezeit',   desc: 'Optimale Reisemonate für jede Destination.' },
              { title: 'Level-Filter',      desc: 'Beginner, Intermediate oder Pro — passende Spots sofort.' },
              { title: 'Windy-Integration', desc: 'Direktlink zu Windy.com mit genauen Koordinaten.' },
            ].map(f => (
              <div key={f.title} style={{ background: '#07111C', padding: 'clamp(20px, 3vw, 32px)' }}>
                <div style={{ color: '#00C2CB', marginBottom: 12 }}><IconCheck /></div>
                <h3 style={{ fontSize: 14, fontWeight: 600, color: 'white', marginBottom: 8 }}>{f.title}</h3>
                <p style={{ fontSize: 13, lineHeight: 1.65, color: '#5A7A8A', fontWeight: 300 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: 'clamp(60px, 8vw, 100px) 20px', textAlign: 'center' }}>
          <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1.05, marginBottom: 14 }}>
            Bereit?
          </h2>
          <p style={{ fontSize: 16, color: '#5A7A8A', fontWeight: 300, marginBottom: 36 }}>
            Kostenlos registrieren — kein Abo, keine Kreditkarte.
          </p>
          <Link href="/auth/register"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '14px 32px', borderRadius: 12, background: '#00C2CB', color: '#07111C', fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 15 }}>
            Jetzt starten <IconArrow />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '24px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 14, color: '#5A7A8A', letterSpacing: '-0.02em' }}>
            LOCK<span style={{ color: '#00C2CB' }}>ITE</span>
          </span>
          <p style={{ fontSize: 12, color: '#3A5A6A' }}>© 2025 Lockite</p>
          <div style={{ display: 'flex', gap: 20 }}>
            {[['Spots', '/spots'], ['Karte', '/map'], ['Login', '/auth/login']].map(([l, h]) => (
              <Link key={h} href={h} style={{ fontSize: 12, color: '#3A5A6A' }}>{l}</Link>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
