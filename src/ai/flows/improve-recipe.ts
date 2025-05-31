'use server';

/**
 * @fileOverview A recipe improvement AI agent.
 *
 * - improveRecipe - A function that handles the recipe improvement process.
 * - ImproveRecipeInput - The input type for the improveRecipe function.
 * - ImproveRecipeOutput - The return type for the improveRecipe function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ImproveRecipeInputSchema = z.object({
  recipeName: z.string().describe('The name of the recipe to improve.'),
  recipe: z.string().describe('The original recipe.'),
  improvementInstructions: z.string().describe('Instructions on how to improve the recipe, e.g., \"make it healthier\", \"make it vegetarian\".'),
});
export type ImproveRecipeInput = z.infer<typeof ImproveRecipeInputSchema>;

const ImproveRecipeOutputSchema = z.object({
  improvedRecipe: z.string().describe('The improved recipe.'),
});
export type ImproveRecipeOutput = z.infer<typeof ImproveRecipeOutputSchema>;

export async function improveRecipe(input: ImproveRecipeInput): Promise<ImproveRecipeOutput> {
  return improveRecipeFlow(input);
}

const prompt = ai.definePrompt({
  name: 'improveRecipePrompt',
  input: {schema: ImproveRecipeInputSchema},
  output: {schema: ImproveRecipeOutputSchema},
  prompt: `You are an expert chef specializing in improving recipes.

You will take the original recipe and improve it based on the instructions.

Recipe Name: {{{recipeName}}}
Original Recipe: {{{recipe}}}
Improvement Instructions: {{{improvementInstructions}}}

Improved Recipe: `,
});

const improveRecipeFlow = ai.defineFlow(
  {
    name: 'improveRecipeFlow',
    inputSchema: ImproveRecipeInputSchema,
    outputSchema: ImproveRecipeOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
