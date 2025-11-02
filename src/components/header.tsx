import { Rss } from 'lucide-react';
import Link from 'next/link';

export function Header() {
  return (
    <header className="bg-card border-b shadow-sm sticky top-0 z-40">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <Link href="/" className="flex items-center gap-2">
          <Rss className="h-6 w-6 text-accent" />
          <h1 className="text-2xl font-headline font-bold text-primary">
            G1 Pulse
          </h1>
        </Link>
      </div>
    </header>
  );
}
