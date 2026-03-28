import { notFound } from 'next/navigation';
import { Navbar } from '@/components/ui/Navbar';
import { ForecastChart, WindRow } from '@/components/spot/ForecastChart';
import { getSession } from '@/lib/supabase';
import { MOCK_SPOTS, MOCK_FORECAST, WIND_COLORS, WIND_LABELS, TYPE_LABELS, LEVEL_LABELS, MONTH_NAMES } from '@/lib/types';
import type { Metadata } from 'next';

// Generate SEO metadata per spot
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const spot = MOCK_SPOTS.find(s => s.slug === params.slug);
  if (!spot) return {};
  return {
    title: `${spot.name}, ${spot.country} — Kitesurf Spot`,
    description: spot.description ?? `Kitesurf-Spot in ${spot.region ?? spot.country}. Live-Wind, Forecast und Bewertungen auf Lockite.`,
    openGraph: {
      title: `${spot.name} — Lockite`,
      description: spot.description ?? '',
      images: spot.photo_urls[0] ? [{ url: spot.photo_urls[0] }] : [],
    },
  };
}

// Pre-generate all spot pages at build time (SSG)
export async function generateStaticParams() {
  return MOCK_SPOTS.map(s => ({ slug: s.slug }));
}

// Mock 7-day forecast
const MOCK_DAILY = [
  { date:'2025-03-24', day_name:'Mo', wind_avg_knots:12, wind_max_knots:16, temperature_max:22, temperature_min:16, condition:{ score:'light' as const, label:'Leicht', color:'#FBBF24' } },
  { date:'2025-03-25', day_name:'Di', wind_avg_knots:19, wind_max_knots:24, temperature_max:23, temperature_min:17, condition:{ score:'good'  as const, label:'Gut',    color:'#4ADE80' } },
  { date:'2025-03-26', day_name:'Mi', wind_avg_knots:22, wind_max_knots:28, temperature_max:24, temperature_min:18, condition:{ score:'great' as const, label:'Perfekt ✓', color:'#00C2CB' } },
  { date:'2025-03-27', day_name:'Do', wind_avg_knots:21, wind_max_knots:26, temperature_max:24, temperature_min:18, condition:{ score:'great' as const, label:'Perfekt ✓', color:'#00C2CB' } },
  { date:'2025-03-28', day_name:'Fr', wind_avg_knots:17, wind_max_knots:22, temperature_max:23, temperature_min:17, condition:{ score:'good'  as const, label:'Gut',    color:'#4ADE80' } },
  { date:'2025-03-29', day_name:'Sa', wind_avg_knots:10, wind_max_knots:14, temperature_max:21, temperature_min:15, condition:{ score:'light' as const, label:'Leicht', color:'#FBBF24' } },
  { date:'2025-03-30', day_name:'So', wind_avg_knots:20, wind_max_knots:25, temperature_max:23, temperature_min:17, condition:{ score:'good'  as const, label:'Gut',    color:'#4ADE80' } },
];

export default async function SpotDetailPage({ params }: { params: { slug: string } }) {
  const spot = MOCK_SPOTS.find(s => s.slug === params.slug);
  if (!spot) notFound();

  const session = await getSession().catch(() => null);
  const current = MOCK_FORECAST[spot.id];
  const condColor = current ? WIND_COLORS[current.condition.score] : '#5A7A8A';

  const ratings = [
    { label:'Windqualität', val:4 },
    { label:'Verlässlichkeit', val:4 },
    { label:'Crowd', val:3 },
    { label:'Preisniveau', val:2 },
    { label:'Anfänger', val:spot.level_tags.includes('beginner') ? 5 : 2 },
    { label:'Gesamt', val:Math.round(spot.avg_rating) },
  ];

  return (
    <div className="min-h-screen bg-ink">
      <Navbar session={session} />

      {/* Hero */}
      <div className="relative h-72 sm:h-96 mt-16 overflow-hidden">
        {spot.photo_urls[0] ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={spot.photo_urls[0]} alt={spot.name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-ocean/30 via-card to-ink flex items-center justify-center text-8xl">
            🪁
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
      </div>

      <main className="max-w-5xl mx-auto px-4 pb-24 -mt-16 relative">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* ── Left column ─────────────────────────────────── */}
          <div className="lg:col-span-2 space-y-6">

            {/* Title */}
            <div>
              {spot.verified && (
                <div className="flex items-center gap-1.5 mb-2">
                  <span className="text-cyan text-xs">✓</span>
                  <span className="text-xs font-semibold text-cyan">Verifizierter Spot</span>
                </div>
              )}
              <h1 className="text-4xl sm:text-5xl font-bold text-white leading-none mb-2"
                style={{ fontFamily: 'Syne, sans-serif', letterSpacing: '-0.04em' }}>
                {spot.name}
              </h1>
              <p className="text-dim">📍 {spot.region ? `${spot.region}, ` : ''}{spot.country}</p>

              <div className="flex flex-wrap gap-2 mt-4">
                <span className="badge-ocean">{TYPE_LABELS[spot.type]}</span>
                {spot.level_tags.map(l => <span key={l} className="badge-dim">{LEVEL_LABELS[l]}</span>)}
                <span className="flex items-center gap-1 badge-dim">
                  <span className="text-yellow-400">★</span>
                  {spot.avg_rating.toFixed(1)} ({spot.review_count})
                </span>
              </div>
            </div>

            {/* Live Wind */}
            {current && (
              <div className="card p-5" style={{ borderLeftColor: condColor, borderLeftWidth: 3 }}>
                <p className="section-eyebrow">Live Wind</p>
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-5xl font-bold" style={{ fontFamily: 'Syne, sans-serif', color: condColor }}>
                        {current.wind_speed_knots}
                      </span>
                      <span className="text-xl text-dim">kn</span>
                      <span className="text-dim text-sm ml-1">{current.wind_direction_label}</span>
                    </div>
                    <p className="text-dim text-sm mt-1">Böen: {current.wind_gusts_knots} kn · {current.temperature}°C</p>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-bold px-3 py-1.5 rounded-full border"
                      style={{ color: condColor, borderColor: condColor, background: `${condColor}15` }}>
                      {WIND_LABELS[current.condition.score]}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* 7-day forecast */}
            <div className="card p-5">
              <p className="section-eyebrow">7-Tage Forecast</p>
              <ForecastChart days={MOCK_DAILY} />
            </div>

            {/* Description */}
            {spot.description && (
              <div className="card p-5">
                <p className="section-eyebrow">Über den Spot</p>
                <p className="text-dim leading-relaxed font-light">{spot.description}</p>
              </div>
            )}

            {/* Best months */}
            <div className="card p-5">
              <p className="section-eyebrow">Beste Reisezeit</p>
              <div className="flex flex-wrap gap-2">
                {Array.from({ length: 12 }, (_, i) => i + 1).map(m => (
                  <span key={m} className={`text-xs font-semibold px-3 py-1.5 rounded-lg border transition-colors ${
                    spot.best_months.includes(m)
                      ? 'bg-cyan/10 border-cyan/40 text-cyan'
                      : 'bg-white/[0.03] border-white/[0.07] text-dim'
                  }`}>
                    {MONTH_NAMES[m]}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* ── Right column (sidebar) ───────────────────────── */}
          <div className="space-y-4">

            {/* Ratings */}
            <div className="card p-5">
              <p className="section-eyebrow">Bewertungen</p>
              {ratings.map(r => (
                <div key={r.label} className="flex items-center justify-between py-2.5 border-b border-white/[0.05] last:border-0">
                  <span className="text-dim text-sm">{r.label}</span>
                  <div className="flex gap-1">
                    {Array.from({ length: 5 }, (_, i) => (
                      <div key={i} className="w-2 h-2 rounded-full"
                        style={{ background: i < r.val ? '#00C2CB' : 'rgba(0,194,203,0.15)' }} />
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Wind details */}
            {current && (
              <div className="card p-5">
                <p className="section-eyebrow">Wind Details</p>
                <WindRow label="Windstärke"  value={`${current.wind_speed_knots} kn`} color={condColor} />
                <WindRow label="Böen"        value={`${current.wind_gusts_knots} kn`} />
                <WindRow label="Richtung"    value={`${current.wind_direction_label} · ${current.wind_direction}°`} />
                <WindRow label="Temperatur"  value={`${current.temperature}°C`} />
              </div>
            )}

            {/* CTAs */}
            <div className="flex flex-col gap-2">
              <a href={`https://www.booking.com/searchresults.html?ss=${encodeURIComponent(spot.name)}`}
                target="_blank" rel="noopener noreferrer" className="btn-primary w-full">
                🏨 Unterkunft suchen
              </a>
              <button className="btn-secondary w-full">🏫 Kiteschulen</button>
            </div>

            {/* Wind directions */}
            {spot.wind_directions.length > 0 && (
              <div className="card p-5">
                <p className="section-eyebrow">Ideale Windrichtungen</p>
                <div className="flex flex-wrap gap-2">
                  {spot.wind_directions.map(d => (
                    <span key={d} className="badge-cyan">{d}</span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
