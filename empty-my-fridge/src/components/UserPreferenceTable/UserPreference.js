export default function UserPreference({ userInput, setUserPreferences }) {
  
    function removeUserPreference(userInputListElement, preferenceCategory) {
      setUserPreferences( prevUserInput => {
        const updatedUserInput = {...prevUserInput};
        const preferenceArr = updatedUserInput.preferences;
        const ingredientArr = updatedUserInput.ingredients;
        
        if(preferenceCategory === 'Ingredient') {
          updatedUserInput.ingredients = ingredientArr.filter(ingredient => ingredient !== userInputListElement);
        } else if(preferenceCategory === 'Category') {
          updatedUserInput.preferences = preferenceArr.filter(preference => preference !== userInputListElement);
        }
  
        return updatedUserInput;
      });
    }
  
    return (
    <>
      <td className='text-wrap'>
        <div className='text-left text-break'>
          {userInput.ingredients.map((userInputListElement, i = 0) => {
            return <div key={`${userInputListElement}${i++}`}>
                        <button type="button" 
                                className="close btn-close-white mr-1 float-left" 
                                aria-label="Close"
                                onClick={() => removeUserPreference(userInputListElement, 'Ingredient')}>
                          <span aria-hidden="true">&times;</span>
                        </button>
                          {userInputListElement}
                    </div>
          })}
        </div>
      </td>
  
      <td className='text-wrap'>
        <div className='text-left text-break'>
          {userInput.preferences.map((userInputListElement, i = 0) => {
            return <div key={`${userInputListElement}${i++}`}>
                        <button type="button" 
                                className="close btn-close-white mr-1 float-left" 
                                aria-label="Close"
                                onClick={() => removeUserPreference(userInputListElement, 'Category')}>
                          <span aria-hidden="true">&times;</span>
                        </button>
                          {userInputListElement}
                    </div>
          })}
        </div>
      </td>
      </>
    );
  }