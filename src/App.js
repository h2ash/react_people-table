import React from 'react';
import PeopleTable from './components/PeopleTable'
import './App.css'

class App extends React.Component {
  state = {
    people: [],
  }

  componentDidMount() {
    this.loadData()
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
    })
  }

  render() {
    return (
      <div>
        <PeopleTable currentPeople={this.state.people} />
      </div>
    )
  }
};

export default App;
