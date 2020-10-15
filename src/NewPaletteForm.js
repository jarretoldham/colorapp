import React from 'react'; 
import DraggableColorList from './DraggableColorList'; 
import PaletteFormNav from './PaletteFormNav'; 
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Button from '@material-ui/core/Button'; 
import { ChromePicker } from 'react-color'; 
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'; 
import { arrayMove } from 'react-sortable-hoc';

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
  const maxColors = props.maxColors ?? 20; 
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const [currentColor, setCurrentColor] = React.useState('teal'); 
  const [currentColorName, setCurrentColorName] = React.useState(''); 
  const [colors, setColors] = React.useState(props.palettes[0].colors); 

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

  const addNewColor = () => {
    const newColor = { color: currentColor, name: currentColorName}
    setColors([...colors, newColor]); 
    setCurrentColorName(''); 
  }; 

  const clearColors = () => {
    setColors([]); 
  }

  const addRandomColor = () => {
    //pick a random color from existing palettes 
    const allColors = props.palettes.map(p => p.colors).flat(); 
    const rand = Math.floor(Math.random() * allColors.length); 
    const randomColor = allColors[rand]; 
    setColors([...colors, randomColor]); 
  }

  const onSortEnd = ({ oldIndex, newIndex }) => {
    setColors(arrayMove(colors, oldIndex, newIndex)); 
  }

  const removeColor = (colorName) => { 
    setColors(
      colors.filter(color => color.name !== colorName)
    ); 
  }

  const handleSavePalette = (newPaletteName) => {
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

  const paletteIsFull = colors.length >= maxColors; 
  return (
    <div className={classes.root}>
      <PaletteFormNav 
        open={open} 
        classes={classes}
        palettes={props.palettes}
        handleDrawerOpen={handleDrawerOpen}
        handleSubmit={handleSavePalette}
      /> 
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
          <Button 
            variant="contained" 
            color="secondary"
            onClick={clearColors}
          >
            Clear Palette
          </Button>
          <Button 
            variant="contained" 
            color="primary"
            disabled={paletteIsFull}
            onClick={addRandomColor} 
          >
            Random Color
          </Button>
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
            style={{backgroundColor: paletteIsFull ? 'grey' : currentColor }}
            disabled={paletteIsFull}
          >
            {paletteIsFull ? 'Palette Full' : 'Add Color'}
          </Button>
        </ValidatorForm>
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
        <DraggableColorList 
          colors={colors} 
          removeColor={removeColor}
          axis="xy"
          onSortEnd={onSortEnd}
        /> 
      </main>
    </div>
  );
}