import React, { Component } from 'react';
import { withRouter, Route, NavLink } from 'react-router-dom';

import PokedexInstructions from './PokedexInstructions';
import PokedexSubnav from './PokedexSubnav';
import PokemonList from './PokemonList';
import PokemonSubnav from './PokemonSubnav';
import Pokemon from './Pokemon';
import ItemCategorySubnav from './ItemCategorySubnav';
import ItemList from './ItemList';
import Item from './Item';

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
            <span className="btn--red" />
            Pokedex
          </NavLink>
          <NavLink to="/item-category">
            <span className="btn--blue" />
            Items
          </NavLink>
        </div>
        <div className="component--pokedex__panel-left">
          <Route exact path="/" component={PokedexInstructions} />
          <Route path="/pokedex/:id?" component={PokedexSubnav} />
          <Route path="/pokemon/:id" component={PokemonSubnav} />
          <Route path="/item/:id?" component={ItemCategorySubnav} />
          <Route path="/item-category/:id?" component={ItemCategorySubnav} />
        </div>
        <div className="component--pokedex__panel-right">
          <Route path="/pokedex/:id" component={PokemonList} />
          <Route path="/pokemon/:id" component={Pokemon} />
          <Route path="/item-category/:id" component={ItemList} />
          <Route path="/item/:id" component={Item} />
        </div>
      </div>
    );
  }
}

export default withRouter(Pokedex);
