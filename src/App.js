import React from 'react';
import PeopleTable from './components/PeopleTable';
import './App.css';

class App extends React.Component {
  state = {
    people: [],
    filteredBySearch: [],
    inputValue: '',
    direction: 1,
    selectedId: '',
  };

  componentDidMount = () => {
    this.loadData();
  };

  selectFunc = (value) => {
    this.setState({
      selectedId: value,
    });
  };

  loadData = async() => {
    const responsePeople = await
    fetch('https://mate-academy.github.io/react_people-table/api/people.json');
    const people = await responsePeople.json();

    const peopleWithOtherColumns = people.map((person, index) => ({
      ...person,
      id: index + 1,
      age: person.died - person.born,
      century: Math.ceil(person.died / 100),
      children: people.filter(
        child => child.mother === person.name
          || child.father === person.name
      ),
    }));

    this.setState({
      people: peopleWithOtherColumns,
      filteredBySearch: peopleWithOtherColumns,
    });
  };

  handleInput = (event) => {
    const { value } = event.target;
    this.setState(prevState => ({
      inputValue: value,
      filteredBySearch: [...prevState.people].filter(
        person => person.name.toLowerCase().includes(value.toLowerCase())
        || (person.mother ? person.mother
          .toLowerCase().includes(value.toLowerCase()) : false)
        || (person.father ? person.father
          .toLowerCase().includes(value.toLowerCase()) : false)
      ),
    }));
  };

  sortFunc = (sortField) => {
    this.setState(prevState => ({
      direction: prevState.direction === 1 ? -1 : 1,
      filteredBySearch: [...prevState.filteredBySearch].sort((a, b) => {
        const valueA = a[sortField];
        const valueB = b[sortField];

        switch (typeof valueA) {
          case 'string':
            return valueA.localeCompare(valueB) * prevState.direction;
          case 'number':
          case 'boolean':
            return (valueA - valueB) * prevState.direction;

          default:
            return 0;
        }
      }),
    }));
  };

  render() {
    const {
      inputValue, people, filteredBySearch, selectedId,
    } = this.state;
    return (
      <div>
        <PeopleTable
          inputValue={inputValue}
          filteredBySearch={filteredBySearch}
          handleInput={this.handleInput}
          sortFunc={this.sortFunc}
          selectedId={selectedId}
          selectFunc={this.selectFunc}
        />
      </div>
    );
  }
}

export default App;
