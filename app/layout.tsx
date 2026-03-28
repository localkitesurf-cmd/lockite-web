import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: { default: 'Lockite — Find Your Perfect Kitesurf Spot', template: '%s | Lockite' },
  description: 'Real-time wind data, worldwide kitesurf spots, and smart travel planning. All in one app.',
  keywords: ['kitesurf', 'kiteboarding', 'wind forecast', 'kite spots', 'kite travel'],
  openGraph: {
    title: 'Lockite — Find Your Perfect Kitesurf Spot',
    description: 'Real-time wind data, worldwide kitesurf spots, and smart travel planning.',
    siteName: 'Lockite',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" className="dark">
      <body>{children}</body>
    </html>
  );
}
