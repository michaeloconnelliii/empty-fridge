import UserPreferenceSearchBar from './UserPreferenceSearchBar';
import UserPreferenceTable from './UserPreferenceTable';

export default function FilterableUserPreferenceTable({userInput, setUserPreferences}) {
    return (
      <div className='container'>
        <UserPreferenceSearchBar setUserPreferences={setUserPreferences} />
        <UserPreferenceTable userInput={userInput} 
                             setUserPreferences={setUserPreferences} />
      </div>
    )
  }