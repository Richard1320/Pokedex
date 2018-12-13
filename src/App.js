import React, { Component } from 'react';
import { Route, NavLink, BrowserRouter as Router } from 'react-router-dom';

import './scss/component-app.scss';
import PokemonList from './components/PokemonList';
import PokedexList from './components/PokedexList';

class App extends Component {
  render() {
    return (
      <Router>
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
            <Route exact path="/pokedex" component={PokedexList} />
          </div>
          <div className="component--app__panel-right">
            <Route exact path="/pokedex/:id" component={PokemonList} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
