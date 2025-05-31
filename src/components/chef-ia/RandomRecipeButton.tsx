"use client";

import { Button } from '@/components/ui/button';
import { Shuffle } from 'lucide-react';

interface RandomRecipeButtonProps {
  onClick: () => void;
  isLoading: boolean;
}

export function RandomRecipeButton({ onClick, isLoading }: RandomRecipeButtonProps) {
  return (
    <Button variant="outline" onClick={onClick} disabled={isLoading} aria-label="Gerar Receita Aleatória">
      <Shuffle className="mr-2 h-4 w-4" />
      {isLoading ? 'Gerando...' : 'Receita Aleatória'}
    </Button>
  );
}
