import '../App.css'
import FilterableRecipeTable from '../src/components/RecipeTable/FilterableRecipeTable';
import React, { useEffect, useState } from 'react';
import { RecipeInput } from '../typings';
import Head from 'next/head';

export default function App() {
  // TODO: Add recipe and user preference state from browser storage
  const [recipes, setRecipes] = useState<RecipeInput | null>([]);
  
  return (
    <>
      <Head>
          <meta name="viewport" 
                content="width=device-width, initial-scale=1" />
          <meta name="description"
                content="Empty Fridge is an app designed to give you recipes based on ingredients and preferences." />
      </Head>
      <div>
        <FilterableRecipeTable recipeInput={recipes} />;
      </div>
    </>
  )
}