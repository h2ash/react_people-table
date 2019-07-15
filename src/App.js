import React from 'react';
import PeopleTable from './components/PeopleTable'
import './App.css'

class App extends React.Component {
  state = {
    people: [],
    filteredBySearch: [],
    inputValue: '',
  }

  componentDidMount() {
    this.loadData()
  }

  // searchFunc() {
    
  // }

  handleInput = (event) => {
    const {value} = event.target;
    this.setState(prevState => ({
      inputValue: value,
      filteredBySearch: [...prevState.people].filter(person => person.name.toLowerCase().includes(value.toLowerCase())),
    }))
  }

  loadData = async () => {
    const responsePeople = await fetch('https://mate-academy.github.io/react_people-table/api/people.json');
    const people = await responsePeople.json();

    const peopleWithOtherColumns = people.map(person => ({
      ...person,
      age: person.died - person.born,
      century: Math.ceil(person.died / 100),
      children: people.filter(child => child.mother === person.name || child.father === person.name),
    }));
    
    this.setState({
      people: peopleWithOtherColumns,
      filteredBySearch: peopleWithOtherColumns,
    })

  
  }

  render() {
    const {inputValue, people, filteredBySearch} = this.state;
    return (
      <div>
        <PeopleTable 
          inputValue={inputValue}
          people={people}
          filteredBySearch={filteredBySearch}
          handleInput={this.handleInput}
          />
      </div>
    )
  }
};

export default App;
