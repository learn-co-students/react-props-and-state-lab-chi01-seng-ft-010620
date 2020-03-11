import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }
  }

  fetchPets = () => {
    let fetchPoint = ''
    if (this.state.filters.type === 'all') {
      fetchPoint = '/api/pets'
    } else {
      fetchPoint = `/api/pets?type=${this.state.filters.type}`
    }
    fetch(fetchPoint)
      .then(resp => resp.json())
      .then(pets => this.setState({pets: pets}))
  }

  onChangeType = (event) => {
    const petType = event.target.value
    this.setState({ 
      filters: {
         ...this.state.filters, type: petType 
        } 
      });
  }

  onAdoptPet = petId => {
    debugger
    const pet = this.state.pets.filter(p => {
      return p.id === petId
    })
    pet[0].isAdopted = true
  }

  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters onFindPetsClick={this.fetchPets} onChangeType={this.onChangeType}/>
            </div>
            <div className="twelve wide column">
              <PetBrowser pets={this.state.pets} onAdoptPet={this.onAdoptPet}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
