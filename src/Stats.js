import React, {Component} from 'react';

class Stats extends Component {
  render(){
    const {stats} = this.props;
    return (
      <div className='stats'>
        <p>Stats</p>
        {stats.map((stat, index) =>
          <div className='stat' key={index}>
            <p>{stat.stat.name}: {stat.base_stat}</p>
            <div className='bar-container'>
              <div className='bar' style={{width: (stat.base_stat / 1.54 + '%')}}></div>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default Stats;
