import Parser from 'rss-parser';
import type { Article } from '@/types';

// In a real app, you might use a more robust cache like Redis or Next.js's fetch cache.
// For this example, a simple in-memory cache is sufficient to avoid re-fetching on every navigation in dev.
let cachedFeed: { articles: Article[]; categories: string[]; timestamp: number } | null = null;
const CACHE_DURATION = 1000 * 60 * 5; // 5 minutes

const parser = new Parser<{}, { creator: string }>({
  customFields: {
    item: ['creator'],
  },
});

const extractImageUrl = (description: string): string | null => {
  if (!description) return null;
  const imgMatch = description.match(/<img[^>]+src="([^">]+)"/);
  return imgMatch ? imgMatch[1] : null;
};

const cleanHtml = (html: string): string => {
  if (!html) return '';
  // This is a simplified version. For a production app, a more robust library might be needed.
  return html.replace(/<[^>]*>?/gm, '');
};

export const getFeed = async (): Promise<{ articles: Article[]; categories:string[] }> => {
  const now = Date.now();
  if (cachedFeed && now - cachedFeed.timestamp < CACHE_DURATION) {
    return cachedFeed;
  }

  const feedUrl = 'https://g1.globo.com/rss/g1/brasil/';
  
  try {
    const feed = await parser.parseURL(feedUrl);
    
    const articles: Article[] = feed.items
      .map((item) => {
        if (!item.title || !item.link || !item.guid) {
          return null;
        }
        return {
          guid: item.guid,
          title: item.title,
          link: item.link,
          pubDate: item.pubDate || new Date().toISOString(),
          creator: item.creator || 'G1',
          content: item.content || '',
          contentSnippet: cleanHtml(item.content) || item.contentSnippet || '',
          categories: (item.categories || []).filter(c => c && typeof c === 'string'),
          isoDate: item.isoDate || new Date().toISOString(),
          imageUrl: extractImageUrl(item.content || ''),
        };
      })
      .filter((article): article is Article => article !== null);

    const allCategories = articles.flatMap(article => article.categories);
    const uniqueCategories = [...new Set(allCategories)];

    cachedFeed = { articles, categories: uniqueCategories, timestamp: now };
    
    return cachedFeed;
  } catch (error) {
    console.error("Failed to fetch or parse RSS feed:", error);
    // Return empty state or throw error, depending on desired behavior
    return { articles: [], categories: [] };
  }
};
