import { RecipeInput } from '../../typings';
import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

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
          res.status(500).send({message: 'Something occured with the API. Project maintainer/creator needs to look into what went wrong.'});
        }
        return;
    }
  }

  // If we don't pass checks above, return bad request response
  res.status(400).send({ message: 'Please provide ingredients parameter with 1 to 20 ingredients and preferences parameter with 1 to 5 preferences. Also note preferences and ingredients with special characters (other than the space character) or numbers will NOT be processed.' });
}