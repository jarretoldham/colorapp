import React from 'react'
import { withStyles } from '@material-ui/styles'; 
import DeleteIcon from '@material-ui/icons/Delete'; 
import { SortableElement } from 'react-sortable-hoc'; 
import styles from './styles/DraggableColorBoxStyles.js'; 

const DraggableColorBox = SortableElement((props) => {
  const { classes, handleClick, name, color } = props; 

  const handleDelete = () => {
    handleClick(name); 
  }

  return (
    <div 
      className={classes.root}
      style={{backgroundColor: color}}
    >
      <div className={classes.boxContent}>
        <span>{props.name}</span>
        <DeleteIcon 
          className={classes.deleteIcon}
          onClick={handleDelete}
        /> 
      </div>
    </div>
  ); 
})

export default withStyles(styles)(DraggableColorBox); 
