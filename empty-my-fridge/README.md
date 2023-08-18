# Empty Fridge

## Background
* <em>Empty Fridge</em> generates custom recipes based on ingredients and preferences (cuisine, diet specification, spice-level, etc.). I created it to come up with ideas for recipes using leftover ingredients I had in the fridge.
* Usage is simple. Input at least one ingredient and preference and select <i>Find Recipes</i> and three recipes will be generated for you.

## Project Overview
* OpenAI's <a href="https://platform.openai.com/docs/api-reference/chat">ChatGPT API</a> is used for generating the recipes. The project is built using <a href="https://nextjs.org/">NextJS</a> as its full-stack framework.<a href="https://react.dev/">React</a> with <a href="https://www.typescriptlang.org/">TypeScript</a> is used for the frontend.<a href="https://getbootstrap.com/">Bootstrap</a> is used for styling and some UI behavior (accordion drop down menu, help modal, etc.).<a href="https://jestjs.io/">Jest</a> is used for unit testing.

## How to use
1. Clone the repo
2. Create a .env.local file. Add your <a href="https://help.openai.com/en/articles/4936850-where-do-i-find-my-secret-api-key">OPENAI_API_KEY</a> and your relevant OPENAI_SYSTEM_CONTENT and OPENAI_PROMPT.
3. Commands
    1. Build: npm run build
    2. Run (& debug using Chrome's Node Devtools): npm run dev
    3. Test (using Jest): npm run test

## What is in this repository
* Pages/
    * _app.tsx contains the parent component of the entire application (<i>FilterableRecipeTable</i>).
    * document.tsx contains CSS and JS dependencies (Bootstrap & Google Fonts) that must always be present throughout the application lifecycle.
* Pages/api/
    * The project's only endpoint is recipes.tsx. It uses the user's preference and ingredient lists to use as an input in an API call to the OpenAI API explained above. Ingredient and preference list must have at least one element and no elements can contain characters other than letters (Aa - Zz), spaces (" ") and hyphens ("-"). If an element contains some other charcter, the element is thrown out of the input. Only POST requests are allowed and input must be in JSON format. There is also error checking if the API call fails.
* src/
    * Contains all the React components for the application.
    * RecipeAccordion and RecipeAccordionElement contains the Recipe Accordion and all of its UI functionality. RecipeSearchBar contains the <i>Find Recipe<i> and <i>Clear Recipes</i> buttons and functionalities. This includes making the POST request to Pages/api/recipes.tsx.
    * RecipeTable contains the applications main component: <i>FilterableRecipeTable</i>. Contains the user's preferences and recipes state.
    * UserPreferenceTable contains all the UI functionality and states for inputting ingredient and recipes. This includes adding, removing and clearing ingredients and preferences. It also includes the <i>Help</i> menu.
* _tests/_pages/recipes.test.ts
    * <i>Jest</i> unit tests for the project's one endpoint. Mostly ensuring strict user input is enforced.
* App.css
    * The project's main indepedent styling sheet. Everything that isn't Bootstrap is here.
* babel.config.js
    * Babel is utilized as a dependency for <i>Jest</i>.
* jest.config.ts
    * <i>Jest</i> dependency. Only using it to explcitly define file extensions.
* package-lock.json, package.json
    * Project dependencies and commands.
* tsconfig.json
    * <i>TypeScript</i> configuration.
* typings.d.ts
    * <i>TypeScript</i> types used throughout the project's components (src/*).