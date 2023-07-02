import UserPreferenceSearchBar from './UserPreferenceSearchBar';
import UserPreferenceTable from './UserPreferenceTable';
import { UserPreferencesInvokeSet } from '@/types'

export default function FilterableUserPreferenceTable({userInput, setUserPreferences}: UserPreferencesInvokeSet) {
    return (
      <div className='container'>
        <UserPreferenceSearchBar userInput={userInput} 
                                 setUserPreferences={setUserPreferences} />
        <UserPreferenceTable userInput={userInput} 
                             setUserPreferences={setUserPreferences} />
      </div>
    )
  }