import type { LucideIcon } from 'lucide-react';
import { CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface RecipeCardSectionProps {
  title: string;
  icon?: React.ReactNode; // Allow passing LucideIcon component instance
  children: React.ReactNode;
  className?: string;
}

export function RecipeCardSection({ title, icon, children, className }: RecipeCardSectionProps) {
  return (
    <div className={className}>
      <CardHeader className="pb-2 pt-4">
        <CardTitle className="text-xl font-headline flex items-center">
          {icon && <span className="mr-2">{icon}</span>}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="text-sm whitespace-pre-line leading-relaxed">
        {children}
      </CardContent>
    </div>
  );
}
