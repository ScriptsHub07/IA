import { ChefHat } from 'lucide-react';

export function Header() {
  return (
    <header className="bg-card border-b border-border shadow-sm">
      <div className="container mx-auto px-4 py-4 md:px-8 flex items-center">
        <ChefHat className="h-8 w-8 mr-3 text-primary" />
        <h1 className="text-3xl font-bold font-headline text-foreground">
          Chef IA
        </h1>
      </div>
    </header>
  );
}
