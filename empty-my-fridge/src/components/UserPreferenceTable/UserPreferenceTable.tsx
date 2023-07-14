import UserPreference from './UserPreference';
import { UserPreferences } from '@/typings';

export default function UserPreferenceTable({ userInput, setUserPreferences }: UserPreferences) {
    return (
      <table className='table text-center'>
        <thead className='table-borderless'>
          <tr>
            <th>Ingredients</th>
            <th>Preferences</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <UserPreference userInput={ userInput } 
                            setUserPreferences={setUserPreferences} />
          </tr>
        </tbody>
      </table>
    )
  }