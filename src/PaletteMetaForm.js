import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Picker } from 'emoji-mart'; 
import 'emoji-mart/css/emoji-mart.css'; 
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'; 

export default function PaletteMetaForm(props) {
  const { handleSubmit, handleCloseForm, palettes, open } = props;  
  const [ newPaletteName, setNewPaletteName ] = React.useState(''); 
  const [ stage, setStage ] = React.useState('title'); 

  React.useEffect(() => {
    ValidatorForm.addValidationRule('paletteNameUnique', (value) => {
      if (palettes.length === 0) return true; 
      return palettes.every(
        ({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase()
      ); 
    });
  }); 

  const handlePaletteNameChange = (evt) => {
    setNewPaletteName(evt.target.value); 
  }

  const handleTitleSubmit = () => {
    setStage('emoji'); 
  }

  const savePalette = (emoji) => {
    const newPalette = {
      paletteName: newPaletteName,
      id: newPaletteName.toLowerCase().replace(/ /g, '-'),   
      emoji: emoji.native, 
    }; 

    setStage(''); 

    handleSubmit(newPalette); 
  }

  return (
    <div>
      <Dialog open={open && stage === 'emoji'} onClose={handleCloseForm}>
        <DialogTitle>Choose a Palette Emoji</DialogTitle>
        <Picker onSelect={savePalette} /> 
      </Dialog>
      <Dialog open={open && stage === 'title'} onClose={handleCloseForm} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Choose a Palette Name</DialogTitle>
        <ValidatorForm onSubmit={handleTitleSubmit}>
          <DialogContent>
            <DialogContentText>
              Please enter a name for your new color palette. Make sure it's unique. 
            </DialogContentText>
            <TextValidator 
              fullWidth
              margin='normal'
              label='Palette Name'
              value={newPaletteName}
              onChange={handlePaletteNameChange}
              validators={['required', 'paletteNameUnique']}
              errorMessages={['Enter palette name', 'Palette name already used']}
            /> 
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseForm} color="primary">
              Cancel
            </Button>
            <Button variant="contained" color="primary" type="submit">
              Save Palette
            </Button>
          </DialogActions>
        </ValidatorForm>
      </Dialog>
    </div>
  );
}
