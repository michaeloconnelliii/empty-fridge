import RecipeAccordionElement from './RecipeAccordionElement';
import RecipeSearchBar from './RecipeSearchBar';
import { ReactElement } from 'react';
import { RecipeInputSingle, RecipeInputs } from '@/typings';

export default function RecipeAccordion({ recipes, setRecipes, userInput }: RecipeInputs) {
    let RecipeAccordionElements: ReactElement<RecipeInputSingle>[] = [];
    recipes.forEach((recipe) => {
      RecipeAccordionElements.push(
        <RecipeAccordionElement
          key = { recipe.id }
          recipe = { recipe }
          setRecipes = { setRecipes } />
        );
      }
    );
  
    return (
      <div className='container'>
        <h2 className='text-center mb-4 font-weight-bold'>Recipes</h2>
        <RecipeSearchBar recipes={ recipes } 
                         setRecipes={ setRecipes }
                         userInput={ userInput } />
        <div className='accordion' 
             id='recipeAccordion'>
          { RecipeAccordionElements }
        </div>
      </div>
    );
  }