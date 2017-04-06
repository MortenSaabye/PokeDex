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
      pokemon : {},
      pokemonLoading : false,
      pokemonFetched : false,
    };
    this.showDetails = this.showDetails.bind(this);
    this.closeDetails = this.closeDetails.bind(this);

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
  showDetails(pokemon){
    this.setState({
      pokemonLoading : true,
      pokemonFetched : false,
      showing : true
    });

    fetch(`http://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
    .then(response => response.json())
    .then(response =>{
      this.setState({
        pokemon : response,
        pokemonLoading : false,
        pokemonFetched : true,
      });
    });
  }

  closeDetails(){
    this.setState({showing : false})
  }

  render(){
    const {fetched, loading} = this.state;
    let content ;
    if(fetched){
      content = <div className="pokeapp">
                  <Header />
                  <PokemonList species={this.state.species} showDetails={this.showDetails}/>
                  <PokemonDetails
                    show={this.state.showing}
                    hide={this.closeDetails}
                    pokemon={this.state.pokemon}
                    loading={this.state.pokemonLoading}
                    fetched={this.state.pokemonFetched}
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
