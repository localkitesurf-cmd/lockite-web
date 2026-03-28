'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';
import { locales, localeNames, localeFlags, type Locale } from '@/i18n';

export function LanguageSwitcher() {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    function handle(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', handle);
    return () => document.removeEventListener('mousedown', handle);
  }, []);

  function switchLocale(next: Locale) {
    setOpen(false);
    // Replace current locale prefix in path
    const newPath = pathname.replace(`/${locale}`, `/${next}`) || `/${next}`;
    router.push(newPath);
  }

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <button
        onClick={() => setOpen(v => !v)}
        style={{
          display: 'flex', alignItems: 'center', gap: 6,
          padding: '6px 10px', borderRadius: 8,
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(255,255,255,0.08)',
          color: '#5A7A8A', fontSize: 13, fontWeight: 500,
          cursor: 'pointer', transition: 'all 0.15s',
        }}>
        <span>{localeFlags[locale]}</span>
        <span>{locale.toUpperCase()}</span>
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
          style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.15s' }}>
          <polyline points="6 9 12 15 18 9"/>
        </svg>
      </button>

      {open && (
        <div style={{
          position: 'absolute', top: 'calc(100% + 8px)', right: 0,
          background: '#0D1E2C', border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: 12, overflow: 'hidden', minWidth: 160,
          boxShadow: '0 16px 40px rgba(0,0,0,0.5)',
          zIndex: 100,
        }}>
          {locales.map(l => (
            <button key={l} onClick={() => switchLocale(l)}
              style={{
                display: 'flex', alignItems: 'center', gap: 10,
                width: '100%', padding: '10px 14px',
                background: l === locale ? 'rgba(0,194,203,0.08)' : 'transparent',
                border: 'none', cursor: 'pointer', textAlign: 'left',
                borderBottom: '1px solid rgba(255,255,255,0.05)',
                transition: 'background 0.15s',
              }}
              onMouseEnter={e => { if (l !== locale) (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.04)'; }}
              onMouseLeave={e => { if (l !== locale) (e.currentTarget as HTMLElement).style.background = 'transparent'; }}>
              <span style={{ fontSize: 16 }}>{localeFlags[l]}</span>
              <span style={{ fontSize: 13, fontWeight: l === locale ? 600 : 400, color: l === locale ? '#00C2CB' : '#5A7A8A' }}>
                {localeNames[l]}
              </span>
              {l === locale && (
                <span style={{ marginLeft: 'auto', color: '#00C2CB' }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                </span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
