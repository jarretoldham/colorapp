import React from 'react'; 
import clsx from 'clsx';
import PaletteMetaForm from './PaletteMetaForm'; 
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Button from '@material-ui/core/Button'; 
import { Link } from 'react-router-dom'; 
import useStyles from './styles/PaletteFormNavStyles';

export default function PaletteFormNav(props) {
  const classes = useStyles(); 
  const { open, handleSubmit, handleDrawerOpen, palettes } = props; 
  
  const [formShowing, setFormShowing] = React.useState(false); 

  const handleShowForm = () => {
    setFormShowing(true); 
  }; 

  const handleCloseForm = () => {
    setFormShowing(false); 
  }; 

  return (
    <div className={classes.root}>
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
            Create a Palette
          </Typography>
        </Toolbar>
        <div className={classes.navBtns}>
          <Link to='/'>
            <Button className={classes.button} variant="contained" color="secondary">
              Go Back
            </Button>
          </Link>
          <Button className={classes.button} variant="contained" color="primary" onClick={handleShowForm}>
            Save Palette
          </Button>
        </div>
      </AppBar>
      {/* display the palette dialog if needed */}
      {formShowing && 
        <PaletteMetaForm 
          open={formShowing}
          palettes={palettes} 
          handleSubmit={handleSubmit} 
          handleCloseForm={handleCloseForm}/> 
      }
    </div>
  )
}