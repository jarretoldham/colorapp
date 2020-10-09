import React, { Component } from 'react'; 
import './Palette.css'; 
import ColorBox from './ColorBox'; 
import Navbar from './Navbar'; 

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
        <Navbar level={level} changeLevel={this.changeLevel}/> 
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