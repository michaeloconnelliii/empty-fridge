import React, { useState } from 'react';
import FilterableUserPreferenceTable from '../UserPreferenceTable/FilterableUserPreferenceTable';
import RecipeAccordion from '../RecipeAccordion/RecipeAccordion'

export default function FilterableRecipeTable({recipeInput}) {
    const [userPreferences, setUserPreferences] = useState({ 'ingredients': [], 'preferences': [] });
    const [recipes, setRecipes] = useState(recipeInput);
  
    return (
      <div className='container'>
        <h1 className='mb-4 mt-3 text-center font-weight-bold'>Empty Fridge</h1>
        <FilterableUserPreferenceTable userInput={userPreferences} setUserPreferences={setUserPreferences} />
        <RecipeAccordion recipes={recipes} setRecipes={setRecipes} />
      </div>
    );
  }