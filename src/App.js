import React, { Component } from 'react';
import './App.css';
import { generatePalette } from './colorHelpers';
import Palette from './Palette'; 
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
          render={() => <h1>LIST GOES HERE</h1>}/> 
        <Route exact 
          path='/palette/:id' 
          render={(routeProps) => <Palette palette={
            generatePalette(this.findPalette(routeProps.match.params.id))}/>
          }/> 
      </Switch>
    );
  } 
}

export default App;
