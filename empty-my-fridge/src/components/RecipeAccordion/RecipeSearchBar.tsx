import { useState } from 'react';
import { RecipeInputs, RecipeInput } from '@/typings';

export default function RecipeSearchBar({recipes, setRecipes, userInput}: RecipeInputs) {
    const [isLoading, setIsLoading] = useState(false);
    const [isPreferenceOrIngredientEmpty, setIsPreferenceOrIngredientEmpty] = useState(false);
    const [fetchRecipeFailure, setFetchRecipeFailure] = useState(false);
    
    function clearRecipes() {
      setRecipes(() => []);
    }

    async function fetchRecipes() {
      setFetchRecipeFailure(false);

      try {
        // User must input at least one ingredient and preference for API call to be successful
        if(!userInput.ingredients.length || !userInput.preferences.length) {
          setIsPreferenceOrIngredientEmpty(true);
          return;
        }

        // Make the API call with user's preferences and ingredients
        const response = await fetch('/api/recipes',
                                  {
                                    body: JSON.stringify(userInput),
                                    method: "POST"
                                  });
        if (!response.ok) {
          throw new Error('Failed to fetch recipes.');
        }
        
        let data: RecipeInput = await response.json();

        // Add new recipes to existing recipe output, update ids
        const allRecipes = [...recipes, ...data].map((recipe, index) => {return { ...recipe, id: index } });
        setRecipes(allRecipes);
      } catch (error) {
        // In the event we fail to fetch recipes or form is wrong, let the user know
        console.error('Error fetching recipes:', error);
        setFetchRecipeFailure(true);
      }

      setIsPreferenceOrIngredientEmpty(false);
    };
  
    async function findRecipes() {
      setIsLoading(true);
      await fetchRecipes();
      setIsLoading(false);
    }
  
    return (
      <>
        <form className='form-inline justify-content-center mb-4'>
          <button className={`btn btn-primary mr-2${isLoading ? ' isLoading' : ''} `}
                  type='button'
                  onClick={findRecipes}
                  disabled={isLoading}
                  >
            <span className={`spinner-grow spinner-grow-sm mr-1 ${isLoading ? '' : 'd-none'}`} 
                  role="status" 
                  aria-hidden="true"></span>
            {`${isLoading ? 'Loading...' : 'Find Recipes'}`}
          </button>
          <button className='btn btn-danger'
                  type='button'
                  onClick={clearRecipes}>
            Clear Recipes
          </button>
        </form>
        <div className={`text-center text-danger ${isPreferenceOrIngredientEmpty ? '' : 'd-none'}`}>Please input at least one ingredient and preference.</div>
        <div className={`text-center text-danger ${fetchRecipeFailure ? '' : 'd-none'}`}>Failed to fetch recipes. Try again or refresh the page. If refreshing doesn't work, contact project creator.</div>
      </>
    );
  }