import React, { Component } from 'react';
import './App.css';
import { generatePalette } from './colorHelpers';
import Palette from './Palette'; 
import PaletteList from './PaletteList'; 
import SingleColorPalette from './SingleColorPalette'; 
import seedColors from './seedColors'; 
import { Route, Switch } from 'react-router-dom'; 

class App extends Component {
  findPalette(id) {
    return seedColors.find(palette => {
      return palette.id === id; 
    }); 
  }

  render() {
    return (
      <Switch>
        <Route exact 
          path='/' 
          render={(routeProps) => 
            <PaletteList palettes={seedColors} {...routeProps}/>}
        /> 
        <Route exact 
          path='/palette/:id' 
          render={(routeProps) => <Palette palette={
            generatePalette(this.findPalette(routeProps.match.params.id))}/>
          }
        /> 
        <Route exact 
          path='/palette/:paletteId/:colorId' 
          render={() => <SingleColorPalette />} 
        /> 
      </Switch>
    );
  } 
}

export default App;
