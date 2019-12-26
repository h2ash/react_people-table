import React from 'react';
import classNames from 'classnames';

const Person = ({
  person, index, selectedId, selectFunc,
}) => {
  const nameStyles = classNames({
    'people--born-before-1650': person.born < 1650,
    'people--died-after-1800': person.died > 1800,
  });

  const generalStyles = classNames({
    'people--lived-more-65': person.age > 65,
    'person--father': person.children.length && person.sex === 'm',
    'person--mother': person.children.length && person.sex === 'f',
    'person--female': person.sex === 'f',
    'person--male': person.sex === 'm',
    'person--selected': person.id === selectedId,
  });

  const centuryStyles = classNames(
    `person--lived-in-${person.century}-century`
  );

  return (
    <tr
      onClick={() => selectFunc(person.id)}
      className={generalStyles}
      key={index}
    >
      <td>{person.id}</td>
      <td className={nameStyles}>{person.name}</td>
      <td className={generalStyles}>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td>{person.mother}</td>
      <td>{person.father}</td>
      <td>{person.age}</td>
      <td className={centuryStyles}>{person.century}</td>
      <td>
        {person.children.map(child => child.name).join(', ') || 'unknown'}
      </td>
    </tr>
  );
};

export default Person;
