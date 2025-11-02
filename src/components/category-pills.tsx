import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

interface CategoryPillsProps {
  categories: string[];
  selectedCategory?: string;
}

export function CategoryPills({ categories, selectedCategory }: CategoryPillsProps) {
  const allCategories = ["Todos", ...categories];

  return (
    <nav className="flex items-center space-x-2 overflow-x-auto pb-4">
      {allCategories.map((category) => {
        const isSelected = (!selectedCategory && category === "Todos") || selectedCategory === category;
        const href = category === "Todos" ? "/" : `/?category=${encodeURIComponent(category)}`;
        
        return (
          <Link
            key={category}
            href={href}
            className={cn(
              buttonVariants({ 
                variant: isSelected ? 'default' : 'outline', 
                size: 'sm' 
              }),
              "rounded-full whitespace-nowrap",
              isSelected 
                ? 'bg-primary text-primary-foreground hover:bg-primary/90' 
                : 'bg-card text-card-foreground hover:bg-accent/10'
            )}
            aria-current={isSelected ? "page" : undefined}
          >
            {category}
          </Link>
        );
      })}
    </nav>
  );
}
