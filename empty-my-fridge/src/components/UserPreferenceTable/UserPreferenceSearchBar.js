import React, { useState } from 'react';

export default function UserPreferenceSearchBar({setUserPreferences}) {
    const [preferenceInput, setPreferenceInput] = useState('');
    const [preferenceCategory, setPreferenceCategory] = useState('Ingredient');
  
    // Clear user preferences according to ddl value.
    function clearUserPreferences() {
      setUserPreferences( prevUserInput => {
        const updatedUserInput = { ...prevUserInput };
  
        if(preferenceCategory === 'Ingredient') {
          updatedUserInput.ingredients = [];
        } else if(preferenceCategory === 'Preference') {
          updatedUserInput.preferences = [];
        }
  
        return updatedUserInput;
      });
  
      setPreferenceInput('');
    }
  
    // Add preference according to ddl value. Clear input field after adding.
    function addUserPreference() {
      setUserPreferences( prevUserInput => {
        const updatedUserInput = { ...prevUserInput };
  
        if(preferenceCategory === 'Ingredient') {
          updatedUserInput.ingredients.push(preferenceInput);
        } else if(preferenceCategory === 'Preference') {
          updatedUserInput.preferences.push(preferenceInput);
        }
  
        return updatedUserInput;
      });
  
      setPreferenceInput('');
    }
  
    return (
      <form className="form-inline justify-content-sm-center mb-3">
        <select id='preference-ddl' 
                value={preferenceCategory} 
                className="form-control form-control-sm mr-2" 
                onChange={(e) => setPreferenceCategory(e.target.value)}>
          <option value="Ingredient">Ingredient</option>
          <option value="Preference">Preference</option>
        </select>
        <input value={preferenceInput} 
               type="text" 
               className="form-control mr-2" 
               placeholder="Enter..." 
               maxLength='200' 
               onChange={(e) => setPreferenceInput(e.target.value)} />
        <div className='ml-md-0 ml-sm-5'>
          <button className="btn btn-primary mr-2 ml-md-0 ml-sm-3" 
                  type='button' 
                  onClick={addUserPreference}>
            Add
          </button>
          <button className="btn btn btn-danger mr-2" 
                  type='button' 
                  onClick={clearUserPreferences}>
            Clear
          </button>
          <button className="btn btn-secondary" title="Help">?</button>
        </div>
      </form>
    );
  }