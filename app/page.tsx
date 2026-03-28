'use client';

import Link from 'next/link';
import { useState } from 'react';
import { MOCK_SPOTS } from '@/lib/types';

const spotCount = MOCK_SPOTS.length;
const countryCount = [...new Set(MOCK_SPOTS.map(s => s.country))].length;

// ── Translations ──────────────────────────────────────────────
const translations = {
  de: {
    eyebrow: 'Kitesurf Platform',
    headline: 'Finde deinen',
    headline2: 'perfekten Spot.',
    sub: 'Echtzeit-Winddaten, weltweite Kitesurf-Destinationen und smarte Reiseplanung — in einer Plattform.',
    cta1: 'Spots entdecken', cta2: 'Karte öffnen',
    destinations: 'Destinationen', countries: 'Länder', forecast: 'Wind-Forecast', live: 'Live',
    spotEyebrow: 'Destinationen', spotTitle: 'Die besten Spots der Welt.',
    options: 'Optionen', option: 'Option', allSpots: `Alle ${spotCount} Destinationen`,
    platformEyebrow: 'Plattform', platformTitle: 'Alles was du brauchst.',
    ctaTitle: 'Bereit?', ctaSub: 'Kostenlos registrieren — kein Abo, keine Kreditkarte.', ctaBtn: 'Jetzt starten',
    nav: { spots: 'Spots', map: 'Karte', login: 'Anmelden', start: 'Starten' },
    features: [
      { title: 'Wind-Forecast', desc: 'Windstärke, Böen, Richtung und 7-Tage-Vorschau für jede Destination.' },
      { title: 'Kite-Optionen', desc: 'Konkrete Spot-Optionen mit Level, Typ und bester Windrichtung.' },
      { title: 'Interaktive Karte', desc: 'Alle Destinationen mit Live-Winddaten und Filterfunktion.' },
      { title: 'Beste Reisezeit', desc: 'Optimale Reisemonate für jede Destination.' },
      { title: 'Level-Filter', desc: 'Beginner, Intermediate oder Pro — passende Spots sofort.' },
      { title: 'Windy-Integration', desc: 'Direktlink zu Windy.com mit genauen Koordinaten.' },
    ],
  },
  en: {
    eyebrow: 'Kitesurf Platform',
    headline: 'Find your',
    headline2: 'perfect spot.',
    sub: 'Real-time wind data, worldwide kitesurf destinations and smart trip planning — all in one platform.',
    cta1: 'Explore spots', cta2: 'Open map',
    destinations: 'Destinations', countries: 'Countries', forecast: 'Wind forecast', live: 'Live',
    spotEyebrow: 'Destinations', spotTitle: 'The world\'s best spots.',
    options: 'Options', option: 'Option', allSpots: `All ${spotCount} destinations`,
    platformEyebrow: 'Platform', platformTitle: 'Everything you need.',
    ctaTitle: 'Ready?', ctaSub: 'Sign up free — no subscription, no credit card.', ctaBtn: 'Get started',
    nav: { spots: 'Spots', map: 'Map', login: 'Sign in', start: 'Start' },
    features: [
      { title: 'Wind forecast', desc: 'Wind speed, gusts, direction and 7-day outlook for every destination.' },
      { title: 'Kite options', desc: 'Specific spot options with level, type and best wind direction.' },
      { title: 'Interactive map', desc: 'All destinations with live wind data and filters.' },
      { title: 'Best travel time', desc: 'Optimal travel months for each destination.' },
      { title: 'Level filter', desc: 'Beginner, Intermediate or Pro — matching spots instantly.' },
      { title: 'Windy integration', desc: 'Direct link to Windy.com with exact coordinates.' },
    ],
  },
  fr: {
    eyebrow: 'Plateforme Kitesurf',
    headline: 'Trouvez votre',
    headline2: 'spot parfait.',
    sub: 'Données météo en temps réel, destinations kitesurf mondiales et planification intelligente — en une seule plateforme.',
    cta1: 'Explorer les spots', cta2: 'Ouvrir la carte',
    destinations: 'Destinations', countries: 'Pays', forecast: 'Prévisions vent', live: 'Direct',
    spotEyebrow: 'Destinations', spotTitle: 'Les meilleurs spots du monde.',
    options: 'Options', option: 'Option', allSpots: `Toutes les ${spotCount} destinations`,
    platformEyebrow: 'Plateforme', platformTitle: 'Tout ce dont vous avez besoin.',
    ctaTitle: 'Prêt ?', ctaSub: 'Inscription gratuite — sans abonnement, sans carte bancaire.', ctaBtn: 'Commencer',
    nav: { spots: 'Spots', map: 'Carte', login: 'Connexion', start: 'Démarrer' },
    features: [
      { title: 'Prévisions vent', desc: 'Force, rafales, direction et prévisions 7 jours pour chaque destination.' },
      { title: 'Options kite', desc: 'Options de spots spécifiques avec niveau, type et meilleure direction du vent.' },
      { title: 'Carte interactive', desc: 'Toutes les destinations avec données vent en direct.' },
      { title: 'Meilleure période', desc: 'Mois optimaux pour chaque destination.' },
      { title: 'Filtre par niveau', desc: 'Débutant, Intermédiaire ou Pro — spots correspondants instantanément.' },
      { title: 'Intégration Windy', desc: 'Lien direct vers Windy.com avec les coordonnées exactes.' },
    ],
  },
  es: {
    eyebrow: 'Plataforma Kitesurf',
    headline: 'Encuentra tu',
    headline2: 'spot perfecto.',
    sub: 'Datos de viento en tiempo real, destinos kitesurf mundiales y planificación inteligente — en una sola plataforma.',
    cta1: 'Explorar spots', cta2: 'Abrir mapa',
    destinations: 'Destinos', countries: 'Países', forecast: 'Pronóstico viento', live: 'En vivo',
    spotEyebrow: 'Destinos', spotTitle: 'Los mejores spots del mundo.',
    options: 'Opciones', option: 'Opción', allSpots: `Todos los ${spotCount} destinos`,
    platformEyebrow: 'Plataforma', platformTitle: 'Todo lo que necesitas.',
    ctaTitle: '¿Listo?', ctaSub: 'Regístrate gratis — sin suscripción, sin tarjeta de crédito.', ctaBtn: 'Empezar',
    nav: { spots: 'Spots', map: 'Mapa', login: 'Iniciar sesión', start: 'Empezar' },
    features: [
      { title: 'Pronóstico viento', desc: 'Velocidad, ráfagas, dirección y previsión 7 días para cada destino.' },
      { title: 'Opciones kite', desc: 'Opciones específicas con nivel, tipo y mejor dirección del viento.' },
      { title: 'Mapa interactivo', desc: 'Todos los destinos con datos de viento en vivo.' },
      { title: 'Mejor época', desc: 'Meses óptimos para cada destino.' },
      { title: 'Filtro por nivel', desc: 'Principiante, Intermedio o Pro — spots al instante.' },
      { title: 'Integración Windy', desc: 'Enlace directo a Windy.com con coordenadas exactas.' },
    ],
  },
  nl: {
    eyebrow: 'Kitesurf Platform',
    headline: 'Vind jouw',
    headline2: 'perfecte spot.',
    sub: 'Realtime winddata, wereldwijde kitesurf-bestemmingen en slimme reisplanning — in één platform.',
    cta1: 'Spots ontdekken', cta2: 'Kaart openen',
    destinations: 'Bestemmingen', countries: 'Landen', forecast: 'Windverwachting', live: 'Live',
    spotEyebrow: 'Bestemmingen', spotTitle: 'De beste spots ter wereld.',
    options: 'Opties', option: 'Optie', allSpots: `Alle ${spotCount} bestemmingen`,
    platformEyebrow: 'Platform', platformTitle: 'Alles wat je nodig hebt.',
    ctaTitle: 'Klaar?', ctaSub: 'Gratis registreren — geen abonnement, geen creditcard.', ctaBtn: 'Nu starten',
    nav: { spots: 'Spots', map: 'Kaart', login: 'Inloggen', start: 'Starten' },
    features: [
      { title: 'Windverwachting', desc: 'Windsnelheid, windstoten, richting en 7-daagse vooruitzichten.' },
      { title: 'Kite-opties', desc: 'Specifieke spotopties met niveau, type en beste windrichting.' },
      { title: 'Interactieve kaart', desc: 'Alle bestemmingen met live winddata en filters.' },
      { title: 'Beste reistijd', desc: 'Optimale reismaanden voor elke bestemming.' },
      { title: 'Niveaufilter', desc: 'Beginner, Gemiddeld of Pro — passende spots direct.' },
      { title: 'Windy-integratie', desc: 'Directe link naar Windy.com met exacte coördinaten.' },
    ],
  },
} as const;

type Lang = keyof typeof translations;
const LANGS: { code: Lang; flag: string; label: string }[] = [
  { code: 'de', flag: '🇩🇪', label: 'DE' },
  { code: 'en', flag: '🇬🇧', label: 'EN' },
  { code: 'fr', flag: '🇫🇷', label: 'FR' },
  { code: 'es', flag: '🇪🇸', label: 'ES' },
  { code: 'nl', flag: '🇳🇱', label: 'NL' },
];

function IconArrow() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
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
function IconWind() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2"/><path d="M9.6 4.6A2 2 0 1 1 11 8H2"/><path d="M12.6 19.4A2 2 0 1 0 14 16H2"/>
    </svg>
  );
}
function IconMap() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"/><line x1="9" y1="3" x2="9" y2="18"/><line x1="15" y1="6" x2="15" y2="21"/>
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

function LangSwitcher({ lang, setLang }: { lang: Lang; setLang: (l: Lang) => void }) {
  const [open, setOpen] = useState(false);
  const current = LANGS.find(l => l.code === lang)!;
  return (
    <div style={{ position: 'relative' }}>
      <button onClick={() => setOpen(v => !v)}
        style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '6px 10px', borderRadius: 8, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: '#5A7A8A', fontSize: 13, fontWeight: 500, cursor: 'pointer' }}>
        {current.flag} {current.label}
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ transform: open ? 'rotate(180deg)' : 'none' }}>
          <polyline points="6 9 12 15 18 9"/>
        </svg>
      </button>
      {open && (
        <div style={{ position: 'absolute', top: 'calc(100% + 8px)', right: 0, background: '#0D1E2C', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12, overflow: 'hidden', minWidth: 120, boxShadow: '0 16px 40px rgba(0,0,0,0.5)', zIndex: 100 }}>
          {LANGS.map(l => (
            <button key={l.code} onClick={() => { setLang(l.code); setOpen(false); }}
              style={{ display: 'flex', alignItems: 'center', gap: 8, width: '100%', padding: '9px 14px', background: l.code === lang ? 'rgba(0,194,203,0.08)' : 'transparent', border: 'none', borderBottom: '1px solid rgba(255,255,255,0.05)', cursor: 'pointer', color: l.code === lang ? '#00C2CB' : '#5A7A8A', fontSize: 13, fontWeight: l.code === lang ? 600 : 400 }}>
              {l.flag} {l.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function HomePage() {
  const [lang, setLang] = useState<Lang>('de');
  const t = translations[lang];
  const featured = MOCK_SPOTS.slice(0, 6);

  return (
    <div style={{ background: '#07111C', fontFamily: 'DM Sans, sans-serif', color: 'white', minHeight: '100vh' }}>

      {/* Nav */}
      <nav style={{ borderBottom: '1px solid rgba(255,255,255,0.06)', position: 'sticky', top: 0, zIndex: 50, backdropFilter: 'blur(20px)', background: 'rgba(7,17,28,0.9)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 20px', height: 56, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
          <Link href="/"><span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 17, letterSpacing: '-0.04em' }}>LOCK<span style={{ color: '#00C2CB' }}>ITE</span></span></Link>
          <div className="hidden md:flex items-center gap-8 flex-1 justify-center">
            <Link href="/spots" style={{ color: '#5A7A8A', fontSize: 14 }}>{t.nav.spots}</Link>
            <Link href="/map" style={{ color: '#5A7A8A', fontSize: 14 }}>{t.nav.map}</Link>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <LangSwitcher lang={lang} setLang={setLang} />
            <Link href="/auth/register" style={{ background: 'rgba(0,194,203,0.1)', color: '#00C2CB', border: '1px solid rgba(0,194,203,0.2)', fontSize: 13, fontWeight: 600, padding: '8px 14px', borderRadius: 10, whiteSpace: 'nowrap' }}>
              {t.nav.start}
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section style={{ maxWidth: 1100, margin: '0 auto', padding: 'clamp(60px, 10vw, 120px) 20px clamp(48px, 8vw, 96px)', position: 'relative' }}>
        <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#00C2CB', marginBottom: 20 }}>{t.eyebrow}</p>
        <h1 style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(36px, 7vw, 76px)', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1.04, color: 'white', marginBottom: 20, maxWidth: 800 }}>
          {t.headline}<br /><span style={{ color: '#00C2CB' }}>{t.headline2}</span>
        </h1>
        <p style={{ fontSize: 'clamp(15px, 2vw, 18px)', color: '#5A7A8A', fontWeight: 300, lineHeight: 1.7, maxWidth: 520, marginBottom: 36 }}>{t.sub}</p>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <Link href="/spots" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 24px', borderRadius: 12, background: '#00C2CB', color: '#07111C', fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 14 }}>
            {t.cta1} <IconArrow />
          </Link>
          <Link href="/map" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 24px', borderRadius: 12, border: '1px solid rgba(255,255,255,0.1)', color: '#5A7A8A', fontSize: 14, fontWeight: 500 }}>
            {t.cta2}
          </Link>
        </div>
      </section>

      {/* Stats */}
      <section style={{ borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 20px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)' }}>
          {[
            { value: `${spotCount}`,    label: t.destinations },
            { value: `${countryCount}`, label: t.countries },
            { value: t.live,            label: t.forecast },
          ].map((s, i) => (
            <div key={s.label} style={{ padding: 'clamp(24px, 4vw, 40px) 16px', textAlign: 'center', borderLeft: i > 0 ? '1px solid rgba(255,255,255,0.06)' : 'none' }}>
              <div style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(26px, 4vw, 40px)', fontWeight: 800, letterSpacing: '-0.04em', color: 'white', lineHeight: 1 }}>{s.value}</div>
              <div style={{ fontSize: 11, marginTop: 8, fontWeight: 500, color: '#5A7A8A', letterSpacing: '0.06em' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Spots + Features */}
      <section style={{ maxWidth: 1100, margin: '0 auto', padding: 'clamp(48px, 6vw, 80px) 20px' }}>
        <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: 'clamp(40px, 6vw, 80px)' }}>
          <div>
            <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#5A7A8A', marginBottom: 12 }}>{t.spotEyebrow}</p>
            <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(26px, 4vw, 36px)', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1.1, marginBottom: 32 }}>{t.spotTitle}</h2>
            {featured.map(spot => (
              <Link key={spot.id} href={`/spots/${spot.slug}`}
                className="group flex items-center justify-between py-4 border-b last:border-0"
                style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
                <div className="min-w-0 flex-1 pr-4">
                  <p style={{ fontSize: 11, color: '#5A7A8A', letterSpacing: '0.04em', marginBottom: 2 }}>{spot.country}</p>
                  <h3 className="text-sm font-semibold text-white group-hover:text-cyan-400 transition-colors truncate" style={{ fontFamily: 'Syne, sans-serif', letterSpacing: '-0.02em' }}>{spot.name}</h3>
                </div>
                <div className="flex items-center gap-3 flex-shrink-0">
                  <span style={{ fontSize: 11, color: '#3A5A6A' }} className="hidden sm:block">
                    {spot.options?.length ?? 0} {(spot.options?.length ?? 0) === 1 ? t.option : t.options}
                  </span>
                  <span style={{ fontSize: 12, color: '#5A7A8A', fontWeight: 500 }}>{spot.avg_rating.toFixed(1)}</span>
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: '#00C2CB' }}><IconArrow /></span>
                </div>
              </Link>
            ))}
            <Link href="/spots" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, marginTop: 20, fontSize: 13, fontWeight: 600, color: '#00C2CB' }}>
              {t.allSpots} <IconArrow />
            </Link>
          </div>
          <div className="hidden sm:flex flex-col justify-center" style={{ gap: 32 }}>
            {[
              { icon: <IconWind />, title: t.features[0].title, desc: t.features[0].desc },
              { icon: <IconMap />,  title: t.features[2].title, desc: t.features[2].desc },
              { icon: <IconStar />, title: t.features[1].title, desc: t.features[1].desc },
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
          <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#5A7A8A', marginBottom: 12 }}>{t.platformEyebrow}</p>
          <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(26px, 4vw, 36px)', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1.1, marginBottom: 40 }}>{t.platformTitle}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3" style={{ gap: 1, background: 'rgba(255,255,255,0.06)', borderRadius: 16, overflow: 'hidden' }}>
            {t.features.map(f => (
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
          <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1.05, marginBottom: 14 }}>{t.ctaTitle}</h2>
          <p style={{ fontSize: 16, color: '#5A7A8A', fontWeight: 300, marginBottom: 36 }}>{t.ctaSub}</p>
          <Link href="/auth/register" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '14px 32px', borderRadius: 12, background: '#00C2CB', color: '#07111C', fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 15 }}>
            {t.ctaBtn} <IconArrow />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '24px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 14, color: '#5A7A8A', letterSpacing: '-0.02em' }}>LOCK<span style={{ color: '#00C2CB' }}>ITE</span></span>
          <p style={{ fontSize: 12, color: '#3A5A6A' }}>© 2025 Lockite</p>
          <div style={{ display: 'flex', gap: 20 }}>
            <Link href="/spots" style={{ fontSize: 12, color: '#3A5A6A' }}>{t.nav.spots}</Link>
            <Link href="/map" style={{ fontSize: 12, color: '#3A5A6A' }}>{t.nav.map}</Link>
            <Link href="/auth/login" style={{ fontSize: 12, color: '#3A5A6A' }}>{t.nav.login}</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
