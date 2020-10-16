import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom'; 
import { TransitionGroup, CSSTransition } from 'react-transition-group'; 
import Page from './Page';
import Palette from './Palette'; 
import PaletteList from './PaletteList'; 
import NewPaletteForm from './NewPaletteForm'; 
import SingleColorPalette from './SingleColorPalette'; 
import seedColors from './seedColors'; 
import { generatePalette } from './colorHelpers';

class App extends Component {
  constructor(props) { 
    super(props); 

    const savedPalettes = JSON.parse(window.localStorage.getItem('palettes')); 

    this.state = {
      palettes: savedPalettes || seedColors
    }; 

    this.savePalette = this.savePalette.bind(this); 
    this.findPalette = this.findPalette.bind(this); 
    this.deletePalette = this.deletePalette.bind(this); 
  }

  findPalette(id) {
    return this.state.palettes.find(palette => {
      return palette.id === id; 
    }); 
  }

  savePalette(newPalette) { 
    this.setState(
      { palettes: [...this.state.palettes, newPalette]}, 
      this.syncLocalStorage
    ); 
  }

  deletePalette(paletteId) {
    this.setState(state => ({
        palettes: state.palettes.filter(palette => palette.id !== paletteId), 
      }), 
      this.syncLocalStorage
    ); 
  }

  syncLocalStorage() { 
    //save the palettes to local storage 
    window.localStorage.setItem(
      'palettes', 
      JSON.stringify(this.state.palettes)
    ); 
  }

  render() {
    return (
      <Route render={({ location }) => (
        <TransitionGroup>
          <CSSTransition
            key={location.key}
            classNames='page' 
            timeout={300} 
          >
            <Switch location={location}>
              <Route exact 
                path='/' 
                render={(routeProps) => 
                  <Page>
                    <PaletteList palettes={this.state.palettes} 
                      deletePalette={this.deletePalette} 
                      {...routeProps}
                    />
                  </Page>
                }
              /> 
              <Route exact 
                path='/palette/new'
                render={(routeProps) => 
                  <Page>
                    <NewPaletteForm 
                      {...routeProps}
                      savePalette={this.savePalette} 
                      palettes={this.state.palettes}
                    />
                  </Page>
                }
              /> 
              <Route exact 
                path='/palette/:paletteId/:colorId' 
                render={(routeProps) => 
                  <Page>
                    <SingleColorPalette 
                      colorId={routeProps.match.params.colorId}
                      palette={
                        generatePalette(this.findPalette(routeProps.match.params.paletteId))}
                    />
                  </Page>
                } 
              /> 
              <Route exact 
                path='/palette/:id' 
                render={(routeProps) => 
                  <Page>
                    <Palette palette={
                      generatePalette(this.findPalette(routeProps.match.params.id))}
                    />
                  </Page>
                }
              /> 
            </Switch>
          </CSSTransition>
        </TransitionGroup>
      )} /> 
    );
  } 
}

export default App;
