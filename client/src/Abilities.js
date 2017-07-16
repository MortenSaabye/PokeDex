import React, {Component} from 'react';

class Abilities extends Component {
  render(){
    const {abilities} = this.props;
    return (
      <div className='abilities'>
        <p>Abilities:</p>
          {abilities.map((ability, index) =>
            <p className='ability'key={index}>{ability.ability.name}</p>
          )}
      </div>
    )
  }
}

export default Abilities;
