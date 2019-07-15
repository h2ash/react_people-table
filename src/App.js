import React from 'react';
import PeopleTable from './components/PeopleTable'
import './App.css'

class App extends React.Component {
  state = {
    people: [],
    filteredBySearch: [],
    inputValue: '',
    direction: 1,
  }

  componentDidMount = () => {
    this.loadData()
  }

  sortFunc = (sortBy) => {
    this.setState(prevState => ({
      direction: prevState.direction === 1 ? -1 : 1,
      filteredBySearch: [...prevState.filteredBySearch].sort((a,b) => {
        switch(sortBy) {
          case 'name':
            return a.name.localeCompare(b.name) * prevState.direction;
          // case 'id':
          //   return a.id - b.id
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
    const {inputValue, people, filteredBySearch} = this.state;
    return (
      <div>
        <PeopleTable 
          inputValue={inputValue}
          people={people}
          filteredBySearch={filteredBySearch}
          handleInput={this.handleInput}
          sortFunc={this.sortFunc}
          />
      </div>
    )
  }
};

export default App;
