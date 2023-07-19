import '../App.css'
import FilterableRecipeTable from '../src/components/RecipeTable/FilterableRecipeTable';
import React from 'react';
import { RecipeInput } from '../typings';
import Head from 'next/head';

const USER_INPUT_DATA = {
  ingredients : ["ahi tuna", "avocado", "lemon"], 
  preferences: ["mexican",  "savory"],
};

const RECIPES : RecipeInput = [
  {
    id: 9271,
    title: "Mexican Tuna Ceviche",
    recipe_description: "Prepare a refreshing Mexican-style ceviche using fresh ahi tuna, diced avocado, lemon juice, and savory seasonings.",
    ingredients_user_has: ["ahi tuna", "avocado", "lemon"],
    additional_ingredients_needed: ["serrano pepper", "red onion", "cilantro", "tomato"]
  },
  {
    id: 9272,
    title: "Grilled Tuna Steak with Avocado Salsa",
    recipe_description: "Grill seasoned tuna steaks to perfection and serve them with a flavorful avocado salsa for a savory Mexican-inspired dish.",
    ingredients_user_has: ["ahi tuna", "avocado"],
    additional_ingredients_needed: ["lime juice", "red onion", "tomato", "jalapeno", "cilantro"]
  },
  {
    id: 9273,
    title: "Tuna Avocado Salad",
    recipe_description: "Create a delicious and savory salad by combining ahi tuna chunks with fresh avocado, lemon juice, and a variety of mixed greens.",
    ingredients_user_has: ["ahi tuna", "avocado", "lemon"],
    additional_ingredients_needed: ["mixed greens", "red onion", "cucumber", "cherry tomatoes", "olive oil"]
  }
];


export default function App() {
  return (
    <>
      <Head>
          <meta name="viewport" 
                content="width=device-width, initial-scale=1" />
          <meta
            name="description"
            content="Empty Fridge is an app designed to give you recipes based on ingredients and preferences."
          />
      </Head>
      <div>
        <FilterableRecipeTable recipeInput={RECIPES} />;
      </div>
    </>
  )
}