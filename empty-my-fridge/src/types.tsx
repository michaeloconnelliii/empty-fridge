export interface UserInput {
    ingredients: String[],
    preferences: String[]
};

export type SetUserPreferences = React.Dispatch<React.SetStateAction<UserInput>>;

export interface UserPreferences {
    userInput: UserInput,
    setUserPreferences: SetUserPreferences
};

export interface RecipeInputElement {
    id: React.Key,
    title: String,
    recipe_description: String,
    ingredients_user_has: String[],
    additional_ingredients_needed: String[]
}

export type RecipeInput = RecipeInputElement[];

export type SetRecipeInput = React.Dispatch<React.SetStateAction<RecipeInput>>;

export interface RecipeInputSingle {
    recipe: RecipeInputElement,
    setRecipes: SetRecipeInput
};

export interface RecipeInputs {
    recipes: RecipeInput,
    setRecipes: SetRecipeInput
};