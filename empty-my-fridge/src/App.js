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
    <ul>
        {userInputList.map((userInputListElement) => {
          return <li key={userInputListElement}>{userInputListElement}</li>
        })}
    </ul>
  );
}

function UserLists({ userInput }) {
  return (
    <>
      <UserList userInputList={ userInput.ingredients } />
      <UserList userInputList={ userInput.food_preferences } />
      <UserList userInputList={ userInput.rank_by } />
    </>
  )
}

function SearchBar() {
  return (
    <form>
      <select>
        <option value="Ingredient">Ingredient</option>
        <option value="Preference">Preference</option>
        <option value="Rank">Rank By</option>
      </select>
      <input type="text" placeholder="Enter..." />
      <button>Add</button>
      <button title="Help">?</button>
      <button>Clear</button>
    </form>
  );
}

function FilterableRecipeTable({recipes, data}) {
  return (
    <div>
      <h1>Empty My Fridge</h1>
      <SearchBar />
      <UserLists userInput={data} />
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