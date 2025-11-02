import type { Article } from '@/types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Calendar, Tag } from 'lucide-react';
import { Badge } from './ui/badge';
import { generateSlug } from '@/lib/utils';

export function ArticleCard({ article }: { article: Article }) {
  const slug = generateSlug(article.guid);
  
  const timeAgo = formatDistanceToNow(new Date(article.isoDate), {
    addSuffix: true,
    locale: ptBR,
  });

  return (
    <Link href={`/noticias/${slug}`} className="group block">
      <Card className="h-full flex flex-col overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
        <CardHeader className="p-0">
          {article.imageUrl ? (
            <div className="aspect-video overflow-hidden relative">
              <Image
                src={article.imageUrl}
                alt={article.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
          ) : (
             <div className="aspect-video bg-muted flex items-center justify-center">
                <span className="text-muted-foreground text-sm">Sem imagem</span>
             </div>
          )}
        </CardHeader>
        <CardContent className="flex-grow p-4 space-y-2">
          <CardTitle className="font-headline text-lg leading-tight group-hover:text-accent transition-colors">
            {article.title}
          </CardTitle>
        </CardContent>
        <CardFooter className="p-4 pt-0 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 text-xs text-muted-foreground">
           <div className="flex items-center gap-2">
            <Calendar className="w-3.5 h-3.5" />
            <time dateTime={article.isoDate}>{timeAgo}</time>
          </div>
          {article.categories[0] && (
            <div className="flex items-center gap-2">
                <Tag className="w-3.5 h-3.5" />
                <Badge variant="secondary" className="whitespace-nowrap">{article.categories[0]}</Badge>
            </div>
          )}
        </CardFooter>
      </Card>
    </Link>
  );
}
