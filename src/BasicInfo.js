import React, {Component} from 'react';
import {formatHeight, formatWeight} from './helpers';

class BasicInfo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      image: "front_default",
    }
    this.changeImage = this.changeImage.bind(this);
  }
  componentWillReceiveProps(){
    this.setState({
      image: "front_default"
    })
  }
  changeImage(key) {
    this.setState({
      image: key,
    })
  }
  render(){
    const {height, weight, base_experience, name, sprites} = this.props.pokemon;
    const {image} = this.state;
    return(
      <div className="profile">
        <div>
          <img className='sprite' src={sprites[image]} alt={name}/>
          <div className="pager-container">
            {Object.keys(sprites)
              .map((key,index) => {
                const current = image === key ? "current-img" : "";
                return sprites[key] ?
                <li key={index}>
                  <div className={`pager ${current}`} onClick={() => this.changeImage(key)} >
                  </div>
                </li> : null
              }
            )}
          </div>
        </div>
        <p>{name}</p>
        <p><span>Height: </span><span className='number'>{formatHeight(height)}</span></p>
        <p><span>Weight: </span><span className='number'>{formatWeight(weight)}</span></p>
        <p><span>Base experience: </span><span className='number'>{base_experience}</span></p>
      </div>
    )
  }
}

export default BasicInfo;
