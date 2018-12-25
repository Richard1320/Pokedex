import React, { Component } from 'react';
import { Route, NavLink, HashRouter } from 'react-router-dom';

import './scss/component-app.scss';
import PokedexSubnav from './components/PokedexSubnav';
import PokemonList from './components/PokemonList';
import PokemonSubnav from './components/PokemonSubnav';
import Pokemon from './components/Pokemon';

class App extends Component {
  render() {
    return (
      <HashRouter>
        <div className="component--app">
          <div className="component--app__menu">
            <NavLink to="/pokedex">Pokedex</NavLink>
            <NavLink to="/stuff">Stuff</NavLink>
          </div>
          <div className="component--app__panel-left">
            <Route path="/pokedex/:id?" component={PokedexSubnav} />
            <Route path="/pokemon/:id" component={PokemonSubnav} />
          </div>
          <div className="component--app__panel-right">
            <Route path="/pokedex/:id" component={PokemonList} />
            <Route path="/pokemon/:id" component={Pokemon} />
          </div>
        </div>
      </HashRouter>
    );
  }
}

export default App;
