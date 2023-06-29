import UserPreference from './UserPreference';

export default function UserPreferenceTable({ userInput, setUserPreferences }) {
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