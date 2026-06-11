import { fetchAllNews } from '@/lib/news';
import type { NewsItem, NewsSource } from '@/lib/news';
import Link from 'next/link';

function timeAgo(date: Date): string {
  const diff = Date.now() - date.getTime();
  const minutes = Math.floor(diff / 60_000);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 30)
    return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
  if (days > 1) return `${days} days ago`;
  if (days === 1) return 'Yesterday';
  if (hours > 1) return `${hours} hours ago`;
  if (hours === 1) return '1 hour ago';
  if (minutes > 1) return `${minutes} minutes ago`;
  return 'Just now';
}

interface SourceBadgeProps {
  source: NewsSource;
}

function SourceBadge({ source }: SourceBadgeProps) {
  const styles: Record<NewsSource, string> = {
    HN: 'bg-orange-100 text-orange-700',
    'r/netsec': 'bg-bw-blue/10 text-bw-blue',
    'r/privacy': 'bg-green-100 text-green-700',
  };
  return (
    <span
      className={`rounded-[3px] px-2 py-0.5 text-xs font-semibold ${styles[source]}`}
    >
      {source}
    </span>
  );
}

interface NewsCardProps {
  item: NewsItem;
}

function NewsCard({ item }: NewsCardProps) {
  return (
    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col gap-2 rounded-[3px] border border-black/10 bg-white p-4 shadow-sm transition-all hover:border-bw-blue hover:shadow-md"
    >
      <p className="text-sm font-medium text-bw-black leading-snug group-hover:text-bw-blue transition-colors line-clamp-3">
        {item.title}
      </p>
      <div className="mt-auto flex items-center gap-2">
        <SourceBadge source={item.source} />
        <span className="text-xs text-bw-gray">{timeAgo(item.publishedAt)}</span>
        <span
          className="ml-auto text-gray-300 group-hover:text-blue-400 transition-colors text-xs"
          aria-hidden="true"
        >
          ↗
        </span>
      </div>
    </a>
  );
}

export default async function SecurityNews() {
  const items = await fetchAllNews();
  if (items.length === 0) return null;

  return (
    <section className="border-t border-black/10 bg-white px-4 py-16">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-bw-black">Security News</h2>
            <p className="mt-1 text-bw-gray">Latest from the security community</p>
          </div>
          <Link
            href="/news"
            className="text-sm font-semibold text-bw-blue underline hover:text-bw-blue-dark"
          >
            View all news -&gt;
          </Link>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <NewsCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
