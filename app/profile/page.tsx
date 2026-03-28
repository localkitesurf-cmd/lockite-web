'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Navbar } from '@/components/ui/Navbar';
import { supabaseBrowser } from '@/lib/supabase';

const LEVELS = ['beginner','intermediate','pro'] as const;

export default function ProfilePage() {
  const router = useRouter();
  const sb = supabaseBrowser();
  const [session, setSession] = useState<any>(null);
  const [level, setLevel]     = useState('intermediate');
  const [saved,  setSaved]    = useState(false);

  useEffect(() => {
    sb.auth.getSession().then(({ data }) => {
      if (!data.session) { router.push('/auth/login'); return; }
      setSession(data.session);
      setLevel(data.session.user.user_metadata?.level ?? 'intermediate');
    });
  }, []);

  async function handleSave() {
    await sb.auth.updateUser({ data: { level } });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  async function handleSignOut() {
    await sb.auth.signOut();
    router.push('/');
    router.refresh();
  }

  if (!session) return null;
  const user = session.user;

  return (
    <div className="min-h-screen bg-ink">
      <Navbar session={session} />

      <main className="max-w-lg mx-auto px-4 pt-24 pb-20">
        <div className="py-8">
          <p className="section-eyebrow">Konto</p>
          <h1 className="section-title text-3xl">Profil</h1>
        </div>

        {/* Avatar */}
        <div className="flex items-center gap-4 mb-8 p-5 card">
          <div className="w-14 h-14 rounded-full bg-ocean/20 border-2 border-cyan flex items-center justify-center text-2xl font-bold text-white shrink-0"
            style={{ fontFamily:'Syne,sans-serif' }}>
            {user.user_metadata?.full_name?.[0] ?? user.email?.[0]?.toUpperCase() ?? '🪁'}
          </div>
          <div>
            <p className="font-bold text-white">{user.user_metadata?.full_name ?? 'Kiter'}</p>
            <p className="text-dim text-sm">{user.email}</p>
          </div>
        </div>

        {/* Level */}
        <div className="card p-5 mb-4">
          <p className="section-eyebrow">Kite-Level</p>
          <div className="flex flex-col gap-2">
            {LEVELS.map(l => (
              <label key={l} onClick={() => setLevel(l)}
                className={`flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition-all ${
                  level === l ? 'border-cyan bg-cyan/[0.08]' : 'border-white/10 hover:border-cyan/30'
                }`}>
                <span className={`text-sm font-semibold ${level === l ? 'text-white' : 'text-dim'}`}>
                  {l.charAt(0).toUpperCase() + l.slice(1)}
                </span>
                <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${level === l ? 'border-cyan' : 'border-dim/50'}`}>
                  {level === l && <div className="w-2 h-2 rounded-full bg-cyan" />}
                </div>
              </label>
            ))}
          </div>
          <button onClick={handleSave} className="btn-primary w-full py-2.5 mt-4 text-sm">
            {saved ? '✓ Gespeichert' : 'Speichern'}
          </button>
        </div>

        {/* Links */}
        <div className="card mb-4 overflow-hidden">
          {[
            { href:'/spots',    icon:'🗺️', label:'Spots entdecken' },
            { href:'/dashboard',icon:'📊', label:'Dashboard' },
          ].map(item => (
            <Link key={item.href} href={item.href}
              className="flex items-center justify-between px-5 py-4 border-b border-white/[0.05] last:border-0 hover:bg-white/[0.03] transition-colors">
              <div className="flex items-center gap-3">
                <span>{item.icon}</span>
                <span className="text-sm text-white">{item.label}</span>
              </div>
              <span className="text-dim text-sm">›</span>
            </Link>
          ))}
        </div>

        {/* Sign out */}
        <button onClick={handleSignOut}
          className="w-full py-3 rounded-xl border border-red-400/30 text-red-400 text-sm font-semibold hover:bg-red-400/10 transition-colors">
          Abmelden
        </button>
      </main>
    </div>
  );
}
