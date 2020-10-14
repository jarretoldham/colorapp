import React from 'react'
import { withStyles } from '@material-ui/styles'; 
import DeleteIcon from '@material-ui/icons/Delete'; 
import { SortableElement } from 'react-sortable-hoc'; 

const styles = {
  root: {
    width: "20%", 
    height: "25%", 
    margin: "0 auto", 
    display: "inline-block", 
    position: "relative",
    cursor: "pointer",
    marginBottom: "-3.5px", 
    "&:hover svg": {
      color: "white", 
      transform: "scale(1.2)"
    }, 
  }, 
  boxContent: { 
    position: "absolute", 
    padding: "10px", 
    width: "100%", 
    left: "0px", 
    bottom: "0px", 
    color: "rgba(0, 0, 0, 0.7)", 
    letterSpacing: "1px", 
    textTransform: "uppercase", 
    fontSize: "12px",
    display: "flex", 
    justifyContent: "space-between", 
  }, 
  deleteIcon: {
    transition: "all 0.3s ease-in-out"
  }, 
}

const DraggableColorBox = SortableElement((props) => {
  const { classes, handleClick, name } = props; 

  const handleDelete = () => {
    handleClick(name); 
  }

  return (
    <div 
      className={classes.root}
      style={{backgroundColor: props.color}}
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