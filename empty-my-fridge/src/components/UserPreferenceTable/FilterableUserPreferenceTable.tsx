import UserPreferenceSearchBar from './UserPreferenceSearchBar';
import UserPreferenceTable from './UserPreferenceTable';
import { UserPreferences } from '@/types'

export default function FilterableUserPreferenceTable({userInput, setUserPreferences}: UserPreferences) {
    return (
      <div className='container'>
        <UserPreferenceSearchBar userInput={userInput} 
                                 setUserPreferences={setUserPreferences} />
        <UserPreferenceTable userInput={userInput} 
                             setUserPreferences={setUserPreferences} />
      </div>
    )
  }