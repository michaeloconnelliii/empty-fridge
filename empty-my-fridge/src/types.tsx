export interface UserInput {
    ingredients: String[],
    preferences: String[]
};
  
export interface SetUserPreferences {
    setUserPreferences: React.Dispatch<React.SetStateAction<UserInput>>;
};

export type SetUserPreferencesFn = (prevUserPrefernce: React.Dispatch<UserInput>) => UserInput;

export interface UserPreferences {
    userInput: UserInput,
    setUserPreferences: SetUserPreferencesFn
};