import React from 'react'; 
import { withStyles } from '@material-ui/styles'; 
import styles from './styles/MiniPaletteStyles.js'; 
import DeleteIcon from '@material-ui/icons/Delete'; 

function MiniPalette(props) {
  const { classes, paletteName, emoji, colors, id, deletePalette } = props; 
  const miniColorBoxes = colors.map(color => (
    <div className={classes.miniColor} 
      style={{backgroundColor: color.color}} 
      key={color.name} 
    /> 
  ))

  const handleDeletePalette = (e) => {
    e.stopPropagation(); 
    
    deletePalette(id); 
  }

  return (
    <div className={classes.root} onClick={props.handleClick}>
      <DeleteIcon 
        className={classes.deleteIcon}
        onClick={handleDeletePalette} 
      /> 
      <div className={classes.colors}>
        {miniColorBoxes}
      </div>
      <h5 className={classes.title}>
        {paletteName} <span className={classes.emoji}>{emoji}</span>
      </h5>
    </div>
  ); 
}

export default withStyles(styles)(MiniPalette); 