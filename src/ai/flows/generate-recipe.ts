'use server';

/**
 * @fileOverview Generates a recipe from a dish name.
 *
 * - generateRecipe - A function that generates a recipe given the name of a dish.
 * - GenerateRecipeInput - The input type for the generateRecipe function.
 * - GenerateRecipeOutput - The return type for the generateRecipe function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateRecipeInputSchema = z.object({
  dishName: z.string().describe('The name of the dish to generate a recipe for (in Portuguese).'),
});
export type GenerateRecipeInput = z.infer<typeof GenerateRecipeInputSchema>;

const GenerateRecipeOutputSchema = z.object({
  recipeName: z.string().describe('The name of the recipe.'),
  ingredients: z.string().describe('A list of ingredients for the recipe.'),
  instructions: z.string().describe('Step-by-step instructions for preparing the recipe.'),
  preparationMethod: z.string().describe('Description of the preparation method.'),
});
export type GenerateRecipeOutput = z.infer<typeof GenerateRecipeOutputSchema>;

export async function generateRecipe(input: GenerateRecipeInput): Promise<GenerateRecipeOutput> {
  return generateRecipeFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateRecipePrompt',
  input: {schema: GenerateRecipeInputSchema},
  output: {schema: GenerateRecipeOutputSchema},
  prompt: `Você é um chef de cozinha especializado em criar receitas detalhadas a partir do nome de um prato.

  Gere uma receita completa para o prato "{{dishName}}", incluindo os seguintes detalhes:

  - recipeName: O nome da receita.
  - ingredients: Uma lista dos ingredientes necessários.
  - instructions: Instruções passo a passo detalhadas para o preparo.
  - preparationMethod: Uma descrição do método de preparo.
  \n  Certifique-se de que a receita esteja em Português do Brasil.
  `,
});

const generateRecipeFlow = ai.defineFlow(
  {
    name: 'generateRecipeFlow',
    inputSchema: GenerateRecipeInputSchema,
    outputSchema: GenerateRecipeOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
