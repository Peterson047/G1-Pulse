import { getFeed } from '@/lib/rss';
import { notFound } from 'next/navigation';
import { Header } from '@/components/header';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft, Calendar, User } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { ArticleSummary } from '@/components/article-summary';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { generateSlug } from '@/lib/utils';
import type { Article } from '@/types';

export const revalidate = 300; // Revalidate every 5 minutes

export async function generateStaticParams() {
  const { articles } = await getFeed();
 
  return articles.map((article: Article) => ({
    slug: generateSlug(article.guid),
  }));
}

export default async function ArticlePage({ params }: { params: { slug: string } }) {
  const { articles } = await getFeed();
  const article = articles.find(a => generateSlug(a.guid) === params.slug);

  if (!article) {
    notFound();
  }

  const formattedDate = format(new Date(article.isoDate), "d 'de' MMMM 'de' yyyy 'às' HH:mm", {
    locale: ptBR,
  });

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <article className="max-w-4xl mx-auto">
          <div className="mb-8">
            <Button asChild variant="outline" size="sm">
              <Link href="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Voltar para as notícias
              </Link>
            </Button>
          </div>

          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {article.categories.map(cat => (
                <Badge key={cat} variant="secondary">{cat}</Badge>
              ))}
            </div>

            <h1 className="text-3xl md:text-4xl font-headline font-bold text-primary leading-tight">
              {article.title}
            </h1>
            
            <div className="flex flex-col sm:flex-row sm:items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <span>{article.creator}</span>
                </div>
                <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <time dateTime={article.isoDate}>{formattedDate}</time>
                </div>
            </div>
          </div>
          
          <Separator className="my-8" />
          
          <div 
            className="prose prose-lg dark:prose-invert max-w-none text-foreground space-y-6"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />

          <Separator className="my-8" />

          <ArticleSummary contentToSummarize={article.contentSnippet} />

        </article>
      </main>
    </div>
  );
}
