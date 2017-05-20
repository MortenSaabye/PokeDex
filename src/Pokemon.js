import React, {Component} from 'react';


class Pokemon extends Component {
  render(){
    const {pokemon,id, showing} = this.props;
    return(
        <div className="pokemon-single" onClick={!showing ? () => this.props.showDetails(pokemon.name) : null}>
           <div className="pokemon-container">
             <div>
               <img alt={pokemon.name} src={require(`../public/sprites/${id}.png`)}/>
             </div>
             <div>{pokemon.name}</div>
           </div>
        </div>
      )
    }
  }
export default Pokemon;
