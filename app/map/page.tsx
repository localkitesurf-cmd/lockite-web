'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import Link from 'next/link';
import { MOCK_SPOTS, MOCK_FORECAST, TYPE_LABELS, TYPE_ICONS, LEVEL_LABELS, type Spot } from '@/lib/types';

function windColor(spotId: string) {
  const fc = MOCK_FORECAST[spotId];
  if (!fc) return '#5A7A8A';
  return fc.condition.color;
}
function windKnots(spotId: string) {
  const fc = MOCK_FORECAST[spotId];
  return fc ? `${fc.wind_speed_knots} kn` : null;
}

function IconX() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
      <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
    </svg>
  );
}
function IconArrow() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
    </svg>
  );
}
function IconList() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/>
      <line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/>
    </svg>
  );
}

type Filter = 'all' | 'flat' | 'wave' | 'hybrid';
const FILTERS: { key: Filter; label: string }[] = [
  { key: 'all',    label: 'Alle' },
  { key: 'flat',   label: 'Flachwasser' },
  { key: 'wave',   label: 'Wave' },
  { key: 'hybrid', label: 'Hybrid' },
];

function BottomSheet({ spot, onClose }: { spot: Spot; onClose: () => void }) {
  const fc = MOCK_FORECAST[spot.id];
  const color = fc?.condition.color ?? '#5A7A8A';

  return (
    <>
      <div onClick={onClose} style={{ position: 'fixed', inset: 0, zIndex: 40 }} />
      <div style={{
        position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 50,
        background: '#0D1E2C',
        borderTop: `1px solid ${color}30`,
        borderRadius: '20px 20px 0 0',
        maxHeight: '80vh',
        overflowY: 'auto',
        paddingBottom: 'max(24px, env(safe-area-inset-bottom))',
        boxShadow: '0 -20px 60px rgba(0,0,0,0.6)',
        animation: 'slideUp 0.25s ease-out',
        scrollbarWidth: 'none',
      }}>
        <div style={{ display: 'flex', justifyContent: 'center', padding: '12px 0 4px', position: 'sticky', top: 0, background: '#0D1E2C', zIndex: 1 }}>
          <div style={{ width: 36, height: 4, borderRadius: 2, background: 'rgba(255,255,255,0.15)' }} />
        </div>

        <div style={{ padding: '8px 20px 0' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 12 }}>
            <div style={{ flex: 1, minWidth: 0, paddingRight: 12 }}>
              <p style={{ fontSize: 11, color: '#5A7A8A', fontWeight: 500, letterSpacing: '0.05em', marginBottom: 3 }}>
                {spot.region ? `${spot.region}, ` : ''}{spot.country}
              </p>
              <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: 22, fontWeight: 800, letterSpacing: '-0.03em', color: 'white', lineHeight: 1.1 }}>
                {spot.name}
              </h2>
            </div>
            <button onClick={onClose}
              style={{ width: 32, height: 32, borderRadius: 8, background: 'rgba(255,255,255,0.06)', border: 'none', cursor: 'pointer', color: '#5A7A8A', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <IconX />
            </button>
          </div>

          <div style={{ display: 'flex', gap: 6, marginBottom: 14, flexWrap: 'wrap' }}>
            <span style={{ fontSize: 11, fontWeight: 700, padding: '3px 9px', borderRadius: 20, background: 'rgba(10,110,189,0.15)', border: '1px solid rgba(10,110,189,0.3)', color: '#0A6EBD' }}>
              {TYPE_LABELS[spot.type]}
            </span>
            {spot.level_tags.map(l => (
              <span key={l} style={{ fontSize: 11, fontWeight: 600, padding: '3px 9px', borderRadius: 20, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#5A7A8A' }}>
                {LEVEL_LABELS[l]}
              </span>
            ))}
            {spot.verified && (
              <span style={{ fontSize: 11, fontWeight: 700, padding: '3px 9px', borderRadius: 20, background: 'rgba(0,194,203,0.1)', border: '1px solid rgba(0,194,203,0.3)', color: '#00C2CB' }}>
                ✓ Verifiziert
              </span>
            )}
          </div>

          {fc && (
            <div style={{ background: 'rgba(255,255,255,0.04)', border: `1px solid ${color}20`, borderLeft: `3px solid ${color}`, borderRadius: 12, padding: '12px 14px', marginBottom: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#5A7A8A', marginBottom: 3 }}>Live Wind</p>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
                    <span style={{ fontFamily: 'Syne, sans-serif', fontSize: 28, fontWeight: 800, color, letterSpacing: '-2px' }}>{fc.wind_speed_knots}</span>
                    <span style={{ fontSize: 13, color: '#5A7A8A' }}>kn</span>
                    <span style={{ fontSize: 12, color: '#5A7A8A', marginLeft: 4 }}>{fc.wind_direction_label}</span>
                  </div>
                  <p style={{ fontSize: 11, color: '#5A7A8A', marginTop: 1 }}>Böen {fc.wind_gusts_knots} kn · {fc.temperature}°C</p>
                </div>
                <span style={{ fontSize: 11, fontWeight: 700, padding: '5px 12px', borderRadius: 20, color, border: `1px solid ${color}50`, background: `${color}12` }}>
                  {fc.condition.label}
                </span>
              </div>
            </div>
          )}

          {spot.options && spot.options.length > 0 && (
            <div style={{ marginBottom: 16 }}>
              <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#5A7A8A', marginBottom: 10 }}>
                {spot.options.length} Kite-Optionen
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {spot.options.map(option => (
                  <div key={option.name}
                    style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 12, padding: '12px 14px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <span style={{ fontSize: 14 }}>{TYPE_ICONS[option.type]}</span>
                        <span style={{ fontFamily: 'Syne, sans-serif', fontSize: 13, fontWeight: 700, color: 'white', letterSpacing: '-0.01em' }}>
                          {option.name}
                        </span>
                      </div>
                      <div style={{ display: 'flex', gap: 4 }}>
                        {option.wind_directions.map(d => (
                          <span key={d} style={{ fontSize: 10, fontWeight: 700, padding: '2px 6px', borderRadius: 4, background: 'rgba(0,194,203,0.08)', color: '#00C2CB', border: '1px solid rgba(0,194,203,0.2)' }}>
                            {d}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: 4, marginBottom: 6, flexWrap: 'wrap' }}>
                      {option.level_tags.map(l => (
                        <span key={l} style={{ fontSize: 10, fontWeight: 600, padding: '2px 7px', borderRadius: 10, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: '#5A7A8A' }}>
                          {LEVEL_LABELS[l]}
                        </span>
                      ))}
                    </div>
                    <p style={{ fontSize: 12, color: '#5A7A8A', lineHeight: 1.5, fontWeight: 300 }}>
                      {option.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          <Link href={`/spots/${spot.slug}`}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, width: '100%', padding: '13px', borderRadius: 14, background: '#00C2CB', color: '#07111C', fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 14, textDecoration: 'none', marginBottom: 4 }}>
            Vollständige Spot-Info <IconArrow />
          </Link>
        </div>
      </div>
      <style>{`
        @keyframes slideUp { from { transform: translateY(100%); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
      `}</style>
    </>
  );
}

export default function MapPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef       = useRef<any>(null);
  const markersRef   = useRef<any[]>([]);
  const [loaded,   setLoaded]   = useState(false);
  const [selected, setSelected] = useState<Spot | null>(null);
  const [filter,   setFilter]   = useState<Filter>('all');

  const filtered = filter === 'all' ? MOCK_SPOTS : MOCK_SPOTS.filter(s => s.type === filter);

  useEffect(() => {
    if (mapRef.current || !containerRef.current) return;
    const key = process.env.NEXT_PUBLIC_MAPTILER_KEY;
    const cssLink = document.createElement('link');
    cssLink.rel = 'stylesheet';
    cssLink.href = 'https://cdn.maptiler.com/maptiler-sdk-js/v2.0.3/maptiler-sdk.css';
    document.head.appendChild(cssLink);
    const script = document.createElement('script');
    script.src = 'https://cdn.maptiler.com/maptiler-sdk-js/v2.0.3/maptiler-sdk.umd.min.js';
    script.onload = () => {
      const sdk = (window as any).maptilersdk;
      sdk.config.apiKey = key;
      const map = new sdk.Map({
        container: containerRef.current,
        style: sdk.MapStyle.DATAVIZ.DARK,
        center: [15, 25],
        zoom: 2.2,
        attributionControl: false,
        pitchWithRotate: false,
        dragRotate: false,
      });
      mapRef.current = map;
      map.on('load', () => { setLoaded(true); addMarkers(sdk, map, MOCK_SPOTS); });
      map.on('click', () => setSelected(null));
    };
    document.head.appendChild(script);
    return () => {
      markersRef.current.forEach(m => m.remove());
      markersRef.current = [];
      if (mapRef.current) { mapRef.current.remove(); mapRef.current = null; }
    };
  }, []);

  const addMarkers = useCallback((sdk: any, map: any, spots: Spot[]) => {
    markersRef.current.forEach(m => m.remove());
    markersRef.current = [];
    spots.forEach(spot => {
      const color = windColor(spot.id);
      const kn    = windKnots(spot.id);
      const el = document.createElement('div');
      el.style.cssText = `cursor:pointer;display:flex;flex-direction:column;align-items:center;gap:3px;transition:transform 0.15s ease;will-change:transform;`;
      if (kn) {
        const badge = document.createElement('div');
        badge.style.cssText = `background:#0D1E2C;border:1px solid ${color}60;color:${color};font-size:10px;font-weight:700;padding:2px 7px;border-radius:5px;white-space:nowrap;font-family:'Syne',sans-serif;box-shadow:0 2px 8px rgba(0,0,0,0.5);pointer-events:none;`;
        badge.textContent = kn;
        el.appendChild(badge);
      }
      const dot = document.createElement('div');
      dot.style.cssText = `width:10px;height:10px;border-radius:50%;background:${color};border:2px solid rgba(255,255,255,0.9);box-shadow:0 0 0 3px ${color}30,0 2px 8px rgba(0,0,0,0.4);pointer-events:none;`;
      el.appendChild(dot);
      el.addEventListener('mouseenter', () => { el.style.transform = 'scale(1.2)'; });
      el.addEventListener('mouseleave', () => { el.style.transform = 'scale(1)'; });
      el.addEventListener('click', (e) => {
        e.stopPropagation();
        setSelected(spot);
        map.easeTo({ center: [spot.longitude, spot.latitude], zoom: Math.max(map.getZoom(), 4), duration: 400, offset: [0, 80] });
      });
      const marker = new sdk.Marker({ element: el, anchor: 'bottom' })
        .setLngLat([spot.longitude, spot.latitude])
        .addTo(map);
      markersRef.current.push(marker);
    });
  }, []);

  useEffect(() => {
    if (!mapRef.current || !loaded) return;
    const sdk = (window as any).maptilersdk;
    if (!sdk) return;
    setSelected(null);
    addMarkers(sdk, mapRef.current, filtered);
  }, [filter, loaded, addMarkers]);

  return (
    <div style={{ position: 'fixed', inset: 0, background: '#07111C', display: 'flex', flexDirection: 'column' }}>
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, zIndex: 30,
        padding: '12px 16px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12,
        background: 'linear-gradient(to bottom, rgba(7,17,28,0.95) 0%, rgba(7,17,28,0.7) 70%, transparent 100%)',
        paddingTop: 'max(12px, env(safe-area-inset-top))',
      }}>
        <Link href="/" style={{ flexShrink: 0 }}>
          <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 16, letterSpacing: '-0.04em', color: 'white' }}>
            LOCK<span style={{ color: '#00C2CB' }}>ITE</span>
          </span>
        </Link>
        <div style={{ display: 'flex', gap: 6, overflowX: 'auto', flexShrink: 1, scrollbarWidth: 'none' }}>
          {FILTERS.map(f => (
            <button key={f.key} onClick={() => setFilter(f.key)}
              style={{
                padding: '7px 14px', borderRadius: 20, fontSize: 12, fontWeight: 600,
                whiteSpace: 'nowrap', cursor: 'pointer', border: 'none', transition: 'all 0.15s',
                background: filter === f.key ? 'rgba(0,194,203,0.15)' : 'rgba(255,255,255,0.06)',
                color: filter === f.key ? '#00C2CB' : '#5A7A8A',
                outline: filter === f.key ? '1px solid rgba(0,194,203,0.4)' : '1px solid rgba(255,255,255,0.08)',
              }}>
              {f.label}
            </button>
          ))}
        </div>
        <Link href="/spots" style={{ flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', width: 36, height: 36, borderRadius: 10, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)', color: '#5A7A8A' }}>
          <IconList />
        </Link>
      </div>

      <div ref={containerRef} style={{ flex: 1, width: '100%', height: '100%' }} />

      {!loaded && (
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#07111C', zIndex: 20 }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ width: 32, height: 32, border: '2px solid #00C2CB', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 0.8s linear infinite', margin: '0 auto 12px' }} />
            <p style={{ fontSize: 13, color: '#5A7A8A' }}>Karte wird geladen...</p>
          </div>
        </div>
      )}

      {loaded && !selected && (
        <div style={{
          position: 'absolute', bottom: 24, left: '50%', transform: 'translateX(-50%)',
          padding: '6px 16px', borderRadius: 20, fontSize: 12, fontWeight: 600, color: '#5A7A8A',
          background: 'rgba(13,30,44,0.95)', border: '1px solid rgba(255,255,255,0.08)',
          backdropFilter: 'blur(10px)', zIndex: 20, whiteSpace: 'nowrap',
        }}>
          {filtered.length} Spots
        </div>
      )}

      {selected && <BottomSheet spot={selected} onClose={() => setSelected(null)} />}

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes slideUp { from { transform: translateY(100%); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
      `}</style>
    </div>
  );
}
