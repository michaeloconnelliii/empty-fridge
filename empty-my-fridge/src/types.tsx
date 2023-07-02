export interface UserInput {
    ingredients: String[],
    preferences: String[]
};

export type SetUserPreferencesFn = (prevUserPrefernce: React.Dispatch<UserInput>) => UserInput;

export interface UserPreferencesInvokeSet {
    userInput: UserInput,
    setUserPreferences: SetUserPreferencesFn
};

export interface RecipeInputElement {
    id: React.Key,
    title: String,
    recipe_description: String,
    ingredients_user_has: String[],
    additional_ingredients_needed: String[]
}

export type RecipeInput = RecipeInputElement[];

export interface SetRecipeInput {
    setRecipes: React.Dispatch<React.SetStateAction<RecipeInput>>;
}

export type SetRecipeInputFn = (prevRecipeInput: React.Dispatch<RecipeInput>) => RecipeInput;

export interface RecipeInputs {
    recipe: RecipeInputElement,
    setRecipes: SetRecipeInputFn
};