import UserPreference from './UserPreference';

type Props = {
  userInput : {string: string[]},
  setUserPreferences: Object
};

export default function UserPreferenceTable({ userInput, setUserPreferences }: Props) {
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