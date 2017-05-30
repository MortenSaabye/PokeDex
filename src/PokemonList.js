import React, {Component} from 'react';
import Pokemon from './Pokemon';
import Header from './Header';

class PokemonList extends Component {
  render(){
    const {species, showing, showDetails} = this.props;
      return (
        <div className="main">
          <Header />
          <div className={`pokemon-list ${showing ? 'list-open' : '' }`}>
          {species.map((pokemon, index)=>
            <Pokemon key={pokemon.name}
              id={index+1}
              pokemon={pokemon}
              showing={showing}
              showDetails={showDetails}
              />)}
          </div>
        </div>
      )
  }
}

export default PokemonList;
