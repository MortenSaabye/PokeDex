import React, {Component} from 'react';
import './App.css';


class Pokemon extends Component {
  render(){
    const {pokemon,id} = this.props;
    return(
        <div className="pokemon--species" onClick={() => this.props.showDetails(pokemon)}>
           <div className="pokemon--species--container">
             <div className="pokemon--species--sprite">
               <img alt={pokemon.name} src={require(`../public/sprites/${id}.png`)}/>
             </div>
             <div className="pokemon--species--name">{pokemon.name}</div>
           </div>
        </div>
      )
    }
  }
export default Pokemon;
