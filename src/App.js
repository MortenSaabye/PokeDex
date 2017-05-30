import React, { Component } from 'react';
import PokemonList from './PokemonList';
import PokemonDetails from './PokemonDetails';

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
    this.handleArrow = this.handleArrow.bind(this);
    this.handleKey = this.handleKey.bind(this);
  }
  componentDidMount(){
    document.addEventListener('keydown', e => this.handleKey(e));
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
  handleKey(e){
    switch (e.keyCode) {
      case 27:
        this.closeDetails();
        break;
      case 37:
        this.handleArrow(this.state.showing.name, e, "left");
        break;
      case 39:
        this.handleArrow(this.state.showing.name, e, "right");
        break;
      default:
        return false;
    }
  }
  showDetails(pokemon){
    if(!this.state.pokemonLoading){
      //check if the pokemon is already in state
      const statePokemon = this.state.pokemon.find(p => {
         return p.name === pokemon;
      });
      if(!statePokemon) {
        //set loading and pass the pokemon as a string
        //to show which pokemon is being fetched
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
        })
        .then((_) => {
          //don't update state with new pokemon
          //if user has closed modal while loading
          if (this.state.showing === newPokemon.name) {
            this.setState({
              pokemon : pokemonArr,
              pokemonLoading : false,
              pokemonFetched : true,
              showing : newPokemon,
            });
          }
        });
      } else {
        //set showing with pokemon from state
        //without making a new fetch
        this.setState({
          showing : statePokemon,
          pokemonFetched : true,
        });
      }
    }
  }
  handleArrow(pokemon, e, dir){
    const index = this.state.species.findIndex(p => {
      return pokemon === p.name
    });
    let newIndex = index;
    dir === "left" ? newIndex -= 1 : newIndex +=1;
    if(newIndex >= 0 && (newIndex+1) <= this.state.species.length){
      const nextPokemon = this.state.species[newIndex].name;
      this.showDetails(nextPokemon)
    }
    e.stopPropagation();
  }

  closeDetails(){
    if(this.state.showing){
      this.setState({
        pokemonFetched : false,
        pokemonLoading : false,
        showing : false
      });
    }
  }
  render(){
    const {species, pokemonFetched, pokemonLoading, showing, fetched, loading} = this.state;
    let content;
    if(fetched){
      content = <div className="pokeapp">
                  <PokemonList
                    species={species}
                    showing={this.state.showing}
                    showDetails={this.showDetails}/>
                  <PokemonDetails
                    hide={this.closeDetails}
                    pokemon={showing}
                    species={species}
                    loading={pokemonLoading}
                    fetched={pokemonFetched}
                    handleArrow={this.handleArrow}/>
                </div>;
      } else if( loading && !fetched){
        content =
        <div className="loading">
          <p>Loading...</p>
          <img src={require("../public/loading.gif")} alt="hourglass"/>
        </div>
      } else {
        content = <div/>;
      }
    return <div>
      {content}
    </div>
  }
}



export default PokeApp;
