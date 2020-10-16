import React from 'react'; 
import PaletteFormNav from './PaletteFormNav'; 
import ColorPickerForm from './ColorPickerForm'; 
import DraggableColorList from './DraggableColorList'; 
import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';import Button from '@material-ui/core/Button'; 
import { arrayMove } from 'react-sortable-hoc';
import useStyles from './styles/NewPaletteFormStyles'; 
import seedColors from './seedColors'; 

export default function NewPaletteForm(props) {
  const maxColors = props.maxColors ?? 20; 
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const [colors, setColors] = React.useState(seedColors[0].colors); 

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
    let randomColor = ''; 
    const allColors = seedColors.map(p => p.colors).flat(); 

    //continue to pick a random color until we find one not already
    //added to the palette
    do {
      const rand = Math.floor(Math.random() * allColors.length); 
      randomColor = allColors[rand]; 
    } while(colors.includes(randomColor))

    //once we find a unique color, add to the palette
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
            <ArrowBackIosIcon /> 
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
          distance={5}
        /> 
      </main>
    </div>
  );
}