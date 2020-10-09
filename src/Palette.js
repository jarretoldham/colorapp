import React, { Component } from 'react'; 
import './Palette.css'; 
import ColorBox from './ColorBox'; 
import Navbar from './Navbar'; 

class Palette extends Component {
  constructor(props) {
    super(props); 
    this.state = { level: 500, format: 'hex' }; 

    this.changeLevel = this.changeLevel.bind(this); 
    this.changeFormat = this.changeFormat.bind(this); 
  }

  changeLevel(level) {
    this.setState({level}); 
  }

  changeFormat(val) { 
    this.setState({ format: val }); 
  }

  render() {
    const { colors } = this.props.palette
    const { level, format } = this.state; 
    const colorBoxes = colors[level].map(c => (
      <ColorBox background={c[format]} name={c.name} /> 
    )); 

    return (
      <div className="Palette">
        <Navbar level={level} changeLevel={this.changeLevel} handleChange={this.changeFormat}/> 
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