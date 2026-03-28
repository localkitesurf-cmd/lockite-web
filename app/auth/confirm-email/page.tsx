// app/auth/confirm-email/page.tsx
import Link from 'next/link';

export default function ConfirmEmailPage() {
  return (
    <div className="min-h-screen bg-ink flex items-center justify-center px-4">
      <div className="text-center max-w-sm">
        <div className="text-6xl mb-6">📬</div>
        <h1 className="text-2xl font-bold text-white mb-3" style={{ fontFamily: 'Syne, sans-serif' }}>
          Fast fertig!
        </h1>
        <p className="text-dim leading-relaxed mb-8">
          Wir haben dir eine Bestätigungs-E-Mail geschickt.<br />
          Klicke auf den Link um deinen Account zu aktivieren.
        </p>
        <Link href="/auth/login" className="btn-secondary px-8">
          Zurück zur Anmeldung
        </Link>
      </div>
    </div>
  );
}
