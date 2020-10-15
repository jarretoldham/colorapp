import React from 'react'; 
import clsx from 'clsx';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Button from '@material-ui/core/Button'; 
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'; 
import { Link } from 'react-router-dom'; 

export default function PaletteFormNav(props) {
  const { classes, open, handleSubmit, handleDrawerOpen, palettes } = props; 
  const [newPaletteName, setNewPaletteName] = React.useState(''); 

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
    <div>
      <CssBaseline />
      <AppBar
        color="default"
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            New Palette
          </Typography>
          <ValidatorForm onSubmit={() => handleSubmit(newPaletteName)}>
            <TextValidator 
              label='Palette Name'
              value={newPaletteName}
              onChange={handlePaletteNameChange}
              validators={['required', 'paletteNameUnique']}
              errorMessages={['Enter palette name', 'Palette name already used']}
            /> 
            <Button
              variant="contained"
              color="primary"
              type="submit"
            >
              Save Palette
            </Button>
            <Link to='/'>
              <Button variant="contained" color="secondary">
                Go Back
              </Button>
            </Link>
          </ValidatorForm>
        </Toolbar>
      </AppBar>
    </div>
  )
}
