export declare interface UserInput {
    ingredients: String[],
    preferences: String[]
};

export declare type SetUserPreferences = React.Dispatch<React.SetStateAction<UserInput>>;

export interface UserPreferences {
    userInput: UserInput,
    setUserPreferences: SetUserPreferences
};

export declare interface RecipeInputElement {
    id: React.Key,
    title: String,
    recipe_description: String,
    ingredients_user_has: String[],
    additional_ingredients_needed: String[]
}

export declare type RecipeInput = RecipeInputElement[];

export declare type SetRecipeInput = React.Dispatch<React.SetStateAction<RecipeInput>>;

export declare interface RecipeInputSingle {
    recipe: RecipeInputElement,
    setRecipes: SetRecipeInput
};

export declare interface RecipeInputs {
    recipes: RecipeInput,
    setRecipes: SetRecipeInput,
    userInput: UserInput
};