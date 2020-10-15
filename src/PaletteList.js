import React, { Component } from 'react'; 
import MiniPalette from './MiniPalette'; 
import { Link } from 'react-router-dom'; 
import { withStyles } from '@material-ui/styles'; 
import styles from './styles/PaletteListStyles'; 
import { CSSTransition, TransitionGroup } from 'react-transition-group'; 

class PaletteList extends Component {

  goToPalette(id) { 
    this.props.history.push(`/palette/${id}`); 
  } 

  render() {
    const { palettes, classes, deletePalette } = this.props; 
    return (
      <div className={classes.root}>
        <div className={classes.container}>
          <div className={classes.nav}>
            <h1>React Colors</h1>
            <Link to='/palette/new'>New Palette</Link>
          </div>
          <TransitionGroup className={classes.palettes}> 
            {palettes.map(palette => (
              <CSSTransition key={palette.id} classNames="fade" timeout={300}>
                <MiniPalette key={palette.id} {...palette} 
                  handleClick={() => this.goToPalette(palette.id)}
                  deletePalette={deletePalette}
                /> 
              </CSSTransition>
            ))}
          </TransitionGroup>
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(PaletteList)