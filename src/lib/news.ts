export type NewsSource = 'HN' | 'r/netsec' | 'r/privacy' | 'r/cybersecurity';

export interface NewsItem {
  id: string;
  title: string;
  url: string;
  source: NewsSource;
  publishedAt: Date;
}

const SECURITY_KEYWORDS = [
  'vpn',
  'password',
  'breach',
  'hacked',
  'hacker',
  'hackers',
  'security',
  'privacy',
  'malware',
  'ransomware',
  'phishing',
  'vulnerability',
  'exploit',
  'cyber',
  'encryption',
];

const EXCLUDED_LINK_HOSTS = ['github.com', 'gitlab.com', 'bitbucket.org'];
const EXCLUDED_TITLE_TERMS = ['hackathon'];
const HN_SEARCH_QUERIES = [
  'cybersecurity',
  'ransomware',
  'data breach',
  'vulnerability',
  'privacy',
];

export function isSecurityRelated(title: string): boolean {
  const lower = title.toLowerCase();
  if (EXCLUDED_TITLE_TERMS.some((term) => lower.includes(term))) return false;
  return SECURITY_KEYWORDS.some((kw) => lower.includes(kw));
}

export function isCuratedNewsLink(title: string, url?: string): boolean {
  const lowerTitle = title.trim().toLowerCase();
  if (
    lowerTitle.startsWith('show hn:') ||
    lowerTitle.startsWith('ask hn:') ||
    lowerTitle.startsWith('launch hn:')
  ) {
    return false;
  }

  if (!url) return true;

  try {
    const host = new URL(url).hostname.replace(/^www\./, '');
    return !EXCLUDED_LINK_HOSTS.some(
      (excludedHost) => host === excludedHost || host.endsWith(`.${excludedHost}`)
    );
  } catch {
    return false;
  }
}

interface HNSearchHit {
  objectID: string;
  title?: string;
  story_title?: string;
  url?: string;
  story_url?: string;
  created_at: string;
}

interface HNSearchResponse {
  hits: HNSearchHit[];
}

async function fetchHackerNewsSearch(): Promise<NewsItem[]> {
  const results = await Promise.allSettled(
    HN_SEARCH_QUERIES.map(async (query) => {
      const res = await fetch(
        `https://hn.algolia.com/api/v1/search_by_date?query=${encodeURIComponent(
          query
        )}&tags=story&hitsPerPage=10`,
        { next: { revalidate: 7200 } }
      );

      if (!res.ok) throw new Error(`HN search unavailable for ${query}`);
      return (await res.json()) as HNSearchResponse;
    })
  );

  return results.flatMap((result) => {
    if (result.status !== 'fulfilled') return [];

    return result.value.hits.flatMap((hit): NewsItem[] => {
      const title = hit.title ?? hit.story_title;
      const url = hit.url ?? hit.story_url;
      if (!title || !url) return [];
      if (!isSecurityRelated(title)) return [];
      if (!isCuratedNewsLink(title, url)) return [];

      return [
        {
          id: `hn-search-${hit.objectID}`,
          title,
          url,
          source: 'HN',
          publishedAt: new Date(hit.created_at),
        },
      ];
    });
  });
}

interface RedditPostData {
  id: string;
  title: string;
  permalink: string;
  url?: string;
  created_utc: number;
}

interface RedditChild {
  data: RedditPostData;
}

interface RedditListing {
  data: {
    children: RedditChild[];
  };
}

type RedditSource = 'netsec' | 'privacy' | 'cybersecurity';

function toNewsSource(sub: RedditSource): NewsSource {
  if (sub === 'netsec') return 'r/netsec';
  if (sub === 'privacy') return 'r/privacy';
  return 'r/cybersecurity';
}

async function fetchSubreddit(sub: RedditSource): Promise<NewsItem[]> {
  const res = await fetch(
    `https://www.reddit.com/r/${sub}/top.json?limit=35&t=week`,
    {
      next: { revalidate: 7200 },
      headers: { 'User-Agent': 'CipherCheck/1.0' },
    }
  );
  if (!res.ok) throw new Error(`r/${sub} unavailable`);

  const data = (await res.json()) as RedditListing;
  const source = toNewsSource(sub);

  return data.data.children
    .filter((child) => isCuratedNewsLink(child.data.title, child.data.url))
    .slice(0, 3)
    .map((child) => ({
      id: `${sub}-${child.data.id}`,
      title: child.data.title,
      url: child.data.url ?? `https://www.reddit.com${child.data.permalink}`,
      source,
      publishedAt: new Date(child.data.created_utc * 1000),
    }));
}

export async function fetchAllNews(): Promise<NewsItem[]> {
  const results = await Promise.allSettled([
    fetchHackerNewsSearch(),
    fetchSubreddit('netsec'),
    fetchSubreddit('privacy'),
    fetchSubreddit('cybersecurity'),
  ]);

  const all: NewsItem[] = [];
  for (const result of results) {
    if (result.status === 'fulfilled') {
      all.push(...result.value);
    }
  }

  const seen = new Set<string>();
  return all
    .filter((item) => {
      if (seen.has(item.url)) return false;
      seen.add(item.url);
      return true;
    })
    .sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime())
    .slice(0, 9);
}
