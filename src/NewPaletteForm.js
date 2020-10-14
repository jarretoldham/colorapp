import React from 'react'; 
import DraggableColorBox from './DraggableColorBox'; 
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Button from '@material-ui/core/Button'; 
import { ChromePicker } from 'react-color'; 
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'; 

const drawerWidth = 400;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    height: "calc(100vh - 64px)", 
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

export default function NewPaletteForm(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const [currentColor, setCurrentColor] = React.useState('teal'); 
  const [currentColorName, setCurrentColorName] = React.useState(''); 
  const [colors, setColors] = React.useState([{color: "blue", name: "Blue" }]); 
  const [newPaletteName, setNewPaletteName] = React.useState(''); 

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
    ValidatorForm.addValidationRule('paletteNameUnique', (value) => {
      if (props.palettes.length === 0) return true; 
      return props.palettes.every(
        ({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase()
      ); 
    });
  }); 

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleColorChange = (newColor) => {
    setCurrentColor(newColor.hex); 
  }; 

  const handleColorNameChange = (evt) => {
    setCurrentColorName(evt.target.value); 
  }; 

  const handlePaletteNameChange = (evt) => {
    setNewPaletteName(evt.target.value); 
  }

  const addNewColor = () => {
    const newColor = { color: currentColor, name: currentColorName}
    setColors([...colors, newColor]); 
    setCurrentColorName(''); 
  }; 

  const handleSavePalette = () => {
    let paletteName = newPaletteName; 
    const newPalette = {
      paletteName: paletteName,
      id: paletteName.toLowerCase().replace(/ /g, '-'),   
      colors: colors, 
    }; 
    props.savePalette(newPalette); 
    
    //redirect back to the home page 
    props.history.push('/'); 
  }

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
            New Palette
          </Typography>
          <ValidatorForm onSubmit={handleSavePalette}>
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
          </ValidatorForm>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon /> 
          </IconButton>
        </div>
        <Divider />
        <Typography variant="h4">
          Design Your Palette
        </Typography>
        <div> 
          <Button variant="contained" color="secondary">Clear Palette</Button>
          <Button variant="contained" color="primary">Random Color</Button>
        </div>
        <ChromePicker 
          color={currentColor}
          onChangeComplete={handleColorChange}
        /> 
        <ValidatorForm onSubmit={addNewColor}>
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
            style={{backgroundColor: currentColor}}
          >
            Add Color
          </Button>
        </ValidatorForm>
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
        {colors.map(color => (
          <DraggableColorBox color={color.color} name={color.name}/>
        ))}
      </main>
    </div>
  );
}