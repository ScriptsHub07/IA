"use client";

import { useState, type FormEvent } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';

interface SearchBarProps {
  onSearch: (dishName: string) => void;
  isLoading: boolean;
}

export function SearchBar({ onSearch, isLoading }: SearchBarProps) {
  const [dishName, setDishName] = useState('');

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (dishName.trim()) {
      onSearch(dishName.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 items-center">
      <Input
        type="text"
        value={dishName}
        onChange={(e) => setDishName(e.target.value)}
        placeholder="Digite o nome do prato (ex: Bolo de Chocolate)"
        className="flex-grow"
        disabled={isLoading}
        aria-label="Nome do Prato"
      />
      <Button type="submit" disabled={isLoading || !dishName.trim()} aria-label="Buscar Receita">
        <Search className="mr-2 h-4 w-4" />
        {isLoading ? 'Buscando...' : 'Buscar'}
      </Button>
    </form>
  );
}
