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
import SearchInput from './SearchInput';
import SearchResults from './SearchResults';

class Pokedex extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
    };
  }
  filterResults() {}
  searchSubmit(search) {
    this.setState(
      {
        search: search,
      },
      function() {
        this.filterResults();
      }
    );
  }
  render() {
    let searchClass =
      this.props.location.pathname.indexOf('/search') !== -1
        ? 'component--pokedex__search is-active'
        : 'component--pokedex__search';
    return (
      <div className="component--pokedex">
        <div className="component--pokedex__menu">
          <NavLink to="/pokedex">
            <span className="btn--red" />
            Pokedex
          </NavLink>
          <NavLink to="/item-category">
            <span className="btn--blue" />
            Items
          </NavLink>
          <NavLink to="/search">
            <span className="btn--green" />
            Search
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
          <Route
            path="/search"
            render={props => (
              <SearchResults {...props} search={this.state.search} />
            )}
          />
        </div>
        <div className={searchClass}>
          <Route
            path="/search"
            render={props => (
              <SearchInput
                {...props}
                searchSubmit={this.searchSubmit.bind(this)}
              />
            )}
          />
        </div>
      </div>
    );
  }
}

export default withRouter(Pokedex);
