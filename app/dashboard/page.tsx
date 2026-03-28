import { redirect } from 'next/navigation';
import Link from 'next/link';
import { Navbar } from '@/components/ui/Navbar';
import { SpotCard } from '@/components/spot/SpotCard';
import { MOCK_SPOTS, MOCK_FORECAST } from '@/lib/types';
import { supabaseBrowser } from '@/lib/supabase';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Dashboard' };

export default async function DashboardPage() {
  const name = 'Kiter';
  const level = 'intermediate';

  const recommended = MOCK_SPOTS
    .filter(s => s.level_tags.includes(level as any))
    .slice(0, 3);

  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Guten Morgen' : hour < 18 ? 'Hallo' : 'Guten Abend';

  return (
    <div className="min-h-screen bg-ink">
      <Navbar session={null} />
      <main className="max-w-5xl mx-auto px-4 pt-24 pb-20">
        <div className="py-10 flex items-start justify-between flex-wrap gap-4">
          <div>
            <p className="section-eyebrow">Dashboard</p>
            <h1 className="section-title text-4xl">{greeting}, {name}. 🪁</h1>
            <p className="text-dim mt-2 font-light">Deine personalisierten Spot-Empfehlungen.</p>
          </div>
          <div className="flex gap-3">
            <Link href="/spots" className="btn-secondary text-sm py-2.5 px-5">Alle Spots</Link>
            <Link href="/map" className="btn-primary text-sm py-2.5 px-5">🗺️ Karte</Link>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          {recommended.map(spot => (
            <SpotCard key={spot.id} spot={spot} forecast={MOCK_FORECAST[spot.id]} />
          ))}
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { href:'/spots', icon:'🗺️', label:'Spots entdecken' },
            { href:'/spots?type=flat', icon:'〰️', label:'Flachwasser' },
            { href:'/spots?type=wave', icon:'🌊', label:'Wave-Spots' },
            { href:'/profile', icon:'👤', label:'Profil' },
          ].map(q => (
            <Link key={q.href} href={q.href}
              className="card-hover p-4 flex flex-col items-center gap-2 text-center">
              <span className="text-2xl">{q.icon}</span>
              <span className="text-dim text-xs font-medium">{q.label}</span>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
