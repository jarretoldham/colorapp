import React from 'react'; 
import DraggableColorBox from './DraggableColorBox'; 
import { SortableContainer } from 'react-sortable-hoc'; 

const DraggableColorList = SortableContainer(({ colors, removeColor }) => {
  return (
    <div style={{ height: "100%" }}>
      {colors.map((color, i) => (
        <DraggableColorBox 
          key={color.name}
          index={i}
          color={color.color} 
          name={color.name}
          handleClick={removeColor}
        />
      ))}
    </div>
  ); 
})

export default DraggableColorList