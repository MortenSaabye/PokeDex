import React, {Component} from 'react';
import Pokemon from './Pokemon';

class PokemonList extends Component {
  render(){
    const {species, showing} = this.props;
      return (
        <div className="pokemon-list">
        {species.map((pokemon, index)=>
          <Pokemon key={pokemon.name}
            id={index+1}
            pokemon={pokemon}
            showing={showing}
            showDetails={this.props.showDetails}
            />)}
        </div>
      )
  }
}

export default PokemonList;
