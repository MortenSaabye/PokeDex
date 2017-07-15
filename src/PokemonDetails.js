import React, { Component } from 'react';
import Abilities from './Abilities';
import Types from './Types';
import BasicInfo from './BasicInfo';
import Stats from './Stats';
import Moves from './Moves';
import ReactDOM from 'react-dom';

class PokemonDetails extends Component {
  componentWillReceiveProps(nextProps){
    const el = ReactDOM.findDOMNode(this.refs.content);
    const prevPokemon = this.props.pokemon.name;
    const nextPokemon = nextProps.pokemon.name || nextProps.pokemon;
    const prevIndex = this.props.species.findIndex(p =>
      prevPokemon === p.name);
    const nextIndex = this.props.species.findIndex(p =>
      nextPokemon === p.name);
    if(prevPokemon && prevPokemon !== nextPokemon){
      if(prevIndex > nextIndex ) {
        el.classList.add('move-left');
      } else if(nextIndex > prevIndex) {
        el.classList.add('move-right');
      }
    }
  }
  filterMoves(){
    const moves = [...this.props.pokemon.moves]
    return moves.filter(move => {
      return move.version_group_details.find(vgd => vgd.move_learn_method.name === 'level-up')
    }).map(move => {
      move.level = move.version_group_details.find(vgd => vgd.move_learn_method.name === 'level-up').level_learned_at
      return move;
    }).sort((a,b) => a.level - b.level)
  }
  componentDidUpdate(){
    const el = ReactDOM.findDOMNode(this.refs.content);
    el.addEventListener('animationend', removeClass)
    function removeClass(){
      el.classList.remove('move-right', 'move-left');
    }
  }
  render(){
    const {species, handleArrow, pokemon, loading, fetched, hide} = this.props;
    let content;
    if(fetched){
      content =
      <div className='detail-box'>
        <div className='basic-info'>
          <div className="left-wrap" onClick={(e) => handleArrow(pokemon.name, e, "left")}>
            <img src={require("../public/left.svg")} alt="leftbtn"
            className={"left-arrow " + (species.findIndex(p => p.name === pokemon.name) === 0 ? "load-arrow" : "")}/>
          </div>
          <div className="close-wrap" onClick={() => hide()}>
            <img src={require("../public/close.svg")} alt="closebtn"
            className="close-btn"/>
          </div>
          <div className="right-wrap" onClick={(e) => handleArrow(pokemon.name, e, "right")}>
            <img src={require("../public/right.svg")} alt="rightbtn"
            className={"right-arrow " + (species.findIndex(p => p.name === pokemon.name) === (species.length - 1) ? "load-arrow" : "")}/>
          </div>
          <BasicInfo pokemon={pokemon}/>
          <Types types={pokemon.types}/>
          <Abilities abilities={pokemon.abilities}/>
          <Stats stats={pokemon.stats}/>
          <Moves moves={this.filterMoves()}/>
        </div>
      </div>
    } else if (loading && !fetched) {
      content =
      <div className="loading">
        <p>{`Loading ${pokemon}`}</p>
        <img src={require("../public/loading.gif")} alt="hourglass"/>
      </div>
    } else {
      content = <div/>
    }
    return (<div ref="box" className={`details ${pokemon ? 'show-pokemon' : 'hide-pokemon'}`}>
              <div ref="content" className="content">
                {content}
              </div>
            </div>
    )
  }
}

export default PokemonDetails;
