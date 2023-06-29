export default function RecipeAccordionElement({ recipe, setRecipes }) {
    const ingredientUserHas = recipe.ingredients_user_has;
    const additionalIngredients = recipe.additional_ingredients_needed;
  
    function removeRecipe(recipeId) {
      setRecipes( prevRecipes => {
        return [...prevRecipes].filter( recipe => recipe.id !== recipeId);
      });
    }
    
    return (
      <div className='card' 
           key={recipe.id}>
        <div className="card-header" 
              id={`recipeHeader${recipe.id}`}>
          <div className='d-flex justify-content-center position-relative'>
            <h3 className='card-header-text'>
              <button className="btn btn-link pl-1" 
                      type="button" 
                      data-toggle="collapse" 
                      data-target={`#recipeCollapse${recipe.id}`} 
                      aria-expanded="true" 
                      aria-controls={`recipeCollapse${recipe.id}`}>
                { recipe.title }
              </button>
            </h3>
            <button className='remove-recipe-btn btn btn-outline-danger border-0 position-absolute'
                    onClick={() => removeRecipe(recipe.id)}>
              <svg xmlns="http://www.w3.org/2000/svg" 
                   width="16" 
                   height="16" 
                   fill="currentColor" 
                   className="bi bi-trash" 
                   viewBox="0 0 16 16">
                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"/>
                <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"/>
              </svg>
          </button>
          </div>
        </div>
        <div id={`recipeCollapse${recipe.id}`} 
             className="collapse" 
             aria-labelledby={`recipeHeader${recipe.id}`} >
          <div className="card-body">
            <h4 className='font-weight-bold'>Description</h4>
            <p>{ recipe.recipe_description }</p>
            <h4 className='font-weight-bold'>Ingredients You Have</h4>
            <ul>
              {ingredientUserHas.map(
                (ingredient, i = 0) => { return <li key={`${ingredient}UserHas${i}`}>{ingredient}</li> }
              )}
            </ul>
            <h4 className='font-weight-bold'>Inredients You Need</h4>
            <ul>
              {additionalIngredients.map(
                  (ingredient, i = 0) => { return <li key={`${ingredient}UserNeeds${i}`}>{ingredient}</li> }
              )}
            </ul>
          </div>
        </div>
      </div>
    );
  }