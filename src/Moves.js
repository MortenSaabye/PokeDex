import React, {Component} from 'react';

class Moves extends Component {
  render(){
    const {moves} = this.props;
    console.log(moves);
    return(
      <div className="moves">
        <p>Natural moves</p>
        <p className="label"><span>Move</span><span>Level</span></p>
        {moves.map((move, index) =>
          <p key={index}><span>{move.move.name}</span><span className="number">{move.level}</span></p>
        )}
      </div>
    )
  }
}


export default Moves;
