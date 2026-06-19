import type { Metadata } from 'next';
import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { fetchAllNews, type NewsItem, type NewsSource } from '@/lib/news';

export const metadata: Metadata = {
  title: 'Cybersecurity News Links and Privacy Updates | CipherCheck',
  description:
    'Curated cybersecurity, privacy, breach, vulnerability, and security-tool links with clear context and related CipherCheck tools.',
};

function timeAgo(date: Date): string {
  const diff = Date.now() - date.getTime();
  const minutes = Math.floor(diff / 60_000);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 30) {
    return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
  }

  if (days > 1) return `${days} days ago`;
  if (days === 1) return 'Yesterday';
  if (hours > 1) return `${hours} hours ago`;
  if (hours === 1) return '1 hour ago';
  if (minutes > 1) return `${minutes} minutes ago`;
  return 'Just now';
}

function getTopic(title: string): string {
  const lower = title.toLowerCase();

  if (lower.includes('breach') || lower.includes('leak')) return 'Breach';
  if (lower.includes('vpn') || lower.includes('privacy')) return 'Privacy';
  if (lower.includes('password') || lower.includes('passkey')) return 'Passwords';
  if (lower.includes('malware') || lower.includes('ransomware')) return 'Malware';
  if (lower.includes('vulnerability') || lower.includes('exploit') || lower.includes('cve')) {
    return 'Vulnerability';
  }

  return 'Security';
}

function getRelatedLink(topic: string): { href: string; label: string } {
  if (topic === 'Breach') {
    return { href: '/breaches', label: 'View recent breaches' };
  }

  if (topic === 'Privacy') {
    return { href: '/vpn', label: 'Compare VPNs' };
  }

  if (topic === 'Passwords') {
    return { href: '/breach-checker', label: 'Check a password' };
  }

  if (topic === 'Malware') {
    return { href: '/antivirus', label: 'Compare antivirus tools' };
  }

  if (topic === 'Vulnerability') {
    return { href: '/tools', label: 'View security tools' };
  }

  return { href: '/quiz', label: 'Find your biggest risk' };
}

function getWhyItMatters(item: NewsItem, topic: string): string {
  const lower = item.title.toLowerCase();
  const subject = item.title.replace(/\s+/g, ' ').trim();

  if (lower.includes('privacy') && (lower.includes('luxury') || lower.includes('paywall'))) {
    return 'Privacy is becoming something paid users get by default while free users absorb more tracking. That changes which free tools deserve trust.';
  }

  if (lower.includes('coupang') || (lower.includes('fine') && lower.includes('breach'))) {
    return 'Large breach penalties can push companies to invest in data protection, but affected users still need to watch for fraud and phishing.';
  }

  if (lower.includes('ai') && (lower.includes('malware') || lower.includes('scanner'))) {
    return 'Attackers are now testing how AI security layers can be manipulated. Traditional detection still matters while those filters mature.';
  }

  if (lower.includes('ransomware')) {
    return 'Ransomware stories matter when they expose which backups, patching habits, and recovery plans actually hold up under pressure.';
  }

  if (lower.includes('password') || lower.includes('credential') || lower.includes('passkey')) {
    return 'Credential stories are practical: they usually point to password reuse, weak recovery flows, or where passkeys reduce account takeover risk.';
  }

  if (lower.includes('cve') || lower.includes('zero-day') || lower.includes('exploit')) {
    return 'This is patch-priority news. The useful question is whether the affected software is on your devices or in a service you depend on.';
  }

  if (topic === 'Breach') {
    return `${subject} is a reminder to match your response to the leaked data: passwords, IDs, payment details, and emails require different next steps.`;
  }

  if (topic === 'Privacy') {
    return `${subject} affects trust decisions: who collects data, who pays for privacy, and which tools reduce tracking instead of adding more.`;
  }

  if (topic === 'Passwords') {
    return `${subject} connects directly to daily account security, especially password reuse, recovery settings, and passkey adoption.`;
  }

  if (topic === 'Malware') {
    return `${subject} matters if it changes what users should avoid, update, scan, or stop trusting.`;
  }

  if (topic === 'Vulnerability') {
    return `${subject} matters most if the affected software is installed, exposed to the internet, or used by a service you rely on.`;
  }

  return `${subject} is worth reading only if it leads to a concrete action: update, change a setting, verify an account, or ignore the panic.`;
}

function sourceBadgeClass(source: NewsSource): string {
  const styles: Record<NewsSource, string> = {
    HN: 'bg-orange-100 text-orange-700',
    'r/netsec': 'bg-bw-blue/10 text-bw-blue',
    'r/privacy': 'bg-green-100 text-green-700',
    'r/cybersecurity': 'bg-purple-100 text-purple-700',
  };

  return styles[source];
}

function NewsCard({ item }: { item: NewsItem }) {
  const topic = getTopic(item.title);
  const related = getRelatedLink(topic);

  return (
    <article className="flex flex-col rounded-[3px] border border-black/10 bg-white p-5 shadow-sm">
      <div className="flex flex-wrap items-center gap-2">
        <span
          className={`rounded-[3px] px-2 py-1 text-[11px] font-bold ${sourceBadgeClass(
            item.source
          )}`}
        >
          {item.source}
        </span>
        <span className="rounded-[3px] bg-bw-light px-2 py-1 text-[11px] font-bold text-bw-gray">
          {topic}
        </span>
        <span className="text-[12px] text-bw-gray">{timeAgo(item.publishedAt)}</span>
      </div>

      <h2 className="mt-4 text-[18px] font-bold leading-snug text-bw-black">
        <a
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-bw-blue"
        >
          {item.title}
        </a>
      </h2>

      <div className="mt-4 rounded-[3px] bg-bw-light p-4">
        <p className="text-[12px] font-bold uppercase tracking-[0.08em] text-bw-gray">
          Why it matters
        </p>
        <p className="mt-2 text-[13px] leading-5 text-bw-text">{getWhyItMatters(item, topic)}</p>
      </div>

      <div className="mt-auto flex flex-wrap items-center gap-4 pt-5">
        <a
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[13px] font-bold text-bw-blue underline hover:text-bw-blue-dark"
        >
          Open source link
        </a>
        <Link
          href={related.href}
          className="text-[13px] font-semibold text-bw-gray hover:text-bw-black"
        >
          {related.label}
        </Link>
      </div>
    </article>
  );
}

export default async function NewsPage() {
  const items = await fetchAllNews();

  return (
    <div className="flex min-h-screen flex-col">
      <Nav />
      <main className="flex-1">
        <section className="border-b border-black/10 px-5 py-12">
          <div className="mx-auto max-w-6xl">
            <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-bw-blue">
              Security news
            </p>
            <div className="mt-3 max-w-3xl">
              <h1 className="text-[34px] font-bold leading-tight text-bw-black">
                Latest cybersecurity links with clear context.
              </h1>
              <p className="mt-4 text-[15px] leading-7 text-bw-gray">
                Follow security, privacy, breach, and vulnerability items from public
                sources, organized with topic labels, action context, and related
                CipherCheck tools.
              </p>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-5 py-12">
          <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-[22px] font-bold text-bw-black">Latest curated links</h2>
              <p className="mt-1 text-[13px] text-bw-gray">
                Updated from public security and privacy sources.
              </p>
            </div>
            <Link
              href="/how-we-test"
              className="text-[13px] font-semibold text-bw-blue underline hover:text-bw-blue-dark"
            >
              How CipherCheck handles sources
            </Link>
          </div>

          {items.length > 0 ? (
            <div className="grid gap-4 lg:grid-cols-2">
              {items.map((item) => (
                <NewsCard key={item.id} item={item} />
              ))}
            </div>
          ) : (
            <div className="rounded-[3px] border border-black/10 bg-bw-light p-6">
              <h2 className="text-[18px] font-bold text-bw-black">
                News feed temporarily unavailable
              </h2>
              <p className="mt-2 text-[14px] leading-6 text-bw-gray">
                The public sources could not be reached. CipherCheck tools and breach
                checks still work without the news feed.
              </p>
              <Link
                href="/tools"
                className="mt-4 inline-block text-[13px] font-bold text-bw-blue underline hover:text-bw-blue-dark"
              >
                Go to free tools
              </Link>
            </div>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
}
