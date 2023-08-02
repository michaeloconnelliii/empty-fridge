import { createMocks } from 'node-mocks-http';
import handler from '../../../pages/api/recipes';

function jestUnitTest(testDescription, requestObj, statusCode, requestMethod='POST') {
  test(testDescription, async () => {
    const requestBody : String = JSON.stringify(requestObj);

    const { req, res } = createMocks({
      method: requestMethod,
      body: requestBody
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(statusCode)
  });
}

let requestBody;

describe('/api/recipes', () => {
  // Normal (200) tests
  requestBody = {
    ingredients: ["ahi", "avocado", "lemon"],
    preferences: ["spicy", "mexican"]
  };
  jestUnitTest('Normal POST', requestBody, 200);

  requestBody = {
    ingredients: ["ahi", "avocado", "lemon", "#2 spaghetti"],
    preferences: ["spicy", "mexican"]
  };
  jestUnitTest('Normal POST (with one bad input on ingredients)', requestBody, 200);

  requestBody = {
    ingredients: ["ahi", "avocado", "lemon"],
    preferences: ["spicy", "mexican", "$$cheap"]
  };
  jestUnitTest('Normal POST (with one bad input on preferences)', requestBody, 200);

  requestBody = {
    ingredients: ["ahi", "avocado", "lemon", "#2 spaghetti"],
    preferences: ["spicy", "mexican", "$$cheap"]
  };
  jestUnitTest('Normal POST (with one bad input on both)', requestBody, 200);

  requestBody = {
    ingredients: ["Tomato", "Chicken", "Lemon", "Garlic", "Onion", "Cucumber", "Beef", "Avocado", "Eggplant", "Salmon", "Bell pepper", "Basil", "Carrot", "Shrimp", "Cilantro", "Potatoes", "Ginger", "Cheddar cheese", "Mushrooms", "Soy sauce"],
    preferences: ["spicy", "mexican"]
  };
  jestUnitTest('Normal POST - Max (20) ingredients', requestBody, 200);

  requestBody = {
    ingredients: ["Tomato"],
    preferences: ["spicy", "mexican"]
  };
  jestUnitTest('Normal POST - Min (1) ingredients', requestBody, 200);

  requestBody = {
    ingredients: ["Tomato", "Chicken", "Lemon"],
    preferences: ["mexican", "spicy", "delicious", "regional", "authentic"]
  };
  jestUnitTest('Normal POST - Max (5) Preferences)', requestBody, 200);

  requestBody = {
    ingredients: ["Tomato", "Chicken", "Lemon"],
    preferences: ["mexican"]
  };
  jestUnitTest('Normal POST - Min (1) Preferences)', requestBody, 200);
  
  // Bad (405) tests
  requestBody = {};
  jestUnitTest('GET not allowed (405)', requestBody, 405, 'GET');

  // Bad (400) tests
  requestBody = {
    ingredients: ["Tomato", "Chicken", "Lemon", "Garlic", "Onion", "Cucumber", "Beef", "Avocado", "Eggplant", "Salmon", "Bell pepper", "Basil", "Carrot", "Shrimp", "Cilantro", "Potatoes", "Ginger", "Cheddar cheese", "Mushrooms", "Soy sauce", "Pineapple", "Quinoa", "Cauliflower", "Chickpeas", "Mango", "Pasta", "Artichoke", "Cashews", "Kale"],
    preferences: ["mexican", "spicy", "delicious", "regional", "authentic"]
  };
  jestUnitTest('Too many ingredients', requestBody, 400);

  requestBody = {
    ingredients: ["Tomato", "Chicken", "Lemon"],
    preferences: ["mexican", "spicy", "delicious", "regional", "authentic", "savory"]
  };
  jestUnitTest('Too many preferences', requestBody, 400);

  requestBody = {
    ingredients: ["ahi tuna", "avocado", "lemon"]
  };
  jestUnitTest('No preferences', requestBody, 400);

  requestBody = {
    preferences: ["spicy", "mexican"]
  };
  jestUnitTest('No Ingredients', requestBody, 400);

  requestBody = {};
  jestUnitTest('No Ingredients and Preferences', requestBody, 400);

  requestBody = {
    ingredients: [],
    preferences: ["spicy", "mexican"]
  };
  jestUnitTest('Zero ingredients', requestBody, 400);

  requestBody = {
    ingredients: ["ahi tuna", "avocado", "lemon"],
    preferences: []
  };
  jestUnitTest('Zero preferences', requestBody, 400);

  requestBody = {
    ingredients: [],
    preferences: []
  };
  jestUnitTest('Zero ingredients and preferences', requestBody, 400);

  requestBody = {
    ingredients: [null],
    preferences: ["spicy", "mexican"]
  };
  jestUnitTest('One null ingredient', requestBody, 400);

  requestBody = {
    ingredients: ["ahi tuna", "avocado", "lemon"],
    preferences: [null]
  };
  jestUnitTest('One null preference', requestBody, 400);

  requestBody = {
    ingredients: [""],
    preferences: ["spicy", "mexican"]
  };
  jestUnitTest('One empty string ingredient', requestBody, 400);

  requestBody = {
    ingredients: ["ahi tuna", "avocado", "lemon"],
    preferences: [""]
  };
  jestUnitTest('One empty string preference', requestBody, 400);

  requestBody = {
    ingredients: [{}],
    preferences: ["spicy", "mexican"]
  };
  jestUnitTest('One nested object in ingredients', requestBody, 400);

  requestBody = {
    ingredients: ["ahi tuna", "avocado", "lemon"],
    preferences: [{}]
  };
  jestUnitTest('One nested object in preference', requestBody, 400);

  requestBody = {
    ingredients: [[]],
    preferences: ["spicy", "mexican"]
  };
  jestUnitTest('One nested array in ingredients', requestBody, 400);

  requestBody = {
    ingredients: ["ahi tuna", "avocado", "lemon"],
    preferences: [[]]
  };
  jestUnitTest('One nested array in preference', requestBody, 400);

  requestBody = {
    ingredients: ["ahi $tuna"],
    preferences: ["spicy", "mexican"]
  };
  jestUnitTest('One ingredient with special character', requestBody, 400);

  requestBody = {
    ingredients: ["2 spaghetti"],
    preferences: ["spicy", "mexican"]
  };
  jestUnitTest('One ingredient with number', requestBody, 400);
});