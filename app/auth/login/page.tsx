'use client';

import { useState, useTransition } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { supabaseBrowser } from '@/lib/supabase';

export default function LoginPage({
  searchParams,
}: {
  searchParams: { redirect?: string; error?: string };
}) {
  const router = useRouter();
  const [email,    setEmail]    = useState('');
  const [password, setPassword] = useState('');
  const [showPwd,  setShowPwd]  = useState(false);
  const [error,    setError]    = useState(searchParams.error ?? '');
  const [isPending, start]      = useTransition();

  const sb = supabaseBrowser();

  async function handleEmail(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    start(async () => {
      const { error } = await sb.auth.signInWithPassword({ email, password });
      if (error) { setError(mapError(error.message)); return; }
      router.push(searchParams.redirect ?? '/dashboard');
      router.refresh();
    });
  }

  async function handleOAuth(provider: 'google' | 'apple') {
    await sb.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/auth/callback?next=${searchParams.redirect ?? '/dashboard'}`,
      },
    });
  }

  return (
    <div className="min-h-screen bg-ink flex items-center justify-center px-4">
      {/* Glow */}
      <div className="fixed inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 40% at 50% 0%, rgba(0,194,203,0.06) 0%, transparent 60%)' }} />

      <div className="relative w-full max-w-sm">

        {/* Logo */}
        <div className="text-center mb-10">
          <Link href="/">
            <span className="text-4xl font-bold text-white" style={{ fontFamily: 'Syne, sans-serif', letterSpacing: '-0.04em' }}>
              LOCK<span className="text-cyan">ITE</span>
            </span>
          </Link>
        </div>

        <h1 className="text-2xl font-bold text-white mb-1.5" style={{ fontFamily: 'Syne, sans-serif' }}>Willkommen zurück.</h1>
        <p className="text-dim text-sm mb-7">Melde dich an, um deine Spots zu sehen.</p>

        {/* Error */}
        {error && (
          <div className="flex items-center gap-2 bg-red-400/10 border border-red-400/30 rounded-lg p-3 mb-5">
            <span className="text-red-400 text-sm flex-1">{error}</span>
            <button onClick={() => setError('')} className="text-red-400 text-xs">✕</button>
          </div>
        )}

        {/* OAuth */}
        <div className="flex flex-col gap-2.5 mb-5">
          {(['google', 'apple'] as const).map(p => (
            <button key={p} onClick={() => handleOAuth(p)}
              className="w-full h-12 bg-card2 border border-white/10 rounded-lg text-sm font-semibold text-white hover:border-cyan/30 hover:bg-card transition-all flex items-center justify-center gap-2.5">
              {p === 'google' ? '🌐' : '🍎'} Mit {p === 'google' ? 'Google' : 'Apple'} fortfahren
            </button>
          ))}
        </div>

        {/* Divider */}
        <div className="flex items-center gap-3 mb-5">
          <div className="flex-1 h-px bg-white/[0.07]" />
          <span className="text-dim text-xs font-medium">oder</span>
          <div className="flex-1 h-px bg-white/[0.07]" />
        </div>

        {/* Form */}
        <form onSubmit={handleEmail} className="space-y-4">
          <div>
            <label className="field-label">E-Mail</label>
            <input className="field-input" type="email" placeholder="max@example.com"
              value={email} onChange={e => setEmail(e.target.value)} required />
          </div>
          <div>
            <label className="field-label">Passwort</label>
            <div className="relative">
              <input className="field-input pr-10" type={showPwd ? 'text' : 'password'}
                placeholder="Mind. 8 Zeichen"
                value={password} onChange={e => setPassword(e.target.value)} required />
              <button type="button" onClick={() => setShowPwd(v => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-dim hover:text-white text-sm">
                {showPwd ? '🙈' : '👁️'}
              </button>
            </div>
          </div>

          <div className="text-right -mt-1">
            <Link href="/auth/forgot-password" className="text-xs text-cyan font-semibold hover:underline">
              Passwort vergessen?
            </Link>
          </div>

          <button type="submit" disabled={isPending || !email || !password} className="btn-primary w-full py-3">
            {isPending ? <span className="inline-block w-4 h-4 border-2 border-ink/30 border-t-ink rounded-full animate-spin" /> : 'Anmelden'}
          </button>
        </form>

        <p className="text-center text-dim text-sm mt-6">
          Noch kein Account?{' '}
          <Link href="/auth/register" className="text-cyan font-semibold hover:underline">Registrieren</Link>
        </p>
        <p className="text-center mt-3">
          <Link href="/" className="text-dim text-xs hover:text-white transition-colors">Als Gast fortfahren →</Link>
        </p>
      </div>
    </div>
  );
}

function mapError(msg: string) {
  if (msg.includes('Invalid login credentials')) return 'E-Mail oder Passwort falsch.';
  if (msg.includes('Email not confirmed'))       return 'Bitte bestätige zuerst deine E-Mail.';
  if (msg.includes('rate limit'))                return 'Zu viele Versuche. Bitte warte kurz.';
  return msg;
}
