import React, { Component } from 'react';
import PokemonList from './PokemonList';
import PokemonDetails from './PokemonDetails';
import Header from './Header';
import './App.css';

class PokeApp extends Component {
  constructor(props){
    super(props);
    this.state = {
      species : [],
      fetched : false,
      loading : false,
      showing : false,
      pokemon : [],
      pokemonLoading : false,
      pokemonFetched : false,
    };
    this.showDetails = this.showDetails.bind(this);
    this.closeDetails = this.closeDetails.bind(this);
    this.preventClose = this.preventClose.bind(this);
    this.left = this.left.bind(this);
    this.right = this.right.bind(this);
  }
  componentWillMount(){
    this.setState({
      loading : true
    });
    fetch('http://pokeapi.co/api/v2/pokemon?limit=151')
    .then(response => response.json())
    .then(response =>{
      this.setState({
        species : response.results,
        loading : false,
        fetched : true
      });
    });
  }
  componentDidMount(){
    document.addEventListener('keydown', e => this.handleEsc(e))
  }
  handleEsc(e){
    if(e.keyCode === 27){
      this.setState({
        pokemonFetched : false,
        showing : false,
      });
    }
  }
  showDetails(pokemon){
    const statePokemon = this.state.pokemon.find(p => {
       return p.name === pokemon;
    });
    if(!statePokemon) {
      this.setState({
        pokemonLoading : true,
        pokemonFetched : false,
        showing : pokemon,
      });
      let pokemonArr = [...this.state.pokemon];
      let newPokemon = {};
      fetch(`http://pokeapi.co/api/v2/pokemon/${pokemon}`)
      .then(response => response.json())
      .then(response => {
        pokemonArr.push(response);
        newPokemon = response;
        console.log("ran");
      })
      // eslint-disable-next-line
      .then((_) => { this.state.showing === newPokemon.name ?
        this.setState({
          pokemon : pokemonArr,
          pokemonLoading : false,
          pokemonFetched : true,
          showing : newPokemon,
        }) : this.showDetails ;
      });
    } else {
      this.setState({
        pokemonFetched : true,
        showing : statePokemon
      });
    }
  }

  left(pokemon){
    const index = this.state.species.findIndex(p => {
      return pokemon === p.name
    });
    if(index > 0){
      const nextPokemon = this.state.species[index-1].name;
      this.showDetails(nextPokemon)
    }
  }
  right(pokemon){
    const index = this.state.species.findIndex(p => {
      return pokemon === p.name
    });
    if(index+1 < this.state.species.length) {
      const nextPokemon = this.state.species[index+1].name;
      this.showDetails(nextPokemon)
    }
  }

  closeDetails(){
    this.setState({
      pokemonFetched : false,
      showing : false
    });
  }
  preventClose(e){
    e.stopPropagation();
  }

  render(){
    const {species, pokemonFetched, pokemonLoading, showing, fetched, loading} = this.state;
    let content ;
    if(fetched){
      content = <div className="pokeapp" onClick={showing ? this.closeDetails : null}>
                  <Header />
                  <PokemonList species={species} showDetails={this.showDetails}/>
                  <PokemonDetails
                    hide={this.closeDetails}
                    pokemon={showing}
                    loading={pokemonLoading}
                    fetched={pokemonFetched}
                    preventClose={this.preventClose}
                    left={this.left}
                    right={this.right}
                    />
                </div>;
      } else if( loading && !fetched){
        content = <p>The pokedex is loading ...</p>;
      } else {
        content = <div/>;
      }
    return <div>
      {content}
    </div>
  }
}



export default PokeApp;
