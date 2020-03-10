import React from 'react'

class Pet extends React.Component {
  render() {
    return (
      <div className="card">
        <div className="content">
          <a className="header">
            {this.props.pet.gender === 'female' ? '♀' : '♂'}
            PET NAME {this.props.pet.name}
          </a>
          <div className="meta">
            <span className="date">PET TYPE {this.props.pet.type}</span>
          </div>
          <div className="description">
            <p>Age: PET AGE {this.props.pet.age}</p>
            <p>Weight: PET WEIGHT {this.props.pet.weight}</p>
          </div>
        </div>
        <div className="extra content">
          <button className={this.props.pet.isAdopted ? "ui disabled button" : "ui primary button"}  onClick={() => { if(!(this.props.pet.isAdopted)){ this.props.onAdoptPet(this.props.pet.id)}}} >{this.props.pet.isAdopted ? "Already Adopted" : "Adopt pet"}</button>
        </div>
      </div>
    )
  }
}

export default Pet
