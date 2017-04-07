import React, { Component } from 'react';
import './App.css';

class PokemonDetails extends Component {
  render(){
    const {left, right, preventClose, hide, pokemon, loading, fetched} = this.props;
    let content;
    if(fetched){
      content =
      <div>
        <img className='sprite' src={pokemon.sprites.front_default} alt={pokemon.name}/>
        <p>{pokemon.name}</p>
      </div>
    } else if (loading && !fetched) {
      content = <p>{`Loading ${pokemon}`}</p>
    } else {
      content = <div/>
    }
    return (<div className={`details ${pokemon ? 'show' : 'hide'}`} onClick={(e) => preventClose(e)}>
              <img src={require("../public/close.svg")} onClick={hide} alt="closebtn" className="close"/>
              {content}
              <img src={require("../public/left.svg")}  onClick={() => left(pokemon.name || pokemon)} alt="leftbtn" className="left"/>
              <img src={require("../public/right.svg")} onClick={() => right(pokemon.name || pokemon)}alt="rightbtn" className="right"/>
            </div>
    )
  }
}

export default PokemonDetails;
