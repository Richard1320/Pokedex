import React, { Component } from 'react';
import { withRouter, Route, NavLink } from 'react-router-dom';

import '../scss/component-pokedex.scss';
import PokedexSubnav from './PokedexSubnav';
import PokemonList from './PokemonList';
import PokemonSubnav from './PokemonSubnav';
import Pokemon from './Pokemon';

class Pokedex extends Component {
  render() {
    return (
      <div className="component--pokedex">
        <div className="component--pokedex__menu">
          <NavLink to="/pokedex">Pokedex</NavLink>
          <NavLink to="/stuff">Stuff</NavLink>
        </div>
        <div className="component--pokedex__panel-left">
          <Route path="/pokedex/:id?" component={PokedexSubnav} />
          <Route path="/pokemon/:id" component={PokemonSubnav} />
        </div>
        <div className="component--pokedex__panel-right">
          <Route path="/pokedex/:id" component={PokemonList} />
          <Route path="/pokemon/:id" component={Pokemon} />
        </div>
      </div>
    );
  }
}

export default withRouter(Pokedex);
