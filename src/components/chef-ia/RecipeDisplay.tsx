import type { GenerateRecipeOutput } from '@/ai/flows/generate-recipe';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { RecipeCardSection } from './RecipeCardSection';
import { Utensils, ListChecks, ClipboardList, ChefHat } from 'lucide-react';

interface RecipeDisplayProps {
  recipe: GenerateRecipeOutput;
}

export function RecipeDisplay({ recipe }: RecipeDisplayProps) {
  return (
    <Card className="shadow-lg">
      <RecipeCardSection title={recipe.recipeName} icon={<ChefHat className="text-primary" />}>
        {/* Recipe name is in title, content can be empty or a short description if available */}
      </RecipeCardSection>
      <Separator />
      <RecipeCardSection title="Ingredientes" icon={<ListChecks className="text-primary" />}>
        <p>{recipe.ingredients}</p>
      </RecipeCardSection>
      <Separator />
      <RecipeCardSection title="Modo de Preparo" icon={<Utensils className="text-primary" />}>
        <p>{recipe.preparationMethod}</p>
      </RecipeCardSection>
      <Separator />
      <RecipeCardSection title="Instruções Passo a Passo" icon={<ClipboardList className="text-primary" />}>
        <p>{recipe.instructions}</p>
      </RecipeCardSection>
    </Card>
  );
}
