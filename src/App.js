import React from 'react';
import PeopleTable from './components/PeopleTable'
import './App.css'

class App extends React.Component {
  state = {
    people: [],
    filteredBySearch: [],
    inputValue: '',
    direction: 1,
    selectedId: '',
  }

  componentDidMount = () => {
    this.loadData()
  }

  selectFunc = (value) => {
    this.setState({
      selectedId: value,
    })
  }

  sortFunc = (sortBy) => {
    this.setState(prevState => ({
      direction: prevState.direction === 1 ? -1 : 1,
      filteredBySearch: [...prevState.filteredBySearch].sort((a,b) => {
        switch(sortBy) { // колхоз-стайл, поправлю потом
          case 'name':
            return a.name.localeCompare(b.name) * prevState.direction;
          case 'id':
            return a.id - b.id * prevState.direction;
          case 'age':
            return a.age - b.age * prevState.direction;
          case 'born':
            return a.born - b.born * prevState.direction;
          case 'died':
            return a.died - b.died * prevState.direction;
          default: 
            return 0;
        }
      })
    }))
  } 

  handleInput = (event) => {
    const {value} = event.target;
    this.setState(prevState => ({
      inputValue: value,
      filteredBySearch: [...prevState.people].filter(person => 
        person.name.toLowerCase().includes(value.toLowerCase())
        || (person.mother ? person.mother
          .toLowerCase().includes(value.toLowerCase()) : false)
        || (person.father ? person.father
          .toLowerCase().includes(value.toLowerCase()) : false)
      ),
    }))
  }

  loadData = async () => {
    const responsePeople = await 
      fetch('https://mate-academy.github.io/react_people-table/api/people.json');
    const people = await responsePeople.json();

    const peopleWithOtherColumns = people.map((person, index) => ({
      ...person,
      id: index + 1,
      age: person.died - person.born,
      century: Math.ceil(person.died / 100),
      children: people.filter(child => 
        child.mother === person.name || child.father === person.name),
    }));
    
    this.setState({
      people: peopleWithOtherColumns,
      filteredBySearch: peopleWithOtherColumns,
    })
  }

  render() {
    const {inputValue, people, filteredBySearch, selectedId} = this.state;
    return (
      <div>
        <PeopleTable 
          inputValue={inputValue}
          people={people}
          filteredBySearch={filteredBySearch}
          handleInput={this.handleInput}
          sortFunc={this.sortFunc}
          selectedId={selectedId}
          selectFunc={this.selectFunc}
          />
      </div>
    )
  }
};

export default App;
