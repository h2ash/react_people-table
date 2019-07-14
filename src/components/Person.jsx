import React from 'react'



const Person = ({ currentPerson, index }) => (
  <tr key={index}>
    <td>{index}</td>
    <td
      className={`
        ${currentPerson.born < 1650 ? 'people__bord-before-1650' : ''}
        ${currentPerson.died > 1800 ? 'people__died-after-1800' : ''}
      `}
      >
      {currentPerson.name}
    </td>
    <td className={currentPerson.sex === 'f'
      ? 'person--female'
      : 'person--male'}
    >
      {currentPerson.sex}
    </td>
    <td>{currentPerson.born}</td>
    <td>{currentPerson.died}</td>
    <td>{currentPerson.mother}</td>
    <td>{currentPerson.father}</td>
  </tr>
)

export default Person