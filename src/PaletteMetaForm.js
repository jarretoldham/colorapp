import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'; 

export default function PaletteMetaForm(props) {
  const { handleSubmit, handleCloseForm, palettes, open } = props;  
  const [ newPaletteName, setNewPaletteName ] = React.useState(''); 

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

  return (
    <Dialog open={open} onClose={handleCloseForm} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Choose a Palette Name</DialogTitle>
      <ValidatorForm onSubmit={() => handleSubmit(newPaletteName)}>
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
  );
}
