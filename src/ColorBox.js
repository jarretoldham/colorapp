import React, { Component } from 'react'; 
import './ColorBox.css'; 
import { CopyToClipboard } from 'react-copy-to-clipboard'; 
import chroma from 'chroma-js'; 
import { Link } from 'react-router-dom'; 

class ColorBox extends Component {
  constructor(props) 
  {
    super(props); 
    this.state = { copied: false }; 

    this.changeCopyState = this.changeCopyState.bind(this); 
  }

  changeCopyState() {
    this.setState({copied: true}, () => {
      setTimeout(() => this.setState({copied: false}), 1500); 
    }); 
  }

  render() {
    const { name, background, paletteId, id, showLink } = this.props; 
    const { copied } = this.state; 
    const isDarkColor = chroma(background).luminance() <= 0.06; 
    const isLightColor = chroma(background).luminance() >= 0.6; 

    return (
      <CopyToClipboard text={background} onCopy={this.changeCopyState}>
        <div className="ColorBox" style={{background: background}}>
          {/* separate div to prevent growing all contents of the copy-container  */}
          <div className={`copy-overlay ${copied && "show"}`} style={{background: background}} />
          <div className={`copy-msg ${copied && "show"}`}>
            <h1>copied!</h1>
            <p className={isLightColor ? 'dark-text' : undefined}>{background}</p>
          </div>
          <div className="copy-container">
            <div className="box-content">
              <span className={isDarkColor ? 'light-text' : undefined}>{name}</span>
            </div>
            <button className={isLightColor ? "copy-button dark-text" : "copy-button"}>Copy</button>
          </div>
          {showLink && 
            <Link to={`/palette/${paletteId}/${id}`} onClick={e => e.stopPropagation()}>
              <span className={isLightColor ? "see-more dark-text" : "see-more"}>More</span>
            </Link>
          }
        </div>
      </CopyToClipboard>
    )
  }
}

export default ColorBox; 