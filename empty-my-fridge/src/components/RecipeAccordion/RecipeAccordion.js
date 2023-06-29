import RecipeAccordionElement from './RecipeAccordionElement';
import RecipeSearchBar from './RecipeSearchBar';

export default function RecipeAccordion({ recipes, setRecipes }) {
    let RecipeAccordionElements = [];
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
        <RecipeSearchBar setRecipes={setRecipes} />
        <div className='accordion' 
             id='recipeAccordion'>
          { RecipeAccordionElements }
        </div>
      </div>
    );
  }