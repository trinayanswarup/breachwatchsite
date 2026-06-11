import { fetchAllNews } from '@/lib/news';
import type { NewsItem, NewsSource } from '@/lib/news';

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
    'r/netsec': 'bg-blue-100 text-blue-700',
    'r/privacy': 'bg-green-100 text-green-700',
  };
  return (
    <span
      className={`rounded-full px-2 py-0.5 text-xs font-semibold ${styles[source]}`}
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
      className="group flex flex-col gap-2 rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-all hover:border-blue-200 hover:shadow-md"
    >
      <p className="text-sm font-medium text-gray-800 leading-snug group-hover:text-blue-700 transition-colors line-clamp-3">
        {item.title}
      </p>
      <div className="mt-auto flex items-center gap-2">
        <SourceBadge source={item.source} />
        <span className="text-xs text-gray-400">{timeAgo(item.publishedAt)}</span>
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
    <section className="border-t border-gray-100 bg-white px-4 py-16">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-2xl font-bold text-gray-900">Security News</h2>
        <p className="mt-1 text-gray-500">Latest from the security community</p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <NewsCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
