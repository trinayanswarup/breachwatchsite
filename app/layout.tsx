import type { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/next';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'BreachWatch — Honest Cybersecurity Tool Comparisons',
    template: '%s | BreachWatch',
  },
  description:
    'Find the right VPN, password manager, or antivirus without the jargon. Transparent scoring, real comparisons, no hidden bias. Start with our free 30-second security quiz.',
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full flex flex-col bg-white text-[#22282e]">
        {children}
        <Analytics />
      </body>
    </html>
  );
}

