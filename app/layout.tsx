import type { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/next';
import PostHogProvider from '@/components/PostHogProvider';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'CipherCheck: Honest Cybersecurity Tool Comparisons',
    template: '%s | CipherCheck',
  },
  description:
    'Find the right VPN, password manager, or antivirus without the jargon. Real comparisons with documented scoring. Start with our free security quiz.',
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full flex flex-col bg-white text-[#22282e]">
        <PostHogProvider>
          {children}
        </PostHogProvider>
        <Analytics />
      </body>
    </html>
  );
}

