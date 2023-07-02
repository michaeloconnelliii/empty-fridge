import { useState } from 'react';
import { RecipeInputs } from '@/types';

export default function RecipeSearchBar({recipes, setRecipes}: RecipeInputs) {
    const [isLoading, setIsLoading] = useState(false);
    
    function clearRecipes() {
      setRecipes(() => []);
    }
  
    function findRecipes() {
      setIsLoading(true);
  
      setRecipes( prevRecipes => {
        let updatedRecipes = [...prevRecipes];
  
        setTimeout(() => {
          console.log("Delayed for 3 seconds.");
          setIsLoading(false);
        }, 3000);
  
        return prevRecipes;
      });
    }
  
    return (
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
    );
  }