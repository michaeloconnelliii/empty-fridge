import './App.css';

function RecipeAccordionElement({ recipe }) {
  const ingredientUserHas = recipe.ingredients_user_has.join(", ");
  const additionalIngredients = recipe.additional_ingredients_needed.join(", ");
  
  return (
    <div className='card'>
      <div className="card-header" id={`recipeHeader${recipe.id}`}>
        <h3>
        <button className="btn btn-link btn-block" type="button" data-toggle="collapse" data-target={`#recipeCollapse${recipe.id}`} aria-expanded="true" aria-controls={`recipeCollapse${recipe.id}`}>
          { recipe.title }
        </button>
        </h3>
      </div>
      <div id={`recipeCollapse${recipe.id}`} className="collapse" aria-labelledby={`recipeHeader${recipe.id}`} >
        <div className="card-body">
          <h4>Description</h4>
          <p>{ recipe.recipe_description }</p>
          <h4>Ingredients You Have</h4>
          <p>{ ingredientUserHas }</p>
          <h4>Inredients You Need</h4>
          <p>{ additionalIngredients }</p>
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

function RecipeAccordion({ recipes }) {
  let RecipeAccordionElements = [];
  recipes.forEach((recipe) => {
    RecipeAccordionElements.push(
      <RecipeAccordionElement
        key = { recipe.id }
        recipe = { recipe } />
      );
    }
  );

  return (
    <div className='container'>
      <h2 className='text-center mb-4'>Recipes</h2>
      <RecipeSearchBar />
      <div className='accordion' id='recipeAccordion'>
        { RecipeAccordionElements }
      </div>
    </div>
  );
}

function UserPreference({ userInputList }) {
  return (
    <td>
        {userInputList.map((userInputListElement) => {
          return <div key={userInputListElement}>{userInputListElement}</div>
        })}
    </td>
  );
}

function UserPreferenceTable({ userInput }) {
  return (
    <table className='table text-center'>
      <thead className='table-borderless'>
        <tr>
          <th>Ingredients</th>
          <th>Preferences</th>
          <th>Rank By</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <UserPreference userInputList={ userInput.ingredients } />
          <UserPreference userInputList={ userInput.food_preferences } />
          <UserPreference userInputList={ userInput.rank_by } />
        </tr>
      </tbody>
    </table>
  )
}

function SearchBar() {
  return (
    <form className="form-inline justify-content-sm-center">
      <select className="form-control form-control-sm mr-2">
        <option value="Ingredient">Ingredient</option>
        <option value="Preference">Preference</option>
        <option value="Rank">Rank By</option>
      </select>
      <input type="text" className="form-control mr-2" placeholder="Enter..." />
      <div className='ml-md-0 ml-sm-5'>
        <button className="btn btn-primary mr-2 ml-md-0 ml-sm-3">Add</button>
        <button className="btn btn-danger mr-2">Clear</button>
        <button className="btn btn-secondary" title="Help">?</button>
      </div>
    </form>
  );
}

function FilterableUserPreferenceTable({userInput}) {
  return (
    <div className='container'>
      <SearchBar />
      <UserPreferenceTable userInput={userInput} />
    </div>
  )
}

function FilterableRecipeTable({recipes, data}) {
  return (
    <div className='container'>
      <h1 className='mb-4 text-center'>Empty Fridge</h1>
      <FilterableUserPreferenceTable userInput={data} />
      <RecipeAccordion recipes={recipes} />
    </div>
  );
}

const USER_INPUT_DATA = {
  ingredients : ["ahi tuna", "avocado", "lemon"], 
  food_preferences: ["mexican",  "savory"],
  rank_by: [ "delicious"]
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
  return <FilterableRecipeTable recipes={RECIPES} data={USER_INPUT_DATA} />;
}