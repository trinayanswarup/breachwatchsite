export type NewsSource = 'HN' | 'r/netsec' | 'r/privacy';

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
  'hack',
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

function isSecurityRelated(title: string): boolean {
  const lower = title.toLowerCase();
  return SECURITY_KEYWORDS.some((kw) => lower.includes(kw));
}

interface HNStory {
  id: number;
  type: string;
  title: string;
  url?: string;
  time: number;
}

async function fetchHackerNews(): Promise<NewsItem[]> {
  const idsRes = await fetch(
    'https://hacker-news.firebaseio.com/v0/topstories.json',
    { next: { revalidate: 7200 } }
  );
  if (!idsRes.ok) throw new Error('HN top stories unavailable');

  const ids = (await idsRes.json()) as number[];
  const first30 = ids.slice(0, 30);

  const stories = await Promise.all(
    first30.map(async (id) => {
      try {
        const r = await fetch(
          `https://hacker-news.firebaseio.com/v0/item/${id}.json`,
          { next: { revalidate: 7200 } }
        );
        if (!r.ok) return null;
        return (await r.json()) as HNStory;
      } catch {
        return null;
      }
    })
  );

  const matching: NewsItem[] = [];
  for (const story of stories) {
    if (!story || story.type !== 'story' || !story.title) continue;
    if (!isSecurityRelated(story.title)) continue;
    matching.push({
      id: `hn-${story.id}`,
      title: story.title,
      url: story.url ?? `https://news.ycombinator.com/item?id=${story.id}`,
      source: 'HN',
      publishedAt: new Date(story.time * 1000),
    });
    if (matching.length === 4) break;
  }
  return matching;
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

function toNewsSource(sub: 'netsec' | 'privacy'): NewsSource {
  return sub === 'netsec' ? 'r/netsec' : 'r/privacy';
}

async function fetchSubreddit(sub: 'netsec' | 'privacy'): Promise<NewsItem[]> {
  const res = await fetch(
    `https://www.reddit.com/r/${sub}/top.json?limit=10&t=week`,
    {
      next: { revalidate: 7200 },
      headers: { 'User-Agent': 'BreachWatch/1.0' },
    }
  );
  if (!res.ok) throw new Error(`r/${sub} unavailable`);

  const data = (await res.json()) as RedditListing;
  const source = toNewsSource(sub);

  return data.data.children.slice(0, 3).map((child) => ({
    id: `${sub}-${child.data.id}`,
    title: child.data.title,
    url: child.data.url ?? `https://www.reddit.com${child.data.permalink}`,
    source,
    publishedAt: new Date(child.data.created_utc * 1000),
  }));
}

export async function fetchAllNews(): Promise<NewsItem[]> {
  const results = await Promise.allSettled([
    fetchHackerNews(),
    fetchSubreddit('netsec'),
    fetchSubreddit('privacy'),
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
