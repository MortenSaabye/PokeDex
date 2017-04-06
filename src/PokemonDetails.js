import React, { Component } from 'react';
import './App.css';

class PokemonDetails extends Component {
  render(){
    const {show, hide, pokemon, loading, fetched} = this.props;
    let content;
    if(fetched){
      content =
      <div>
        <img src={pokemon.sprites.front_default} alt={pokemon.name}/>
        <p>{pokemon.name}</p>
      </div>
    } else if (loading && !fetched) {
      content = <p>Loading the pokemon...</p>
    } else {
      content = <div className="lol"/>
    }
    return (<div className={`details ${show ? 'show' : 'hide'}`}>
              <img src={require("../public/close.svg")} onClick={hide} alt="closebtn" className="close"/>
              {content}
            </div>
    )
  }
}

export default PokemonDetails;
