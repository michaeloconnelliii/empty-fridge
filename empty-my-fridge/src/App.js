import './App.css';

function RecipeListElement({ recipe }) {
  const ingredientUserHas = recipe.ingredients_user_has.join(", ");
  const additionalIngredients = recipe.additional_ingredients_needed.join(", ");
  
  return (
    <li>
      <div>
        <h3>{ recipe.title }</h3>
        <h4>Recipe Description</h4>
        <p>{ recipe.recipe_description }</p>
        <h4>Ingreidient User Has</h4>
        <p>{ ingredientUserHas }</p>
        <h4>Inredient User Needs</h4>
        <p>{ additionalIngredients }</p>
      </div>
    </li>
  );
}

function RecipeList({ recipes }) {
  let RecipeListElements = [];
  recipes.forEach((recipe) => {
    RecipeListElements.push(
      <RecipeListElement
        key = { recipe.id }
        recipe = { recipe } />
      );
    }
  );

  return (
    <>
      <h2>Recipes</h2>
      <ul>{ RecipeListElements }</ul>
    </>
  );
}

function UserList({ userInputList }) {
  return (
    <ul className="list-unstyled user-list">
        {userInputList.map((userInputListElement) => {
          return <li key={userInputListElement}>{userInputListElement}</li>
        })}
    </ul>
  );
}

function UserLists({ userInput }) {
  return (
    <div className="d-flex justify-content-between">
      <UserList userInputList={ userInput.ingredients } />
      <UserList userInputList={ userInput.food_preferences } />
      <UserList userInputList={ userInput.rank_by } />
    </div>
  )
}

function SearchBar() {
  return (
    <form className="d-flex mb-3 searchbar-form">
      <select className="form-select">
        <option value="Ingredient">Ingredient</option>
        <option value="Preference">Preference</option>
        <option value="Rank">Rank By</option>
      </select>
      <input type="text" className="form-control" placeholder="Enter..." />
      <button className="btn-primary">Add</button>
      <button className="btn-danger">Clear</button>
      <button className="btn-secondary" title="Help">?</button>
    </form>
  );
}

function FilterableUserPreferenceTable({userInput}) {
  return (
    <div>
      <SearchBar />
      <UserLists userInput={userInput} />
    </div>
  )
}

function FilterableRecipeTable({recipes, data}) {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center">
      <h1 className="mb-4">Empty Fridge</h1>
      <FilterableUserPreferenceTable userInput={data} />
      <RecipeList recipes={recipes} />
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