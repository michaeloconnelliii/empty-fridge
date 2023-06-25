import './App.css';
import React, { useState } from 'react';

function RecipeAccordionElement({ recipe, setRecipes }) {
  const ingredientUserHas = recipe.ingredients_user_has;
  const additionalIngredients = recipe.additional_ingredients_needed;

  function removeRecipe(recipeId) {
    setRecipes( prevRecipes => {
      return [...prevRecipes].filter( recipe => recipe.id !== recipeId);
    });
  }
  
  return (
    <div className='card'>
      <div className="card-header" id={`recipeHeader${recipe.id}`}>
        <div className='d-flex justify-content-center position-relative'>
          <h3 className='card-header-text'>
            <button className="btn btn-link pl-1" type="button" data-toggle="collapse" data-target={`#recipeCollapse${recipe.id}`} aria-expanded="true" aria-controls={`recipeCollapse${recipe.id}`}>
              { recipe.title }
            </button>
          </h3>
          <button className='remove-recipe-btn btn btn-outline-danger border-0 position-absolute'
                  onClick={() => removeRecipe(recipe.id)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
              <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"/>
              <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"/>
            </svg>
        </button>
        </div>
      </div>
      <div id={`recipeCollapse${recipe.id}`} className="collapse" aria-labelledby={`recipeHeader${recipe.id}`} >
        <div className="card-body">
          <h4 className='font-weight-bold'>Description</h4>
          <p>{ recipe.recipe_description }</p>
          <h4 className='font-weight-bold'>Ingredients You Have</h4>
          <ul>
            {ingredientUserHas.map(
              ingredient => { return <li>{ingredient}</li> }
            )}
          </ul>
          <h4 className='font-weight-bold'>Inredients You Need</h4>
          <ul>
            {additionalIngredients.map(
                ingredient => { return <li>{ingredient}</li> }
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

function RecipeSearchBar() {
  return (
    <form className='form-inline justify-content-center mb-4'>
      <button className='btn btn-primary mr-2'>Find Recipes</button>
      <button className='btn btn-danger'>Clear Recipes</button>
    </form>
  );
}

function RecipeAccordion({ recipes, setRecipes }) {
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
      <RecipeSearchBar />
      <div className='accordion' id='recipeAccordion'>
        { RecipeAccordionElements }
      </div>
    </div>
  );
}

function UserPreference({ userInput, setUserPreferences }) {
  
  function removeUserPreference(userInputListElement, preferenceCategory) {
    setUserPreferences( prevUserInput => {
      const updatedUserInput = {...prevUserInput};
      const preferenceArr = updatedUserInput.preferences;
      const ingredientArr = updatedUserInput.ingredients;
      
      if(preferenceCategory === 'Ingredient') {
        updatedUserInput.ingredients = ingredientArr.filter(ingredient => ingredient !== userInputListElement);
      } else if(preferenceCategory === 'Category') {
        updatedUserInput.preferences = preferenceArr.filter(preference => preference !== userInputListElement);
      }

      return updatedUserInput;
    });
  }

  return (
  <>
    <td className='text-wrap'>
      <div className='text-left text-break'>
        {userInput.ingredients.map((userInputListElement, i = 0) => {
          return <div key={`${userInputListElement}${i++}`}>
                      <button type="button" 
                              className="close btn-close-white mr-1 float-left" 
                              aria-label="Close"
                              onClick={() => removeUserPreference(userInputListElement, 'Ingredient')}>
                        <span aria-hidden="true">&times;</span>
                      </button>
                        {userInputListElement}
                  </div>
        })}
      </div>
    </td>

    <td className='text-wrap'>
      <div className='text-left text-break'>
        {userInput.preferences.map((userInputListElement, i = 0) => {
          return <div key={`${userInputListElement}${i++}`}>
                      <button type="button" 
                              className="close btn-close-white mr-1 float-left" 
                              aria-label="Close"
                              onClick={() => removeUserPreference(userInputListElement, 'Category')}>
                        <span aria-hidden="true">&times;</span>
                      </button>
                        {userInputListElement}
                  </div>
        })}
      </div>
    </td>
    </>
  );
}

function UserPreferenceTable({ userInput, setUserPreferences }) {
  return (
    <table className='table text-center'>
      <thead className='table-borderless'>
        <tr>
          <th>Ingredients</th>
          <th>Preferences</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <UserPreference userInput={ userInput } 
                          setUserPreferences={setUserPreferences} />
        </tr>
      </tbody>
    </table>
  )
}

function UserPreferenceSearchBar({setUserPreferences}) {
  const [preferenceInput, setPreferenceInput] = useState('');
  const [preferenceCategory, setPreferenceCategory] = useState('Ingredient');

  // Clear user preferences according to ddl value.
  function clearUserPreferences() {
    setUserPreferences( prevUserInput => {
      const updatedUserInput = { ...prevUserInput };

      if(preferenceCategory === 'Ingredient') {
        updatedUserInput.ingredients = [];
      } else if(preferenceCategory === 'Preference') {
        updatedUserInput.preferences = [];
      }

      return updatedUserInput;
    });

    setPreferenceInput('');
  }

  // Add preference according to ddl value. Clear input field after adding.
  function addUserPreference() {
    setUserPreferences( prevUserInput => {
      const updatedUserInput = { ...prevUserInput };

      if(preferenceCategory === 'Ingredient') {
        updatedUserInput.ingredients.push(preferenceInput);
      } else if(preferenceCategory === 'Preference') {
        updatedUserInput.preferences.push(preferenceInput);
      }

      return updatedUserInput;
    });

    setPreferenceInput('');
  }

  return (
    <form className="form-inline justify-content-sm-center mb-3">
      <select id='preference-ddl' value={preferenceCategory} className="form-control form-control-sm mr-2" onChange={(e) => setPreferenceCategory(e.target.value)}>
        <option value="Ingredient">Ingredient</option>
        <option value="Preference">Preference</option>
      </select>
      <input value={preferenceInput} type="text" className="form-control mr-2" placeholder="Enter..." maxLength='200' onChange={(e) => setPreferenceInput(e.target.value)} />
      <div className='ml-md-0 ml-sm-5'>
        <button className="btn btn-primary mr-2 ml-md-0 ml-sm-3" type='button' onClick={addUserPreference}>Add</button>
        <button className="btn btn btn-danger mr-2" type='button' onClick={clearUserPreferences}>Clear</button>
        <button className="btn btn-secondary" title="Help">?</button>
      </div>
    </form>
  );
}

function FilterableUserPreferenceTable({userInput, setUserPreferences}) {


  return (
    <div className='container'>
      <UserPreferenceSearchBar setUserPreferences={setUserPreferences} />
      <UserPreferenceTable userInput={userInput} 
                           setUserPreferences={setUserPreferences} />
    </div>
  )
}

function FilterableRecipeTable({recipeInput}) {
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

const USER_INPUT_DATA = {
  ingredients : ["ahi tuna", "avocado", "lemon"], 
  preferences: ["mexican",  "savory"],
};

const RECIPES = [
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
  return <FilterableRecipeTable recipeInput={RECIPES} />;
}