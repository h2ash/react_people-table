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

    this.setState({
      people: people,
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
