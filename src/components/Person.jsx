import React from 'react'
import classNames from 'classnames';

const Person = ({ person, index }) => {
  const nameStyles = classNames({
    'people__born-before-1650': person.born < 1650,
    'people__died-after-1800': person.died > 1800,
  })

  const sexStyles = classNames({
    'person--female': person.sex === 'f',
    'person--male': person.sex === 'm',
  })

  const livedMore65Styles = classNames({
    'people__lived-more-65': (person.died - person.born) > 65,
  })

  const centuryStyles = classNames(
    'person--lived-in-${person.century}-century', {})

  return (
    <tr className={livedMore65Styles} key={index}>
      <td>{index}</td>
      <td className={nameStyles}>{person.name}</td>
      <td className={sexStyles}>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td>{person.mother}</td>
      <td>{person.father}</td>
      <td>{person.died - person.born}</td>
      <td className={centuryStyles}>{Math.ceil(person.died / 100)}</td>
    </tr>
  )
}

export default Person