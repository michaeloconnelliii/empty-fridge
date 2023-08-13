import { useEffect, useState } from 'react';
import FilterableUserPreferenceTable from '../UserPreferenceTable/FilterableUserPreferenceTable';
import RecipeAccordion from '../RecipeAccordion/RecipeAccordion'
import { RecipeInput, UserInput } from '@/typings';

interface FilterableRecipeTableProps {
  recipeInput: RecipeInput;
}

export default function FilterableRecipeTable({ recipeInput }: FilterableRecipeTableProps) {
    const [userPreferences, setUserPreferences] = useState<UserInput>({ ingredients: [], preferences: [] });
    const [recipes, setRecipes] = useState<RecipeInput>(recipeInput);

    return (
      <div className='container'>
        <h1 className='mb-4 mt-5 text-center font-weight-bold'>Empty Fridge</h1>
        <FilterableUserPreferenceTable userInput={userPreferences} setUserPreferences={setUserPreferences} />
        <RecipeAccordion recipes={recipes} setRecipes={setRecipes} userInput={userPreferences} />
      </div>
    );
  }