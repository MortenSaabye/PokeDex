import React, {Component} from 'react';

class Abilities extends Component {
  render(){
    const abilities = this.props.abilities;
    return (
      <div>
        <h4>Abilities</h4>
        <ol>
          {abilities.map((ability, index) =>
            <li key={index}>{ability.ability.name}</li>
          )}
        </ol>
      </div>
    )
  }
}

export default Abilities;
