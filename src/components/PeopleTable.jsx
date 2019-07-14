import React from 'react'
import Person from './Person'

const PeopleTable = ({currentPeople}) => (
  <table className='PeopleTable'>
    <thead>
      <tr>
        <th>id</th>
        <th>name</th>
        <th>sex</th>
        <th>born</th>
        <th>died</th>
        <th>mother</th>
        <th>father</th>
        <th>age</th>
        <th>century</th>
      </tr>
    </thead>
    <tbody>
      {
        currentPeople.map((person, index) => (
          <Person 
            index={index}
            person={person}
          />
        ))
      }
    </tbody>
  </table>
)

export default PeopleTable