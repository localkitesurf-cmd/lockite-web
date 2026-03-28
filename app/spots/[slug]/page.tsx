'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { MOCK_SPOTS, TYPE_LABELS, TYPE_ICONS, LEVEL_LABELS, MONTH_NAMES, WIND_COLORS, WIND_LABELS } from '@/lib/types';
import { useWindData } from '@/lib/wind';
import type { KiteOption } from '@/lib/types';

function LiveBadge() {
  return (
    <span className="flex items-center gap-1.5 text-xs font-semibold" style={{ color: '#4ADE80' }}>
      <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#4ADE80' }} />
      LIVE
    </span>
  );
}

function ForecastBar({ day }: { day: any }) {
  const h = Math.max(4, Math.min(56, Math.round((day.wind_avg_knots / 35) * 56)));
  return (
    <div className="flex-1 flex flex-col items-center gap-1.5">
      <div className="text-[9px] font-semibold uppercase tracking-wider" style={{ color: '#5A7A8A' }}>
        {day.day_name}
      </div>
      <div className="h-14 flex items-end w-full px-0.5">
        <div className="w-full rounded-sm" style={{ height: h, background: day.condition.color }} />
      </div>
      <div className="text-[10px] font-bold text-white">{day.wind_avg_knots}</div>
    </div>
  );
}

function KiteOptionCard({ option }: { option: KiteOption }) {
  return (
    <div className="relative overflow-hidden rounded-2xl border transition-all duration-300 hover:border-cyan/40 group"
      style={{ background: 'linear-gradient(135deg, #0D1E2C 0%, #0e2030 100%)', borderColor: 'rgba(255,255,255,0.07)' }}>
      <div className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity"
        style={{ background: 'linear-gradient(90deg, transparent, #00C2CB, transparent)' }} />
      <div className="p-5">
        <div className="flex items-start justify-between mb-3">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-lg">{TYPE_ICONS[option.type]}</span>
              <h3 className="font-bold text-white text-base" style={{ fontFamily: 'Syne, sans-serif', letterSpacing: '-0.02em' }}>
                {option.name}
              </h3>
            </div>
            <div className="flex flex-wrap gap-1.5">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full"
                style={{ background: 'rgba(10,110,189,0.2)', border: '1px solid rgba(10,110,189,0.4)', color: '#0A6EBD' }}>
                {TYPE_LABELS[option.type]}
              </span>
              {option.level_tags.map(l => (
                <span key={l} className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full"
                  style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#5A7A8A' }}>
                  {LEVEL_LABELS[l]}
                </span>
              ))}
            </div>
          </div>
          <div className="flex flex-col items-end gap-1">
            {option.wind_directions.map(d => (
              <span key={d} className="text-[10px] font-bold px-1.5 py-0.5 rounded"
                style={{ background: 'rgba(0,194,203,0.1)', color: '#00C2CB', border: '1px solid rgba(0,194,203,0.2)' }}>
                {d}
              </span>
            ))}
          </div>
        </div>
        <p className="text-sm leading-relaxed font-light" style={{ color: '#7A9AAA' }}>
          {option.description}
        </p>
      </div>
    </div>
  );
}

function RatingDots({ value }: { value: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }, (_, i) => (
        <div key={i} className="w-2 h-2 rounded-full"
          style={{ background: i < value ? '#00C2CB' : 'rgba(0,194,203,0.12)' }} />
      ))}
    </div>
  );
}

export default function SpotDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const spot = MOCK_SPOTS.find(s => s.slug === slug);

  if (!spot) return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: '#07111C' }}>
      <div className="text-center">
        <div className="text-6xl mb-6">🌊</div>
        <p className="text-white font-bold text-xl mb-2">Destination nicht gefunden.</p>
        <Link href="/spots" style={{ color: '#00C2CB' }} className="text-sm hover:underline">← Alle Spots</Link>
      </div>
    </div>
  );

  const { data: wind, loading, error } = useWindData(spot.latitude, spot.longitude, spot.id);
  const condColor = wind?.current.condition.color ?? '#0A6EBD';
  const windyUrl = `https://www.windy.com/?${spot.latitude},${spot.longitude},10`;

  const ratings = [
    { label: 'Windqualität',    val: Math.round(spot.avg_rating) },
    { label: 'Verlässlichkeit', val: Math.min(5, Math.round(spot.avg_rating + 0.2)) },
    { label: 'Crowd',           val: Math.max(1, Math.round(spot.avg_rating - 1)) },
    { label: 'Anfänger',        val: spot.level_tags.includes('beginner') ? 5 : 2 },
    { label: 'Preisniveau',     val: 3 },
    { label: 'Gesamt',          val: Math.round(spot.avg_rating) },
  ];

  return (
    <div className="min-h-screen" style={{ background: '#07111C', fontFamily: 'DM Sans, sans-serif' }}>

      {/* Hero */}
      <div className="relative h-72 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center text-8xl"
          style={{ background: 'linear-gradient(135deg, #051525 0%, #07111C 50%, #0a1a2a 100%)' }}>
          🪁
        </div>
        <div className="absolute inset-0"
          style={{ background: 'radial-gradient(ellipse at 30% 50%, rgba(0,194,203,0.08) 0%, transparent 60%)' }} />
        <div className="absolute inset-0"
          style={{ background: 'linear-gradient(to top, #07111C 0%, transparent 60%)' }} />
        <div className="absolute top-0 left-0 right-0 flex items-center justify-between p-4" style={{ paddingTop: '52px' }}>
          <Link href="/spots"
            className="flex items-center gap-2 text-sm font-semibold px-3 py-2 rounded-xl backdrop-blur-sm"
            style={{ background: 'rgba(7,17,28,0.7)', color: '#00C2CB', border: '1px solid rgba(0,194,203,0.2)' }}>
            ← Spots
          </Link>
          {spot.verified && (
            <span className="text-xs font-bold px-3 py-1.5 rounded-full backdrop-blur-sm"
              style={{ background: 'rgba(0,194,203,0.15)', border: '1px solid rgba(0,194,203,0.3)', color: '#00C2CB' }}>
              ✓ Verifiziert
            </span>
          )}
        </div>
        <div className="absolute bottom-0 left-0 right-0 px-4 pb-5">
          <p className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: '#5A7A8A' }}>
            {spot.region ? `${spot.region} · ` : ''}{spot.country}
          </p>
          <h1 className="text-4xl font-bold text-white" style={{ fontFamily: 'Syne, sans-serif', letterSpacing: '-0.04em' }}>
            {spot.name}
          </h1>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 pb-32">

        {/* Tags + rating */}
        <div className="flex flex-wrap items-center gap-2 py-4 border-b" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
          <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full"
            style={{ background: 'rgba(10,110,189,0.15)', border: '1px solid rgba(10,110,189,0.3)', color: '#0A6EBD' }}>
            {TYPE_ICONS[spot.type]} {TYPE_LABELS[spot.type]}
          </span>
          {spot.level_tags.map(l => (
            <span key={l} className="text-xs font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full"
              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', color: '#5A7A8A' }}>
              {LEVEL_LABELS[l]}
            </span>
          ))}
          <div className="ml-auto flex items-center gap-1.5">
            <span style={{ color: '#FBBF24' }}>★</span>
            <span className="font-bold text-white">{spot.avg_rating.toFixed(1)}</span>
            <span className="text-xs" style={{ color: '#5A7A8A' }}>({spot.review_count})</span>
          </div>
        </div>

        {/* Description */}
        <p className="py-5 text-sm leading-relaxed font-light" style={{ color: '#7A9AAA' }}>
          {spot.description}
        </p>

        {/* Live Wind */}
        <div className="rounded-2xl p-5 mb-4"
          style={{ background: 'linear-gradient(135deg, #0D1E2C 0%, #0e2030 100%)', border: `1px solid ${condColor}25`, borderLeft: `3px solid ${condColor}` }}>
          <div className="flex items-center justify-between mb-4">
            <p className="text-xs font-bold uppercase tracking-widest" style={{ color: '#5A7A8A' }}>
              🌬️ Live Wind — {spot.name}
            </p>
            {wind && <LiveBadge />}
          </div>
          {loading && (
            <div className="space-y-3 animate-pulse">
              <div className="h-14 rounded-xl" style={{ background: 'rgba(255,255,255,0.04)' }} />
              <div className="h-4 rounded w-1/3" style={{ background: 'rgba(255,255,255,0.04)' }} />
            </div>
          )}
          {error && <p className="text-sm py-2" style={{ color: '#F87171' }}>Wind-Daten nicht verfügbar.</p>}
          {wind && !loading && (
            <>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="font-bold leading-none" style={{ fontFamily: 'Syne, sans-serif', color: condColor, fontSize: 56, letterSpacing: '-3px' }}>
                      {wind.current.wind_speed_knots}
                    </span>
                    <div>
                      <div className="text-lg font-light" style={{ color: '#5A7A8A' }}>kn</div>
                      <div className="text-sm" style={{ color: '#5A7A8A' }}>
                        {wind.current.wind_direction_label} · {wind.current.wind_direction}°
                      </div>
                    </div>
                  </div>
                  <p className="text-sm mt-1" style={{ color: '#5A7A8A' }}>
                    Böen {wind.current.wind_gusts_knots} kn · {wind.current.temperature}°C
                  </p>
                </div>
                <span className="text-sm font-bold px-4 py-2 rounded-full"
                  style={{ color: condColor, border: `1px solid ${condColor}50`, background: `${condColor}12` }}>
                  {wind.current.condition.label}
                </span>
              </div>
              <div className="pt-4 border-t" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
                <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: '#5A7A8A' }}>
                  7-Tage Forecast
                </p>
                <div className="flex gap-1.5">
                  {wind.daily.map(day => <ForecastBar key={day.date} day={day} />)}
                </div>
              </div>
              <a href={windyUrl} target="_blank" rel="noopener noreferrer"
                className="mt-4 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-semibold"
                style={{ background: 'rgba(0,194,203,0.06)', border: '1px solid rgba(0,194,203,0.15)', color: '#00C2CB' }}>
                🌊 Auf Windy.com öffnen
              </a>
            </>
          )}
        </div>

        {/* Kite Options */}
        {spot.options && spot.options.length > 0 && (
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.06)' }} />
              <p className="text-xs font-bold uppercase tracking-widest px-3" style={{ color: '#00C2CB' }}>
                {spot.options.length} Kite-Optionen
              </p>
              <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.06)' }} />
            </div>
            <div className="grid grid-cols-1 gap-3">
              {spot.options.map(option => (
                <KiteOptionCard key={option.name} option={option} />
              ))}
            </div>
          </div>
        )}

        {/* Beste Reisezeit */}
        <div className="rounded-2xl p-5 mb-4"
          style={{ background: 'linear-gradient(135deg, #0D1E2C 0%, #0e2030 100%)', border: '1px solid rgba(255,255,255,0.07)' }}>
          <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: '#5A7A8A' }}>
            📅 Beste Reisezeit
          </p>
          <div className="flex flex-wrap gap-2">
            {[1,2,3,4,5,6,7,8,9,10,11,12].map(m => (
              <span key={m} className="text-xs font-semibold px-3 py-1.5 rounded-lg"
                style={{
                  background: spot.best_months.includes(m) ? 'rgba(0,194,203,0.12)' : 'rgba(255,255,255,0.03)',
                  border: `1px solid ${spot.best_months.includes(m) ? 'rgba(0,194,203,0.4)' : 'rgba(255,255,255,0.07)'}`,
                  color: spot.best_months.includes(m) ? '#00C2CB' : '#5A7A8A',
                  fontWeight: spot.best_months.includes(m) ? '700' : '400',
                }}>
                {MONTH_NAMES[m]}
              </span>
            ))}
          </div>
        </div>

        {/* Ratings */}
        <div className="rounded-2xl p-5 mb-6"
          style={{ background: 'linear-gradient(135deg, #0D1E2C 0%, #0e2030 100%)', border: '1px solid rgba(255,255,255,0.07)' }}>
          <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: '#5A7A8A' }}>⭐ Bewertung</p>
          <div className="grid grid-cols-2 gap-5">
            {ratings.map(r => (
              <div key={r.label}>
                <p className="text-xs mb-2 font-medium" style={{ color: '#5A7A8A' }}>{r.label}</p>
                <RatingDots value={r.val} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="fixed bottom-0 left-0 right-0 px-4 py-4"
        style={{ background: 'rgba(7,17,28,0.95)', backdropFilter: 'blur(20px)', borderTop: '1px solid rgba(255,255,255,0.07)' }}>
        <div className="max-w-3xl mx-auto flex gap-3">
          <a href={`https://www.booking.com/searchresults.html?ss=${encodeURIComponent(spot.name + ' ' + spot.country)}`}
            target="_blank" rel="noopener noreferrer"
            className="flex-[2] py-3.5 rounded-xl font-bold text-sm text-center flex items-center justify-center gap-2"
            style={{ background: 'linear-gradient(135deg, #0A6EBD, #00C2CB)', color: 'white', fontFamily: 'Syne, sans-serif' }}>
            🏨 Unterkunft suchen
          </a>
          <Link href="/map"
            className="flex-1 py-3.5 rounded-xl font-bold text-sm text-center flex items-center justify-center"
            style={{ border: '1px solid rgba(0,194,203,0.3)', color: '#00C2CB', background: 'rgba(0,194,203,0.06)' }}>
            🗺️ Karte
          </Link>
        </div>
      </div>
    </div>
  );
}
