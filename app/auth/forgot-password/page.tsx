'use client';

import { useState } from 'react';
import Link from 'next/link';
import { supabaseBrowser } from '@/lib/supabase';

export default function ForgotPasswordPage() {
  const [email,   setEmail]  = useState('');
  const [sent,    setSent]   = useState(false);
  const [loading, setLoading]= useState(false);
  const [error,   setError]  = useState('');

  async function handleReset(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabaseBrowser().auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/reset-password`,
    });
    setLoading(false);
    if (error) { setError(error.message); return; }
    setSent(true);
  }

  return (
    <div className="min-h-screen bg-ink flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <Link href="/auth/login" className="flex items-center gap-1 text-cyan text-sm font-semibold mb-10 hover:underline">
          ← Zurück
        </Link>

        {sent ? (
          <div className="text-center">
            <div className="text-5xl mb-5">📬</div>
            <h1 className="text-2xl font-bold text-white mb-2" style={{ fontFamily: 'Syne, sans-serif' }}>E-Mail gesendet!</h1>
            <p className="text-dim text-sm leading-relaxed mb-8">Prüfe deinen Posteingang und klicke auf den Reset-Link.</p>
            <Link href="/auth/login" className="btn-secondary px-8">Zurück zur Anmeldung</Link>
          </div>
        ) : (
          <>
            <h1 className="text-3xl font-bold text-white mb-2 leading-tight" style={{ fontFamily: 'Syne, sans-serif', letterSpacing:'-0.04em' }}>
              Passwort<br />zurücksetzen.
            </h1>
            <p className="text-dim text-sm mb-8">Wir senden dir einen Reset-Link per E-Mail.</p>

            {error && (
              <div className="bg-red-400/10 border border-red-400/30 rounded-lg p-3 mb-5">
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}

            <form onSubmit={handleReset} className="space-y-4">
              <div>
                <label className="field-label">E-Mail</label>
                <input className="field-input" type="email" placeholder="max@example.com"
                  value={email} onChange={e => setEmail(e.target.value)} required />
              </div>
              <button type="submit" disabled={loading || !email.includes('@')} className="btn-primary w-full py-3">
                {loading
                  ? <span className="inline-block w-4 h-4 border-2 border-ink/30 border-t-ink rounded-full animate-spin" />
                  : 'Reset-Link senden'}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
