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
buildUrl = () => {
  if(this.state.filters.type === 'all'){
    return '/api/pets'
  }
  else{
    return `/api/pets?type=${this.state.filters.type}`
  }
}
  onFindPetsClick = () => {
    const url = this.buildUrl()
    // save data to this.state.pets
    fetch(url)
    .then( resp => resp.json() )
    .then(pets => {this.setState({
      pets: pets
    })} )
  }

  onAdoptPet = (petId) => {
    let newPets = this.state.pets.map(pet => {
      if (pet.id !== petId) {
        return pet
      } else
      { return { ...pet, isAdopted: true
       }
      }
    }) 
    this.setState({
      pets: newPets
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
              <Filters onChangeType={this.onChangeType} onFindPetsClick={this.onFindPetsClick}/>
            {/* pass callback of onChangeType */}
            </div>
            <div className="twelve wide column">
              <PetBrowser pets={this.state.pets}onAdoptPet={this.onAdoptPet}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
