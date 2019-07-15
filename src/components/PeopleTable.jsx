import React from 'react'
import Person from './Person'

const PeopleTable = ({people, inputValue, handleInput, filteredBySearch, sortFunc}) => (
  <>
    <label htmlFor="">
      Search:
      <input value={inputValue} onChange={handleInput} type="text"/>
    </label>
    <table className='PeopleTable'>
      <thead>
        <tr>
          <th>id</th>
          <th onClick={() => sortFunc('name')}>name</th>
          <th>sex</th>
          <th>born</th>
          <th>died</th>
          <th>mother</th>
          <th>father</th>
          <th>age</th>
          <th>century</th>
          <th>children</th>
        </tr>
      </thead>
      <tbody>
        {
          filteredBySearch.map((person, index) => (
            <Person 
              index={(index + 1)}
              person={person}
            />
          ))
        }
      </tbody>
    </table>
  </>
)

export default PeopleTable