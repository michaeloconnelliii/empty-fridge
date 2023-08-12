import { RecipeInput } from '../../typings';
import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const RECIPES : RecipeInput = [
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

async function getRecipes(userInput) {
  userInput = JSON.stringify(userInput);
  
  const chatCompletion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [ {role: "system", content: process.env.OPENAI_SYSTEM_CONTENT},
                {role: "user", content: process.env.OPENAI_PROMPT},
                {role: "assistant", content: "OK"},
                {role: "user", content: userInput}
              ]
  });

  let recipes = null;
  if(chatCompletion.data.choices[0].message?.content) {
    try{
      recipes = JSON.parse(chatCompletion.data.choices[0].message.content);
    }
    catch(e) {
      console.log(e.message);
    }
  }

  return recipes;
}

function isOnlyLettersAndSpaces(str) {
  return /^[a-zA-Z\s]+$/.test(str);
}

export default async function handler(req, res) {
  /* Request Criteria:
   - Must submit POST request with object containing an ingredients and preferences array.
   - Arrays can only contain strings that contain letters and spaces. 
      - Entries not meeting that criteria will NOT be processed.
   - Arrays can have a minimum of 1 entry and a maximum of 20 for ingredients and 5 for preferences.
   
   If request fails the above OR fails JSON.parse, 400. Anything other than POST, 405. */
  
  if(req.method !== 'POST') {
    res.status(405).send({ message: 'Only POST requests allowed' });
    return;
  }

  // Ensure request body is parsable to begin with
  let parsedRequestBody;
  try {
    parsedRequestBody = JSON.parse(req.body);
  } catch(error) {
    res.status(400).json({ error: 'Invalid JSON data in the request body.' });
    return;
  }

  // Ensure request has ingredients and preferences parameters in the body
  if(parsedRequestBody.hasOwnProperty("ingredients") && parsedRequestBody.hasOwnProperty("preferences")) {
    /* Remove the following entries from ingredients and preferences arrays:
         - Undefined, null or empty string values
         - Strings containing numbers or special characters
         - Nested objects, arrays, or any other type that isn't a string */
    parsedRequestBody.ingredients = parsedRequestBody.ingredients.filter(ingredient => typeof ingredient === 'string' && ingredient.trim() !== '' && ingredient !== undefined && isOnlyLettersAndSpaces(ingredient));
    parsedRequestBody.preferences = parsedRequestBody.preferences.filter(preference => typeof preference === 'string' && preference.trim() !== '' && preference !== undefined && isOnlyLettersAndSpaces(preference));

    // Ensure ingredients and preferences contain the appropriate amount of elements after removing entries described above
    if((parsedRequestBody.ingredients.length <= 20 && parsedRequestBody.ingredients.length > 0) &&
       (parsedRequestBody.preferences.length <= 5 && parsedRequestBody.preferences.length > 0)) {
        let recipes = await getRecipes(parsedRequestBody);
        // If we get a valid response from API
        if(recipes)
        {
          res.status(200).json( recipes );
        } else {
          res.status(500).send({message: 'Something occured with API. Project maintainer/creator needs to look into what went wrong.'});
        }
        return;
    }
  }

  // If we don't pass checks above, return bad request response
  res.status(400).send({ message: 'Please provide ingredients parameter with 1 to 20 ingredients and preferences parameter with 1 to 5 preferences. Also note preferences and ingredients with special characters (other than the space character) or numbers will NOT be processed.' });
}