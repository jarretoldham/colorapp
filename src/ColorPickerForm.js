import React from 'react'; 
import Button from '@material-ui/core/Button'; 
import { ChromePicker } from 'react-color'; 
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'; 

export default function ColorPickerForm(props) {  
  const { colors, addNewColor, paletteIsFull } = props; 
  const [currentColor, setCurrentColor] = React.useState('teal'); 
  const [currentColorName, setCurrentColorName] = React.useState(''); 

  React.useEffect(() => {
    ValidatorForm.addValidationRule('isColorNameUnique', (value) => {
      if (colors.length === 0) return true; 
      return colors.every(
        ({ name }) => name.toLowerCase() !== value.toLowerCase()
      ); 
    }); 
    ValidatorForm.addValidationRule('isColorUnique', (value) => {
      if (colors.length === 0) return true; 
      return colors.every(
        ({ color }) => color.toLowerCase() !== currentColor
      ); 
    });
  }); 

  const handleColorChange = (newColor) => {
    setCurrentColor(newColor.hex); 
  }; 

  const handleColorNameChange = (evt) => {
    setCurrentColorName(evt.target.value); 
  }; 

  const handleSubmit = () => {
    const newColor = {
      color: currentColor, 
      name: currentColorName
    }; 
    addNewColor(newColor); 

    setCurrentColorName(''); 
  }

  return (
    <div>
      <ChromePicker 
        color={currentColor}
        onChangeComplete={handleColorChange}
      /> 
      <ValidatorForm onSubmit={handleSubmit}>
        <TextValidator 
          value={currentColorName}
          onChange={handleColorNameChange}
          validators={
            ['required',
            'isColorNameUnique',
            'isColorUnique', 
          ]}
          errorMessages={
            ['This field is required', 
            'Color name must be unique', 
            'Color already used', 
          ]}
        />
        <Button 
          variant="contained" 
          color="primary"
          type="submit"
          style={{backgroundColor: paletteIsFull ? 'grey' : currentColor }}
          disabled={paletteIsFull}
        >
          {paletteIsFull ? 'Palette Full' : 'Add Color'}
        </Button>
      </ValidatorForm>
    </div>
  )
}
