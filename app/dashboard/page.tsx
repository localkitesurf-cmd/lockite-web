import { redirect } from 'next/navigation';
import Link from 'next/link';
import { Navbar } from '@/components/ui/Navbar';
import { SpotCard } from '@/components/spot/SpotCard';
import { getSession, supabaseServer } from '@/lib/supabase';
import { MOCK_SPOTS, MOCK_FORECAST } from '@/lib/types';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Dashboard' };

export default async function DashboardPage() {
  const session = await getSession().catch(() => null);
  if (!session) redirect('/auth/login?redirect=/dashboard');

  const name = session.user.user_metadata?.full_name?.split(' ')[0] ?? 'Kiter';
  const level = session.user.user_metadata?.level ?? 'intermediate';

  // Filter spots by user level (simple personalisation)
  const recommended = MOCK_SPOTS
    .filter(s => s.level_tags.includes(level as any))
    .slice(0, 3);

  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Guten Morgen' : hour < 18 ? 'Hallo' : 'Guten Abend';

  return (
    <div className="min-h-screen bg-ink">
      <Navbar session={session} />

      <main className="max-w-5xl mx-auto px-4 pt-24 pb-20">

        {/* Welcome */}
        <div className="py-10 flex items-start justify-between flex-wrap gap-4">
          <div>
            <p className="section-eyebrow">Dashboard</p>
            <h1 className="section-title text-4xl">{greeting}, {name}. 🪁</h1>
            <p className="text-dim mt-2 font-light">Deine personalisierten Spot-Empfehlungen.</p>
          </div>
          <div className="flex gap-3">
            <Link href="/spots" className="btn-secondary text-sm py-2.5 px-5">Alle Spots</Link>
            <Link href="/map"   className="btn-primary  text-sm py-2.5 px-5">🗺️ Karte</Link>
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-3 mb-10">
          {[
            { label:'Dein Level',   value: level.charAt(0).toUpperCase() + level.slice(1), icon:'🏄' },
            { label:'Favoriten',    value:'0 Spots', icon:'❤️' },
            { label:'Spots gesamt', value:'2.400+',  icon:'📍' },
          ].map(s => (
            <div key={s.label} className="card p-4 text-center">
              <div className="text-2xl mb-1.5">{s.icon}</div>
              <div className="font-bold text-white text-sm" style={{ fontFamily:'Syne,sans-serif' }}>{s.value}</div>
              <div className="text-dim text-xs mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Recommended */}
        <div className="mb-12">
          <div className="flex items-end justify-between mb-6">
            <div>
              <p className="section-eyebrow">Für dich</p>
              <h2 className="section-title text-2xl">Empfohlene Spots</h2>
            </div>
            <Link href="/spots" className="btn-ghost text-sm">Mehr →</Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {recommended.map(spot => (
              <SpotCard key={spot.id} spot={spot} forecast={MOCK_FORECAST[spot.id]} />
            ))}
          </div>
        </div>

        {/* Quick links */}
        <div>
          <p className="section-eyebrow mb-5">Schnellzugriff</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { href:'/spots',          icon:'🗺️', label:'Spots entdecken' },
              { href:'/map',            icon:'📡', label:'Live-Karte' },
              { href:'/spots?type=flat',icon:'〰️', label:'Flachwasser' },
              { href:'/spots?type=wave',icon:'🌊', label:'Wave-Spots' },
            ].map(q => (
              <Link key={q.href} href={q.href}
                className="card-hover p-4 flex flex-col items-center gap-2 text-center">
                <span className="text-2xl">{q.icon}</span>
                <span className="text-dim text-xs font-medium group-hover:text-white">{q.label}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Profile settings hint */}
        <div className="mt-10 card p-5 flex items-center justify-between gap-4 flex-wrap">
          <div>
            <p className="text-white font-semibold text-sm mb-0.5">Profil vervollständigen</p>
            <p className="text-dim text-xs">Wind-Präferenzen einstellen für bessere Empfehlungen.</p>
          </div>
          <Link href="/profile" className="btn-secondary text-sm py-2 px-5 shrink-0">
            Einstellungen →
          </Link>
        </div>
      </main>
    </div>
  );
}
