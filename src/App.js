import React, { Component } from 'react';
import { Route, NavLink, HashRouter } from 'react-router-dom';

import './scss/component-app.scss';
import PokedexList from './components/PokedexList';
import PokemonList from './components/PokemonList';
import PokemonSubnav from './components/PokemonSubnav';
import Pokemon from './components/Pokemon';

class App extends Component {
  render() {
    return (
      <HashRouter>
        <div className="component--app">
          <h1>Pokedex</h1>
          <ul className="component--app__menu">
            <li>
              <NavLink to="/stuff">Stuff</NavLink>
            </li>
            <li>
              <NavLink to="/pokedex">Pokedex</NavLink>
            </li>
          </ul>
          <div className="component--app__panel-left">
            <Route path="/pokedex" component={PokedexList} />
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
