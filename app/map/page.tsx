'use client';

import { useEffect, useRef, useState } from 'react';
import { MOCK_SPOTS, MOCK_FORECAST, WIND_COLORS, WIND_LABELS, TYPE_LABELS, LEVEL_LABELS, type Spot } from '@/lib/types';
import Link from 'next/link';

export default function MapPage() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);
  const [selected, setSelected] = useState<Spot | null>(MOCK_SPOTS[0]);
  const [filter, setFilter] = useState<'all' | 'flat' | 'wave' | 'hybrid'>('all');
  const [loaded, setLoaded] = useState(false);

  const spots = filter === 'all' ? MOCK_SPOTS : MOCK_SPOTS.filter(s => s.type === filter);

  useEffect(() => {
    if (mapRef.current || !mapContainer.current) return;

    const key = process.env.NEXT_PUBLIC_MAPTILER_KEY;

    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://cdn.maptiler.com/maptiler-sdk-js/v2.0.3/maptiler-sdk.css';
    document.head.appendChild(link);

    const script = document.createElement('script');
    script.src = 'https://cdn.maptiler.com/maptiler-sdk-js/v2.0.3/maptiler-sdk.umd.min.js';
    script.onload = () => {
      const maptilersdk = (window as any).maptilersdk;
      maptilersdk.config.apiKey = key;

      const map = new maptilersdk.Map({
        container: mapContainer.current,
        style: maptilersdk.MapStyle.DATAVIZ.DARK,
        center: [10, 20],
        zoom: 2,
        attributionControl: false,
      });

      mapRef.current = map;

      map.on('load', () => {
        setLoaded(true);

        MOCK_SPOTS.forEach(spot => {
          const forecast = MOCK_FORECAST[spot.id];
          const color = forecast ? WIND_COLORS[forecast.condition.score] : '#0A6EBD';

          const el = document.createElement('div');
          el.style.cssText = `
            display: flex; flex-direction: column; align-items: center;
            cursor: pointer; transform-origin: bottom center;
            transition: transform 0.2s;
          `;

          const label = document.createElement('div');
          label.style.cssText = `
            background: #0D1E2C; border: 1px solid ${color}50;
            color: ${color}; font-size: 11px; font-weight: 700;
            padding: 3px 8px; border-radius: 4px; white-space: nowrap;
            margin-bottom: 3px; box-shadow: 0 4px 12px rgba(0,0,0,0.5);
            font-family: 'Syne', sans-serif;
          `;
          label.textContent = forecast ? `${forecast.wind_speed_knots} kn` : spot.name;

          const dot = document.createElement('div');
          dot.style.cssText = `
            width: 12px; height: 12px; border-radius: 50%;
            background: ${color}; border: 2px solid rgba(255,255,255,0.8);
            box-shadow: 0 0 0 3px ${color}30;
          `;

          const tail = document.createElement('div');
          tail.style.cssText = `
            width: 0; height: 0;
            border-left: 4px solid transparent;
            border-right: 4px solid transparent;
            border-top: 5px solid ${color};
            margin-top: -1px;
          `;

          el.appendChild(label);
          el.appendChild(dot);
          el.appendChild(tail);

          el.addEventListener('mouseenter', () => { el.style.transform = 'scale(1.15)'; });
          el.addEventListener('mouseleave', () => { el.style.transform = 'scale(1)'; });
          el.addEventListener('click', () => {
            setSelected(spot);
            map.flyTo({ center: [spot.longitude, spot.latitude - 8], zoom: 5, duration: 800 });
          });

          new maptilersdk.Marker({ element: el, anchor: 'bottom' })
            .setLngLat([spot.longitude, spot.latitude])
            .addTo(map);
        });
      });
    };

    document.head.appendChild(script);

    return () => {
      if (mapRef.current) { mapRef.current.remove(); mapRef.current = null; }
    };
  }, []);

  const current = selected ? MOCK_FORECAST[selected.id] : null;
  const condColor = current ? WIND_COLORS[current.condition.score] : '#0A6EBD';

  return (
    <div className="fixed inset-0 bg-ink flex flex-col" style={{ fontFamily: 'DM Sans, sans-serif' }}>
      <div className="flex items-center justify-between px-4 h-14 border-b border-white/[0.07] bg-ink/95 backdrop-blur-xl z-20 flex-shrink-0">
        <Link href="/" className="font-bold text-lg text-white" style={{ fontFamily: 'Syne, sans-serif', letterSpacing: '-0.04em' }}>
          LOCK<span style={{ color: '#00C2CB' }}>ITE</span>
        </Link>
        <div className="flex gap-1.5">
          {(['all', 'flat', 'wave', 'hybrid'] as const).map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className="px-3 py-1.5 rounded-full text-xs font-semibold transition-all"
              style={{
                background: filter === f ? 'rgba(0,194,203,0.15)' : 'rgba(255,255,255,0.05)',
                border: `1px solid ${filter === f ? '#00C2CB' : 'rgba(255,255,255,0.1)'}`,
                color: filter === f ? '#00C2CB' : '#5A7A8A',
              }}>
              {f === 'all' ? 'Alle' : TYPE_LABELS[f]}
            </button>
          ))}
        </div>
        <Link href="/spots" className="text-xs text-dim hover:text-white transition-colors">
          Liste →
        </Link>
      </div>

      <div className="flex flex-1 overflow-hidden">
        <div className="flex-1 relative">
          <div ref={mapContainer} className="w-full h-full" />
          {!loaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-ink">
              <div className="text-center">
                <div className="w-8 h-8 border-2 border-t-transparent rounded-full animate-spin mx-auto mb-3" style={{ borderColor: '#00C2CB', borderTopColor: 'transparent' }} />
                <p className="text-sm" style={{ color: '#5A7A8A' }}>Karte wird geladen...</p>
              </div>
            </div>
          )}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full text-xs font-semibold z-10"
            style={{ background: 'rgba(13,30,44,0.95)', border: '1px solid rgba(0,194,203,0.2)', color: '#5A7A8A' }}>
            {spots.length} Spots
          </div>
        </div>

        {selected && (
          <div className="w-72 flex-shrink-0 border-l border-white/[0.07] overflow-y-auto"
            style={{ background: '#0D1E2C', scrollbarWidth: 'none' }}>
            <div className="p-4 border-b border-white/[0.07]">
              <p className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: '#5A7A8A' }}>
                {selected.country}
              </p>
              <h2 className="text-xl font-bold text-white mb-2" style={{ fontFamily: 'Syne, sans-serif', letterSpacing: '-0.04em' }}>
                {selected.name}
              </h2>
              <div className="flex gap-1.5 flex-wrap">
                <span className="text-xs font-semibold px-2 py-1 rounded"
                  style={{ background: 'rgba(10,110,189,0.15)', border: '1px solid rgba(10,110,189,0.3)', color: '#0A6EBD' }}>
                  {TYPE_LABELS[selected.type]}
                </span>
                {selected.level_tags.map(l => (
                  <span key={l} className="text-xs font-semibold px-2 py-1 rounded"
                    style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#5A7A8A' }}>
                    {LEVEL_LABELS[l]}
                  </span>
                ))}
              </div>
            </div>

            {current && (
              <div className="p-4 border-b border-white/[0.07]" style={{ borderLeft: `3px solid ${condColor}` }}>
                <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: '#5A7A8A' }}>Live Wind</p>
                <div className="flex items-baseline gap-1.5 mb-1">
                  <span className="text-4xl font-bold" style={{ fontFamily: 'Syne, sans-serif', color: condColor }}>
                    {current.wind_speed_knots}
                  </span>
                  <span className="text-lg" style={{ color: '#5A7A8A' }}>kn</span>
                  <span className="text-sm ml-1" style={{ color: '#5A7A8A' }}>{current.wind_direction_label}</span>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-xs" style={{ color: '#5A7A8A' }}>
                    Böen: {current.wind_gusts_knots} kn · {current.temperature}°C
                  </p>
                  <span className="text-xs font-bold px-2 py-1 rounded-full"
                    style={{ color: condColor, border: `1px solid ${condColor}`, background: `${condColor}15` }}>
                    {WIND_LABELS[current.condition.score]}
                  </span>
                </div>
              </div>
            )}

            <div className="p-4 border-b border-white/[0.07]">
              <div className="flex items-center justify-between">
                <span className="text-xs" style={{ color: '#5A7A8A' }}>Bewertung</span>
                <div className="flex items-center gap-1">
                  <span style={{ color: '#FBBF24', fontSize: 12 }}>★</span>
                  <span className="font-bold text-white text-sm">{selected.avg_rating.toFixed(1)}</span>
                  <span className="text-xs" style={{ color: '#5A7A8A' }}>({selected.review_count})</span>
                </div>
              </div>
              {selected.verified && (
                <div className="flex items-center gap-1 mt-1">
                  <span style={{ color: '#00C2CB', fontSize: 11 }}>✓</span>
                  <span className="text-xs font-semibold" style={{ color: '#00C2CB' }}>Verifizierter Spot</span>
                </div>
              )}
            </div>

            <div className="p-3">
              <p className="text-xs font-bold uppercase tracking-widest mb-3 px-1" style={{ color: '#5A7A8A' }}>
                Alle Spots
              </p>
              {MOCK_SPOTS.map(spot => {
                const fc = MOCK_FORECAST[spot.id];
                const c = fc ? WIND_COLORS[fc.condition.score] : '#5A7A8A';
                return (
                  <button key={spot.id} onClick={() => {
                    setSelected(spot);
                    if (mapRef.current) {
                      mapRef.current.flyTo({ center: [spot.longitude, spot.latitude - 8], zoom: 5, duration: 800 });
                    }
                  }}
                    className="w-full text-left p-3 rounded-lg mb-1.5 transition-all"
                    style={{
                      background: selected.id === spot.id ? 'rgba(0,194,203,0.1)' : 'rgba(255,255,255,0.03)',
                      border: `1px solid ${selected.id === spot.id ? 'rgba(0,194,203,0.3)' : 'rgba(255,255,255,0.06)'}`,
                    }}>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs" style={{ color: '#5A7A8A' }}>{spot.country}</p>
                        <p className="text-sm font-semibold text-white">{spot.name}</p>
                      </div>
                      {fc && (
                        <span className="text-sm font-bold" style={{ color: c, fontFamily: 'Syne, sans-serif' }}>
                          {fc.wind_speed_knots} kn
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="p-4 pt-0">
              <Link href={`/spots/${selected.slug}`}
                className="block w-full text-center py-3 rounded-lg font-bold text-sm transition-opacity hover:opacity-90"
                style={{ background: '#00C2CB', color: '#07111C', fontFamily: 'Syne, sans-serif' }}>
                Spot Detail öffnen →
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
