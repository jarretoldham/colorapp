import React from 'react'; 
import { drawerWidth } from './appVariables'; 
import PaletteFormNav from './PaletteFormNav'; 
import ColorPickerForm from './ColorPickerForm'; 
import DraggableColorList from './DraggableColorList'; 
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Button from '@material-ui/core/Button'; 
import { arrayMove } from 'react-sortable-hoc';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
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
    display: 'flex', 
    alignItems: 'center', 
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
  container: {
    width: '90%', 
    height: '100%', 
    display: 'flex', 
    flexDirection: 'column', 
    justifyContent: 'center', 
    alignItems: 'center', 
  }, 
  buttons: {
    width: '100%', 
  }, 
  button: {
    width: '50%', 
  }, 
}));

export default function NewPaletteForm(props) {
  const maxColors = props.maxColors ?? 20; 
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const [colors, setColors] = React.useState(props.palettes[0].colors); 

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const addNewColor = (newColor) => {
    setColors([...colors, newColor]); 
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

  const handleSavePalette = (newPalette) => {
    newPalette.colors = colors; 
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
        <div className={classes.container}>
          <Divider />
          <Typography variant="h4" gutterBottom>
            Design Your Palette
          </Typography>
          <div className={classes.buttons}> 
            <Button 
              variant="contained" 
              color="secondary"
              onClick={clearColors}
              className={classes.button}
            >
              Clear Palette
            </Button>
            <Button 
              variant="contained" 
              color="primary"
              disabled={paletteIsFull}
              onClick={addRandomColor} 
              className={classes.button}
            >
              Random Color
            </Button>
          </div>
          <ColorPickerForm 
            addNewColor={addNewColor}
            paletteIsFull={paletteIsFull} 
            colors={colors}
          /> 
        </div>
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