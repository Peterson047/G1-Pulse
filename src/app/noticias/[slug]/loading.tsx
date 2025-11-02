import { Header } from "@/components/header";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft } from "lucide-react";

export default function ArticleLoading() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <div className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium h-9 px-3 border border-input bg-background">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar para as notícias
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex gap-2">
                <Skeleton className="h-6 w-24 rounded-md" />
                <Skeleton className="h-6 w-32 rounded-md" />
            </div>
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-8 w-4/5" />

            <div className="flex gap-4 text-sm">
                <Skeleton className="h-5 w-32" />
                <Skeleton className="h-5 w-48" />
            </div>
          </div>

          <Skeleton className="h-px w-full my-8" />

          <div className="space-y-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
