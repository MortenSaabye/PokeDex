import React, {Component} from 'react';


class Pokemon extends Component {
  render(){
    const {showing,pokemon,id} = this.props;
    return(
        <div className="pokemon-single" onClick={() => this.props.showDetails(pokemon.name)}>
           <div className={`pokemon-container ${pokemon.name === showing || pokemon.name === showing.name ? 'selected' : ''}`}>
             <div>
               <img alt={pokemon.name} src={require(`../public/sprites/${id}.png`)}/>
             </div>
           </div>
           <span>#{id} - {pokemon.name}</span>
        </div>
      )
    }
  }
export default Pokemon;
