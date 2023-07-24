import { useState } from 'react';
import { RecipeInputs, RecipeInput } from '@/typings';

export default function RecipeSearchBar({recipes, setRecipes, userInput}: RecipeInputs) {
    const [isLoading, setIsLoading] = useState(false);
    const [isPreferenceOrIngredientEmpty, setIsPreferenceOrIngredientEmpty] = useState(false);
    
    function clearRecipes() {
      setRecipes(() => []);
    }

    async function fetchRecipes() {
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
        
        const data: RecipeInput = await response.json();
        
        // Add new recipes to existing recipe output
        setRecipes(prevRecipes => [...prevRecipes, ...data]);
      } catch (error) {
        console.error('Error fetching recipes:', error);
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
      </>
    );
  }