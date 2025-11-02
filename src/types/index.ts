export interface Article {
  guid: string;
  title: string;
  link: string;
  pubDate: string;
  creator: string;
  content: string; // The full HTML content from description
  contentSnippet: string; // The text snippet
  categories: string[];
  isoDate: string;
  imageUrl: string | null;
}
