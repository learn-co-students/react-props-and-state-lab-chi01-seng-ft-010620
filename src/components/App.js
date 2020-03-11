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

  onChangeType = (event) => {
    this.setState({
      filters: {
        type: event.target.value
      }
    })
  }

  buildUrl = () => {
    // if (this.state.filters.type === 'all') {
    //   return '/api/pets'
    // } else {
    //   return `/api/pets?type=${this.state.filters.type}`
    // }

   return this.state.filters.type === 'all' ? '/api/pets' : `/api/pets?type=${this.state.filters.type}`
  }

  onFindPetsClick = () => {
    const url = this.buildUrl()
    fetch(url)
      .then( resp => resp.json() )
      .then( pets => {
        this.setState({
          pets: pets
        })
      })
  }

  onAdoptPet = (petId) => {
    const newPets = this.state.pets.map(pet => {
      if (pet.id !== petId) {
        return pet
      } else {
        return {
          ...pet, isAdopted: true
        }
      }
    })
    this.setState({
      pets: newPets
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
                onFindPetsClick={this.onFindPetsClick}/>
            </div>
            <div className="twelve wide column">
              <PetBrowser 
              onAdoptPet={this.onAdoptPet}
              pets={this.state.pets}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
