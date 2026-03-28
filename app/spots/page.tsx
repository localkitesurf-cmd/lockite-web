import { Navbar } from '@/components/ui/Navbar';
import { SpotCard } from '@/components/spot/SpotCard';
import { getSession } from '@/lib/supabase';
import { MOCK_SPOTS, MOCK_FORECAST, TYPE_LABELS, LEVEL_LABELS } from '@/lib/types';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Kitesurf Spots weltweit',
  description: 'Entdecke über 2.400 Kitesurf-Spots weltweit — mit Echtzeit-Wind und persönlichen Empfehlungen.',
};

export default async function SpotsPage({
  searchParams,
}: {
  searchParams: { type?: string; level?: string; q?: string };
}) {
  const session = await getSession().catch(() => null);

  // Filter mock data (in production: call API with searchParams)
  let spots = MOCK_SPOTS;
  if (searchParams.type)  spots = spots.filter(s => s.type === searchParams.type);
  if (searchParams.level) spots = spots.filter(s => s.level_tags.includes(searchParams.level as any));
  if (searchParams.q)     spots = spots.filter(s =>
    s.name.toLowerCase().includes(searchParams.q!.toLowerCase()) ||
    s.country.toLowerCase().includes(searchParams.q!.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-ink">
      <Navbar session={session} />

      <main className="max-w-5xl mx-auto px-4 pt-24 pb-20">

        {/* Header */}
        <div className="py-10">
          <p className="section-eyebrow">Alle Spots</p>
          <h1 className="section-title text-4xl sm:text-5xl mb-3">
            {spots.length} Kitesurf-Spots
          </h1>
          <p className="text-dim font-light">Weltweit verifiziert · Mit Echtzeit-Wind</p>
        </div>

        {/* Filter bar */}
        <form className="flex flex-wrap gap-2 mb-8" method="GET">
          {/* Search */}
          <input
            name="q"
            defaultValue={searchParams.q}
            placeholder="Spot oder Land suchen..."
            className="field-input h-10 text-sm flex-1 min-w-48"
          />

          {/* Type filter */}
          <select name="type" defaultValue={searchParams.type ?? ''}
            className="field-input h-10 text-sm w-36">
            <option value="">Alle Typen</option>
            {Object.entries(TYPE_LABELS).map(([k, v]) => (
              <option key={k} value={k}>{v}</option>
            ))}
          </select>

          {/* Level filter */}
          <select name="level" defaultValue={searchParams.level ?? ''}
            className="field-input h-10 text-sm w-40">
            <option value="">Alle Level</option>
            {Object.entries(LEVEL_LABELS).map(([k, v]) => (
              <option key={k} value={k}>{v}</option>
            ))}
          </select>

          <button type="submit" className="btn-primary h-10 px-5 text-sm">Filtern</button>
          {(searchParams.type || searchParams.level || searchParams.q) && (
            <a href="/spots" className="btn-secondary h-10 px-4 text-sm">Reset</a>
          )}
        </form>

        {/* Grid */}
        {spots.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {spots.map(spot => (
              <SpotCard key={spot.id} spot={spot} forecast={MOCK_FORECAST[spot.id]} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">🔍</div>
            <p className="text-white font-semibold text-lg mb-2">Keine Spots gefunden.</p>
            <p className="text-dim text-sm mb-6">Versuche andere Filter.</p>
            <a href="/spots" className="btn-secondary px-6">Filter zurücksetzen</a>
          </div>
        )}
      </main>
    </div>
  );
}
