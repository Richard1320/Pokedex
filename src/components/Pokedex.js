import React, { Component } from 'react';
import { withRouter, Route, NavLink } from 'react-router-dom';

import '../scss/component-pokedex.scss';
import PokedexSubnav from './PokedexSubnav';
import PokemonList from './PokemonList';
import PokemonSubnav from './PokemonSubnav';
import Pokemon from './Pokemon';

class Pokedex extends Component {
  render() {
    let className = 'component--pokedex__menu route--content';
    if (this.props.location.pathname === '/') {
      className = 'component--pokedex__menu route--root';
    }
    return (
      <div className="component--pokedex">
        <div className={className}>
          <NavLink to="/pokedex">
            <span className="btn--red" />Pokedex
          </NavLink>
          <NavLink to="/stuff">
            <span className="btn--blue" />Stuff
          </NavLink>
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
