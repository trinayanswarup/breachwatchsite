import type { Metadata } from 'next';
import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { fetchAllNews, type NewsItem, type NewsSource } from '@/lib/news';

export const metadata: Metadata = {
  title: 'Cybersecurity News Links and Privacy Updates | BreachWatch',
  description:
    'Curated cybersecurity, privacy, breach, and security-tool links from public communities and external sources. No copied articles or fake newsroom content.',
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

function getWhyItMatters(topic: string): string {
  if (topic === 'Breach') {
    return 'Breaches often turn into password reuse, phishing, and account takeover risk.';
  }

  if (topic === 'Privacy') {
    return 'Privacy stories can change which tools and habits are worth trusting.';
  }

  if (topic === 'Passwords') {
    return 'Password and passkey changes directly affect everyday account security.';
  }

  if (topic === 'Malware') {
    return 'Malware news matters when it changes what normal users should avoid or update.';
  }

  if (topic === 'Vulnerability') {
    return 'Vulnerabilities matter most when they are exploitable or affect software you use.';
  }

  return 'Security news is most useful when it points to a concrete action, not panic.';
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
        <p className="mt-2 text-[13px] leading-5 text-bw-text">{getWhyItMatters(topic)}</p>
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
                Curated cybersecurity links without copied articles or fake reporting.
              </h1>
              <p className="mt-4 text-[15px] leading-7 text-bw-gray">
                BreachWatch links to public security and privacy discussions, then adds a
                short rule-based context line and a related BreachWatch tool. These are
                external stories, not original reporting.
              </p>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-5 py-12">
          <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-[22px] font-bold text-bw-black">Latest curated links</h2>
              <p className="mt-1 text-[13px] text-bw-gray">
                Updated from Hacker News, r/netsec, r/privacy, and r/cybersecurity.
              </p>
            </div>
            <Link
              href="/how-we-test"
              className="text-[13px] font-semibold text-bw-blue underline hover:text-bw-blue-dark"
            >
              How BreachWatch handles sources
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
                The public sources could not be reached. BreachWatch tools and breach
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
