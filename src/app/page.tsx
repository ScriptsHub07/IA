"use client";

import { useState, useEffect } from 'react';
import { Header } from '@/components/chef-ia/Header';
import { SearchBar } from '@/components/chef-ia/SearchBar';
import { RandomRecipeButton } from '@/components/chef-ia/RandomRecipeButton';
import { RecipeDisplay } from '@/components/chef-ia/RecipeDisplay';
import { RecipeSkeleton } from '@/components/chef-ia/RecipeSkeleton';
import { generateRecipe, type GenerateRecipeOutput } from '@/ai/flows/generate-recipe';
import { brazilianDishNames } from '@/lib/dish-names';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { CookingPot, AlertTriangle } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";


export default function HomePage() {
  const [currentRecipe, setCurrentRecipe] = useState<GenerateRecipeOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  const [clientLoaded, setClientLoaded] = useState(false);

  useEffect(() => {
    setClientLoaded(true);
  }, []);

  const handleSearch = async (dishName: string) => {
    setIsLoading(true);
    setError(null);
    setCurrentRecipe(null); // Clear previous recipe

    try {
      const recipeOutput = await generateRecipe({ dishName });
      if (recipeOutput && recipeOutput.recipeName) {
        setCurrentRecipe(recipeOutput);
      } else {
        throw new Error("A IA não conseguiu gerar uma receita válida. Tente novamente.");
      }
    } catch (e) {
      console.error("Erro ao gerar receita:", e);
      const errorMessage = e instanceof Error ? e.message : "Ocorreu um erro desconhecido ao buscar a receita. Por favor, tente novamente.";
      setError(errorMessage);
      toast({
        variant: "destructive",
        title: "Erro ao gerar receita",
        description: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRandomRecipe = () => {
    if (!clientLoaded) return; // Prevent running on server
    const randomIndex = Math.floor(Math.random() * brazilianDishNames.length);
    const randomDish = brazilianDishNames[randomIndex];
    handleSearch(randomDish);
  };

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <main className="flex-grow container mx-auto p-4 md:p-8">
        <div className="max-w-3xl mx-auto space-y-8">
          <section aria-labelledby="search-section-title">
            <h2 id="search-section-title" className="sr-only">Buscar Receitas</h2>
            <SearchBar onSearch={handleSearch} isLoading={isLoading} />
          </section>

          <div className="text-center">
            <RandomRecipeButton onClick={handleRandomRecipe} isLoading={isLoading} />
          </div>

          {isLoading && <RecipeSkeleton />}
          
          {error && !isLoading && (
            <Alert variant="destructive" role="alert">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Erro!</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {!isLoading && currentRecipe && <RecipeDisplay recipe={currentRecipe} />}
          
          {!isLoading && !currentRecipe && !error && (
            <div className="text-center text-muted-foreground py-10 border-2 border-dashed border-border rounded-lg">
              <CookingPot size={60} className="mx-auto mb-4 text-primary" />
              <p className="text-lg font-medium">Bem-vindo ao Chef IA!</p>
              <p>Digite o nome de um prato para começar ou explore uma receita aleatória.</p>
            </div>
          )}
        </div>
      </main>
      <footer className="text-center p-6 text-sm text-muted-foreground border-t border-border">
        Criador - Pedro Henrique Natividade Pinto / Email - pedronatividade0404@gmail.com
      </footer>
    </div>
  );
}
