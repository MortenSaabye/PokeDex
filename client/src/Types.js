import React, {Component} from 'react';

class Types extends Component {
  render(){
    const {types} = this.props;
    return(
      <div className='types'>
        <p>Types</p>
        {types.map((type,index) =>
          <p className={`type ${type.type.name}`} key={index}>{type.type.name}</p>
        )}
      </div>
    )
  }
}

export default Types;
