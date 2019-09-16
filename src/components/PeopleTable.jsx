import React from 'react';
import Person from './Person';

const PeopleTable
  = ({
    people,
    inputValue,
    handleInput,
    filteredBySearch,
    sortFunc,
    selectedId,
    selectFunc,
  }) => (
    <>
      <label htmlFor="">
        Search:
        <input value={inputValue} onChange={handleInput} type="text" />
      </label>
      <table className="PeopleTable">
        <thead>
          <tr>
            <th onClick={() => sortFunc('id')}>id</th>
            <th onClick={() => sortFunc('name')}>name</th>
            <th>sex</th>
            <th onClick={() => sortFunc('born')}>born</th>
            <th onClick={() => sortFunc('died')}>died</th>
            <th>mother</th>
            <th>father</th>
            <th onClick={() => sortFunc('age')}>age</th>
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
                selectedId={selectedId}
                selectFunc={selectFunc}
              />
            ))
          }
        </tbody>
      </table>
    </>
  );

export default PeopleTable;
