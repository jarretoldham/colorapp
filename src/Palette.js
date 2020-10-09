import React, { Component } from 'react'; 
import './Palette.css'; 
import ColorBox from './ColorBox'; 
import Slider from 'rc-slider'; 
import 'rc-slider/assets/index.css'; 

class Palette extends Component {
  constructor(props) {
    super(props); 
    this.state = { level: 500 }; 

    this.changeLevel = this.changeLevel.bind(this); 
  }

  changeLevel(level) {
    this.setState({level}); 
  }

  render() {
    const { colors } = this.props.palette
    const { level } = this.state; 
    const colorBoxes = colors[level].map(c => (
      <ColorBox background={c.hex} name={c.name} /> 
    )); 

    return (
      <div className="Palette">
        { /* Navbar goes here */}
        <div className="slider">
          <Slider defaultValue={level} 
            min={100} 
            max={900} 
            step={100} 
            onAfterChange={this.changeLevel}
          /> 
        </div>
        <div className="Palette-colors">
          { /* bunch of color boxes */}
          {colorBoxes}
        </div>
        { /* footer eventually */}
      </div>
    )
  }
}

export default Palette; 