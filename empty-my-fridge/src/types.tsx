export interface UserInput {
    ingredients: String[],
    preferences: String[]
};

export type SetUserPreferencesFn = (prevUserPrefernce: React.Dispatch<UserInput>) => UserInput;

export interface UserPreferencesInvokeSet {
    userInput: UserInput,
    setUserPreferences: SetUserPreferencesFn
};