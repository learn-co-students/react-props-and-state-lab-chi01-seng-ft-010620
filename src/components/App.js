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

  changeType = (selectedType) => {
    this.setState({
      filters: {
        type: selectedType
      }
    })
  }

  findPets = () => {
    fetch(`/api/pets${(this.state.filters.type === "all") ? "" : `?type=${this.state.filters.type}`}`)
    .then(resp => resp.json())
    .then(animals => this.setState({
      pets: animals
    }))
  }

  adopt = (petId) => {
    const alteredPet = this.state.pets.find(el => el.id === petId);
    alteredPet['isAdopted'] = true;
    this.setState(previousState => {
      return {
       pets: previousState.pets.map(pet => {if (pet.id === petId) {
         return alteredPet 
       } else {
         return pet
       }
      })
      }
    })
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
              <Filters onChangeType={this.changeType} onFindPetsClick={this.findPets}/>
            </div>
            <div className="twelve wide column">
              <PetBrowser onAdoptPet={this.adopt} pets={this.state.pets} />
            </div>
            <div id="show-container">
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
