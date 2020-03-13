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

  onChangeType = (e) => {
    this.setState({
      filters: {
        type: e.target.value
      }
    })
  }

  onFindPetsClick = () => {
    let url
    if (this.state.filters.type === 'all') {
      url = '/api/pets'
    } else {
      url = '/api/pets?type=' + this.state.filters.type
    }
    fetch(url)
    .then(resp => resp.json())
    .then(petArray => {
      this.setState({
        pets: petArray
      })
    })
  }

  onAdoptPet = (id) => {
    const petsArray = this.state.pets.map(pet => {
      if (pet.id === id) {
        pet.isAdopted = true
        return pet
      } else {
        return pet
      }
    })
    
    this.setState({
      pets: petsArray
    })
  }
  
  render() {
    console.log(this.state.pets)
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters
                onChangeType={this.onChangeType}
                onFindPetsClick={this.onFindPetsClick}
              />
            </div>
            <div className="twelve wide column">
              <PetBrowser 
                onAdoptPet={this.onAdoptPet}
                pets={this.state.pets}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
