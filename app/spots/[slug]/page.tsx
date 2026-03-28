'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { MOCK_SPOTS, TYPE_LABELS, LEVEL_LABELS, MONTH_NAMES } from '@/lib/types';
import { useWindData } from '@/lib/wind';

function ForecastBar({ day }: { day: any }) {
  const h = Math.max(4, Math.min(56, Math.round((day.wind_avg_knots / 30) * 56)));
  return (
    <div className="flex-1 flex flex-col items-center gap-1.5">
      <div className="text-[9px] font-semibold uppercase tracking-wide" style={{ color: '#5A7A8A' }}>{day.day_name}</div>
      <div className="h-14 flex items-end w-full">
        <div className="w-full rounded-sm" style={{ height: h, background: day.condition.color }} />
      </div>
      <div className="text-[10px] font-bold text-white">{day.wind_avg_knots}</div>
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
        <div className="text-5xl mb-4">🌊</div>
        <p className="text-white font-bold text-lg mb-4">Spot nicht gefunden.</p>
        <Link href="/spots" style={{ color: '#00C2CB' }}>← Alle Spots</Link>
      </div>
    </div>
  );

  const { data: wind, loading, error } = useWindData(spot.latitude, spot.longitude, spot.id);
  const condColor = wind?.current.condition.color ?? '#0A6EBD';

  const ratings = [
    { label: 'Windqualität',    val: 4 },
    { label: 'Verlässlichkeit', val: 4 },
    { label: 'Crowd',           val: 3 },
    { label: 'Preisniveau',     val: 2 },
    { label: 'Anfänger',        val: spot.level_tags.includes('beginner') ? 5 : 2 },
    { label: 'Gesamt',          val: Math.round(spot.avg_rating) },
  ];

  const windyUrl = `https://www.windy.com/?${spot.latitude},${spot.longitude},10`;

  return (
    <div className="min-h-screen" style={{ background: '#07111C', fontFamily: 'DM Sans, sans-serif' }}>

      {/* Hero */}
      <div className="relative h-64 overflow-hidden">
        <div className="w-full h-full flex items-center justify-center text-7xl"
          style={{ background: 'linear-gradient(135deg, #062A44 0%, #041A2C 100%)' }}>
          🪁
        </div>
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, #07111C, transparent)' }} />
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
          <Link href="/spots"
            className="text-sm font-semibold px-3 py-1.5 rounded-lg"
            style={{ background: 'rgba(7,17,28,0.7)', color: '#00C2CB' }}>
            ← Zurück
          </Link>
          {spot.verified && (
            <span className="text-xs font-bold px-2.5 py-1 rounded-full"
              style={{ background: 'rgba(0,194,203,0.15)', border: '1px solid rgba(0,194,203,0.3)', color: '#00C2CB' }}>
              ✓ Verifiziert
            </span>
          )}
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 pb-24">

        {/* Title */}
        <div className="py-5">
          <p className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: '#5A7A8A' }}>
            {spot.region ? `${spot.region}, ` : ''}{spot.country}
          </p>
          <h1 className="text-4xl font-bold text-white mb-3"
            style={{ fontFamily: 'Syne, sans-serif', letterSpacing: '-0.04em' }}>
            {spot.name}
          </h1>
          <div className="flex flex-wrap gap-2">
            <span className="text-xs font-semibold px-2.5 py-1 rounded"
              style={{ background: 'rgba(10,110,189,0.15)', border: '1px solid rgba(10,110,189,0.3)', color: '#0A6EBD' }}>
              {TYPE_LABELS[spot.type]}
            </span>
            {spot.level_tags.map(l => (
              <span key={l} className="text-xs font-semibold px-2.5 py-1 rounded"
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', color: '#5A7A8A' }}>
                {LEVEL_LABELS[l]}
              </span>
            ))}
            <span className="text-xs font-semibold px-2.5 py-1 rounded flex items-center gap-1"
              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', color: '#5A7A8A' }}>
              <span style={{ color: '#FBBF24' }}>★</span> {spot.avg_rating.toFixed(1)} ({spot.review_count})
            </span>
          </div>
        </div>

        {/* Live Wind */}
        <div className="rounded-xl p-5 mb-4"
          style={{ background: '#0D1E2C', border: `1px solid ${condColor}30`, borderLeft: `3px solid ${condColor}` }}>
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs font-bold uppercase tracking-widest" style={{ color: '#5A7A8A' }}>
              🌬️ Live Wind
            </p>
            {wind && <span className="text-xs font-semibold" style={{ color: '#4ADE80' }}>● Live</span>}
          </div>

          {loading && (
            <div className="animate-pulse space-y-2">
              <div className="h-12 rounded-lg" style={{ background: 'rgba(255,255,255,0.05)' }} />
              <div className="h-4 rounded w-1/2" style={{ background: 'rgba(255,255,255,0.05)' }} />
            </div>
          )}
          {error && <p className="text-sm" style={{ color: '#F87171' }}>Wind-Daten momentan nicht verfügbar.</p>}
          {wind && !loading && (
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-5xl font-bold" style={{ fontFamily: 'Syne, sans-serif', color: condColor }}>
                    {wind.current.wind_speed_knots}
                  </span>
                  <span className="text-xl" style={{ color: '#5A7A8A' }}>kn</span>
                  <span className="text-sm ml-1" style={{ color: '#5A7A8A' }}>
                    {wind.current.wind_direction_label} {wind.current.wind_direction}°
                  </span>
                </div>
                <p className="text-sm mt-1" style={{ color: '#5A7A8A' }}>
                  Böen: {wind.current.wind_gusts_knots} kn · {wind.current.temperature}°C
                </p>
              </div>
              <span className="text-sm font-bold px-3 py-1.5 rounded-full"
                style={{ color: condColor, border: `1px solid ${condColor}`, background: `${condColor}15` }}>
                {wind.current.condition.label}
              </span>
            </div>
          )}

          {/* Windy link */}
          <a href={windyUrl} target="_blank" rel="noopener noreferrer"
            className="mt-4 flex items-center gap-2 text-xs font-semibold py-2 px-3 rounded-lg w-full justify-center"
            style={{ background: 'rgba(0,194,203,0.08)', border: '1px solid rgba(0,194,203,0.2)', color: '#00C2CB' }}>
            🌊 Auf Windy.com öffnen
          </a>
        </div>

        {/* 7-Day Forecast */}
        <div className="rounded-xl p-5 mb-4" style={{ background: '#0D1E2C', border: '1px solid rgba(255,255,255,0.07)' }}>
          <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: '#5A7A8A' }}>📅 7-Tage Forecast</p>
          {loading && <div className="animate-pulse h-20 rounded-lg" style={{ background: 'rgba(255,255,255,0.05)' }} />}
          {wind && !loading && (
            <div className="flex gap-2">
              {wind.daily.map(day => <ForecastBar key={day.date} day={day} />)}
            </div>
          )}
        </div>

        {/* Ratings */}
        <div className="rounded-xl p-5 mb-4" style={{ background: '#0D1E2C', border: '1px solid rgba(255,255,255,0.07)' }}>
          <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: '#5A7A8A' }}>⭐ Bewertungen</p>
          <div className="grid grid-cols-2 gap-4">
            {ratings.map(r => (
              <div key={r.label}>
                <p className="text-xs mb-1.5" style={{ color: '#5A7A8A' }}>{r.label}</p>
                <div className="flex gap-1">
                  {[1,2,3,4,5].map(i => (
                    <div key={i} className="w-2 h-2 rounded-full"
                      style={{ background: i <= r.val ? '#00C2CB' : 'rgba(0,194,203,0.1)' }} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Description */}
        {spot.description && (
          <div className="rounded-xl p-5 mb-4" style={{ background: '#0D1E2C', border: '1px solid rgba(255,255,255,0.07)' }}>
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#5A7A8A' }}>📍 Über den Spot</p>
            <p className="text-sm leading-relaxed font-light" style={{ color: '#5A7A8A' }}>{spot.description}</p>
          </div>
        )}

        {/* Best months */}
        <div className="rounded-xl p-5 mb-6" style={{ background: '#0D1E2C', border: '1px solid rgba(255,255,255,0.07)' }}>
          <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#5A7A8A' }}>📅 Beste Reisezeit</p>
          <div className="flex flex-wrap gap-2">
            {[1,2,3,4,5,6,7,8,9,10,11,12].map(m => (
              <span key={m} className="text-xs font-semibold px-2.5 py-1.5 rounded-lg"
                style={{
                  background: spot.best_months.includes(m) ? 'rgba(0,194,203,0.1)' : 'rgba(255,255,255,0.03)',
                  border: `1px solid ${spot.best_months.includes(m) ? 'rgba(0,194,203,0.4)' : 'rgba(255,255,255,0.07)'}`,
                  color: spot.best_months.includes(m) ? '#00C2CB' : '#5A7A8A',
                }}>
                {MONTH_NAMES[m]}
              </span>
            ))}
          </div>
        </div>

        {/* CTAs */}
        <div className="flex gap-3">
          <a href={`https://www.booking.com/searchresults.html?ss=${encodeURIComponent(spot.name + ' ' + spot.country)}`}
            target="_blank" rel="noopener noreferrer"
            className="flex-[2] py-3.5 rounded-xl font-bold text-sm text-center flex items-center justify-center gap-2"
            style={{ background: '#00C2CB', color: '#07111C', fontFamily: 'Syne, sans-serif' }}>
            🏨 Unterkunft suchen
          </a>
          <Link href="/map"
            className="flex-1 py-3.5 rounded-xl font-bold text-sm text-center flex items-center justify-center"
            style={{ border: '1px solid rgba(0,194,203,0.3)', color: '#00C2CB' }}>
            🗺️ Karte
          </Link>
        </div>
      </div>
    </div>
  );
}
