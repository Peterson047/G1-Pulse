import { getFeed } from '@/lib/rss';
import { Header } from '@/components/header';
import { ArticleCard } from '@/components/article-card';
import { CategoryPills } from '@/components/category-pills';

export const revalidate = 300; // Revalidate every 5 minutes

export default async function Home({
  searchParams,
}: {
  searchParams: { category?: string };
}) {
  const { articles, categories } = await getFeed();
  const selectedCategory = searchParams.category;

  const filteredArticles = selectedCategory && selectedCategory !== 'Todos'
    ? articles.filter(article => article.categories.includes(selectedCategory))
    : articles;

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="space-y-6">
          <CategoryPills categories={categories} selectedCategory={selectedCategory} />
          {filteredArticles.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredArticles.map(article => (
                <ArticleCard key={article.guid} article={article} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <h2 className="text-2xl font-headline font-semibold text-primary">Nenhuma notícia encontrada</h2>
              <p className="text-muted-foreground mt-2">
                Não há notícias disponíveis para a categoria selecionada.
              </p>
            </div>
          )}
        </div>
      </main>
      <footer className="py-4 border-t">
          <p className="text-center text-sm text-muted-foreground">
            G1 Pulse &copy; {new Date().getFullYear()}
          </p>
      </footer>
    </div>
  );
}
