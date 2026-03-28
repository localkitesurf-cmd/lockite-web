'use client';

import { useState, useTransition } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { supabaseBrowser } from '@/lib/supabase';

const LEVELS = [
  { id: 'beginner',     label: 'Beginner',     desc: 'Ich lerne noch kitesurfen' },
  { id: 'intermediate', label: 'Intermediate', desc: '1–3 Jahre Erfahrung' },
  { id: 'pro',          label: 'Pro',          desc: 'Jahrelange Erfahrung' },
] as const;

export default function RegisterPage() {
  const router = useRouter();
  const [step,    setStep]    = useState<1 | 2>(1);
  const [name,    setName]    = useState('');
  const [email,   setEmail]   = useState('');
  const [pwd,     setPwd]     = useState('');
  const [pwd2,    setPwd2]    = useState('');
  const [level,   setLevel]   = useState<'beginner'|'intermediate'|'pro'>('intermediate');
  const [error,   setError]   = useState('');
  const [isPending, start]    = useTransition();

  const sb = supabaseBrowser();

  // Password strength
  const strength = pwd.length === 0 ? 0 : pwd.length < 8 ? 1 : pwd.length < 12 && !/[^A-Za-z0-9]/.test(pwd) ? 2 : pwd.length >= 12 && /[^A-Za-z0-9]/.test(pwd) ? 4 : 3;
  const strengthColors = ['','#F87171','#FBBF24','#4ADE80','#00C2CB'];
  const strengthLabels = ['','Zu kurz','Schwach','Gut','Stark 💪'];

  function goNext(e: React.FormEvent) {
    e.preventDefault();
    if (pwd !== pwd2) { setError('Passwörter stimmen nicht überein.'); return; }
    if (pwd.length < 8) { setError('Passwort muss mind. 8 Zeichen haben.'); return; }
    setError('');
    setStep(2);
  }

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    start(async () => {
      const { error } = await sb.auth.signUp({
        email,
        password: pwd,
        options: {
          data: { full_name: name, level },
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });
      if (error) { setError(mapError(error.message)); return; }
      router.push('/auth/confirm-email');
    });
  }

  async function handleOAuth(provider: 'google' | 'apple') {
    await sb.auth.signInWithOAuth({
      provider,
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    });
  }

  return (
    <div className="min-h-screen bg-ink flex items-center justify-center px-4 py-12">
      <div className="fixed inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 40% at 50% 0%, rgba(0,194,203,0.06) 0%, transparent 60%)' }} />

      <div className="relative w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/">
            <span className="text-4xl font-bold text-white" style={{ fontFamily: 'Syne, sans-serif', letterSpacing: '-0.04em' }}>
              LOCK<span className="text-cyan">ITE</span>
            </span>
          </Link>
        </div>

        {/* Step indicator */}
        <div className="flex items-center justify-center gap-0 mb-8">
          <div className={`w-2.5 h-2.5 rounded-full border transition-all ${step >= 1 ? 'bg-cyan border-cyan' : 'bg-transparent border-cyan/30'}`} />
          <div className={`w-14 h-px transition-all ${step >= 2 ? 'bg-cyan' : 'bg-cyan/20'}`} />
          <div className={`w-2.5 h-2.5 rounded-full border transition-all ${step >= 2 ? 'bg-cyan border-cyan' : 'bg-transparent border-cyan/30'}`} />
        </div>

        {/* Error */}
        {error && (
          <div className="flex items-center gap-2 bg-red-400/10 border border-red-400/30 rounded-lg p-3 mb-5">
            <span className="text-red-400 text-sm flex-1">{error}</span>
            <button onClick={() => setError('')} className="text-red-400 text-xs">✕</button>
          </div>
        )}

        {step === 1 ? (
          <>
            <h1 className="text-2xl font-bold text-white mb-1.5" style={{ fontFamily: 'Syne, sans-serif' }}>Account erstellen.</h1>
            <p className="text-dim text-sm mb-7">Kostenlos — kein Abo nötig.</p>

            {/* OAuth */}
            <div className="flex flex-col gap-2.5 mb-5">
              {(['google', 'apple'] as const).map(p => (
                <button key={p} onClick={() => handleOAuth(p)}
                  className="w-full h-12 bg-card2 border border-white/10 rounded-lg text-sm font-semibold text-white hover:border-cyan/30 hover:bg-card transition-all flex items-center justify-center gap-2.5">
                  {p === 'google' ? '🌐' : '🍎'} Mit {p === 'google' ? 'Google' : 'Apple'} fortfahren
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3 mb-5">
              <div className="flex-1 h-px bg-white/[0.07]" />
              <span className="text-dim text-xs">oder</span>
              <div className="flex-1 h-px bg-white/[0.07]" />
            </div>

            <form onSubmit={goNext} className="space-y-4">
              <div>
                <label className="field-label">Name</label>
                <input className="field-input" type="text" placeholder="Max Muster"
                  value={name} onChange={e => setName(e.target.value)} required />
              </div>
              <div>
                <label className="field-label">E-Mail</label>
                <input className="field-input" type="email" placeholder="max@example.com"
                  value={email} onChange={e => setEmail(e.target.value)} required />
              </div>
              <div>
                <label className="field-label">Passwort</label>
                <input className="field-input" type="password" placeholder="Mind. 8 Zeichen"
                  value={pwd} onChange={e => setPwd(e.target.value)} required />
                {pwd.length > 0 && (
                  <div className="mt-2">
                    <div className="flex gap-1 mb-1">
                      {[1,2,3,4].map(i => (
                        <div key={i} className="flex-1 h-0.5 rounded-full transition-all"
                          style={{ background: i <= strength ? strengthColors[strength] : 'rgba(255,255,255,0.08)' }} />
                      ))}
                    </div>
                    <p className="text-xs" style={{ color: strengthColors[strength] }}>{strengthLabels[strength]}</p>
                  </div>
                )}
              </div>
              <div>
                <label className="field-label">Passwort bestätigen</label>
                <input className={`field-input ${pwd2 && pwd !== pwd2 ? 'error' : ''}`}
                  type="password" placeholder="Wiederholen"
                  value={pwd2} onChange={e => setPwd2(e.target.value)} required />
              </div>
              <button type="submit" disabled={!name || !email || !pwd || !pwd2} className="btn-primary w-full py-3">
                Weiter →
              </button>
            </form>
          </>
        ) : (
          <>
            <h1 className="text-2xl font-bold text-white mb-1.5" style={{ fontFamily: 'Syne, sans-serif' }}>Dein Level?</h1>
            <p className="text-dim text-sm mb-7">Damit zeigen wir dir die passenden Spots.</p>

            <form onSubmit={handleRegister} className="space-y-3">
              {LEVELS.map(l => (
                <label key={l.id} onClick={() => setLevel(l.id)}
                  className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all ${
                    level === l.id
                      ? 'border-cyan bg-cyan/8 bg-cyan/[0.08]'
                      : 'border-white/10 bg-card2 hover:border-cyan/30'
                  }`}>
                  <div>
                    <p className={`font-semibold text-sm transition-colors ${level === l.id ? 'text-white' : 'text-dim'}`}>
                      {l.label}
                    </p>
                    <p className="text-xs text-dim mt-0.5">{l.desc}</p>
                  </div>
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                    level === l.id ? 'border-cyan' : 'border-dim/50'
                  }`}>
                    {level === l.id && <div className="w-2.5 h-2.5 rounded-full bg-cyan" />}
                  </div>
                </label>
              ))}

              <button type="submit" disabled={isPending} className="btn-primary w-full py-3 mt-2">
                {isPending
                  ? <span className="inline-block w-4 h-4 border-2 border-ink/30 border-t-ink rounded-full animate-spin" />
                  : 'Registrieren'}
              </button>
              <button type="button" onClick={() => setStep(1)}
                className="w-full text-center text-dim text-sm hover:text-white transition-colors py-2">
                ← Zurück
              </button>
            </form>
          </>
        )}

        <p className="text-center text-dim text-sm mt-6">
          Bereits registriert?{' '}
          <Link href="/auth/login" className="text-cyan font-semibold hover:underline">Anmelden</Link>
        </p>
      </div>
    </div>
  );
}

function mapError(msg: string) {
  if (msg.includes('already registered')) return 'Diese E-Mail ist bereits registriert.';
  if (msg.includes('Password should be')) return 'Passwort muss mindestens 8 Zeichen haben.';
  if (msg.includes('rate limit'))         return 'Zu viele Versuche. Bitte warte kurz.';
  return msg;
}
