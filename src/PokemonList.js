import React, {Component} from 'react';
import Pokemon from './Pokemon';
import './App.css';

class PokemonList extends Component {
  render(){
    const {species} = this.props;
      return (
        <div className="pokemon--species--list">
        {species.map((pokemon, index)=>
          <Pokemon key={pokemon.name}
            id={index+1}
            pokemon={pokemon}
            showDetails={this.props.showDetails}
            />)}
        </div>
      )
  }
}

export default PokemonList;
