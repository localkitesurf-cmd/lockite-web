import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-ink flex items-center justify-center px-4 text-center">
      <div>
        <div className="text-6xl mb-6">🌊</div>
        <h1 className="text-5xl font-bold text-white mb-3" style={{ fontFamily:'Syne,sans-serif', letterSpacing:'-0.04em' }}>
          404
        </h1>
        <p className="text-dim mb-8 font-light">Diese Seite ist nicht aufgetaucht.</p>
        <Link href="/" className="btn-primary px-8 inline-flex">← Zur Startseite</Link>
      </div>
    </div>
  );
}
