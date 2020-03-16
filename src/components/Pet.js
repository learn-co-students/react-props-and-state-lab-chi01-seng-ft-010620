import React from 'react'

class Pet extends React.Component {
  genderIcon = () => {
    if (this.props.pet.gender === "male") {
      return '♂'
    } else if (this.props.pet.gender === "female") {
      return '♀'
    }
  }

  renderAdoptButton = () => {

    if (this.props.pet.isAdopted === true) {
      return <button className="ui disabled button">Already adopted</button>
    } else if (this.props.pet.isAdopted === false) {
      return <button onClick={() => this.props.onAdoptPet(this.props.pet.id)} className="ui primary button">Adopt pet</button>
    }
  }

  render() {
    return (
      <div id={this.props.pet.id} className="card">
        <div className="content">
          <a className="header">
            {this.genderIcon()}
            {this.props.pet.name}
          </a>
          <div className="meta">
            <span className="date">{this.props.pet.type}</span>
          </div>
          <div className="description">
            <p>Age: {this.props.pet.age}</p>
            <p>Weight: {this.props.pet.weight}</p>
          </div>
        </div>
        <div className="extra content">
          {this.renderAdoptButton()}
        </div>
      </div>
    )
  }
}

export default Pet

// Should receive a pet prop. Use the attributes in this data to render the pet card correctly. It should show the pet's name, type, age and weight. Based on the pet's gender, the component also needs to contain either a male (♂) or female (♀) symbol.
//
// Each pet may or may not have an isAdopted property set to true. Using this property, render the correct button in the pet's card; if the pet is adopted, show the disabled button. Otherwise, show the primary button to adopt the pet.
//
// Should receive an onAdoptPet callback prop. This callback prop gets called with the pet's id when the user clicks the adopt pet button — not when they click the disabled button!
