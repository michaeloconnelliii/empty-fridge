import RecipeAccordionElement from './RecipeAccordionElement';
import RecipeSearchBar from './RecipeSearchBar';
import { ReactElement } from 'react';
import { RecipeInputSingle, RecipeInputs } from '@/types';

export default function RecipeAccordion({ recipes, setRecipes }: RecipeInputs) {
    let RecipeAccordionElements: ReactElement<RecipeInputSingle>[] = [];
    recipes.forEach((recipe) => {
      RecipeAccordionElements.push(
        <RecipeAccordionElement
          recipe = { recipe }
          setRecipes = { setRecipes } />
        );
      }
    );
  
    return (
      <div className='container'>
        <h2 className='text-center mb-4 font-weight-bold'>Recipes</h2>
        <RecipeSearchBar recipes={ recipes } 
                         setRecipes={ setRecipes } />
        <div className='accordion' 
             id='recipeAccordion'>
          { RecipeAccordionElements }
        </div>
      </div>
    );
  }