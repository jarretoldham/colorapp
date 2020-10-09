import React, { Component } from 'react'; 
import './Palette.css'; 
import ColorBox from './ColorBox'; 

class Palette extends Component {
  render() {
    const colorBoxes = this.props.colors.map(c => (
      <ColorBox background={c.color} name={c.name} /> 
    )); 

    return (
      <div className="Palette">
        { /* Navbar goes here */}
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