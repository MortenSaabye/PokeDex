import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './App.css';

class PokemonDetails extends Component {

  componentWillReceiveProps(nextProps){
    const el = ReactDOM.findDOMNode(this.refs.content);
    console.log(el);
    const prevPokemon = this.props.pokemon.name;
    const nextPokemon = nextProps.pokemon.name || nextProps.pokemon;
    const prevIndex = this.props.species.findIndex(p => {
      return prevPokemon === p.name
    });
    const nextIndex = this.props.species.findIndex(p => {
      return nextPokemon === p.name
    });
    if(prevPokemon && prevPokemon !== nextPokemon){
      console.log(el.className);
      if(prevIndex > nextIndex ) {
        el.classList.add('move-left');
      } else if(nextIndex > prevIndex) {
        el.classList.add('move-right');
      }
    }
  }

  componentDidUpdate(){
    const el = ReactDOM.findDOMNode(this.refs.content);
    setTimeout(function(){
       el.classList.remove('move-left', 'move-right');
    }, 150);
  }

  render(){
    const {species, handleArrow, hide, pokemon, loading, fetched, preventClose} = this.props;
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
    return (<div className={`overlay ${pokemon ? 'show-details' : 'hide-details'}`} onClick={hide}>
              <div className="close-wrap" onClick={hide}>
                <img src={require("../public/close.svg")} alt="closebtn" className="close"/>
              </div>
              <div className="left-wrap" onClick={(e) => handleArrow(pokemon.name, e, "left")}>
                <img src={require("../public/left.svg")} alt="leftbtn"
                className={"left-arrow " + (loading ? "load-arrow" : "") + (species.findIndex(p => p.name === pokemon.name) === 0 ? "load-arrow" : "")}/>
              </div>
              <div className={`details ${pokemon ? 'show-pokemon' : 'hide-pokemon'}`} onClick={e => preventClose(e)}>
                <div ref="content" className="content">
                {content}
                </div>
              </div>
              <div className="right-wrap" onClick={(e) => handleArrow(pokemon.name, e, "right")}>
                <img src={require("../public/right.svg")} alt="rightbtn"
                className={"right-arrow " + (loading ? "load-arrow" : "") + (species.findIndex(p => p.name === pokemon.name) === (species.length - 1) ? "load-arrow" : "")}/>
              </div>
            </div>
    )
  }
}

export default PokemonDetails;
