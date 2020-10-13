import React, { Component } from 'react'; 
import MiniPalette from './MiniPalette'; 
import { withStyles } from '@material-ui/styles'; 
import styles from './styles/PaletteListStyles'; 

class PaletteList extends Component {

  goToPalette(id) { 
    this.props.history.push(`/palette/${id}`); 
  } 

  render() {
    const { palettes, classes } = this.props; 
    return (
      <div className={classes.root}>
        <div className={classes.container}>
          <div className={classes.nav}>
            <h1>React Colors</h1>
          </div>
          <div className={classes.pallettes}>
            {palettes.map(palette => (
              <MiniPalette key={palette.id} {...palette} 
                handleClick={() => this.goToPalette(palette.id)}/> 
            ))}
          </div>
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(PaletteList)