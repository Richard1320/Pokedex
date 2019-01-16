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
  searchSubmit(search) {
    this.setState({
      search: search,
    });
  }
  render() {
    let wrapperClass = ['component--pokedex'];
    let routeArray = this.props.location.pathname.split('/').map(element => {
      return isNaN(element) ? element : '';
    });
    console.log(routeArray);
    wrapperClass.push('route-' + routeArray.join('-'));
    if (this.state.search) wrapperClass.push('has-search-results');

    return (
      <div className={wrapperClass.join(' ')}>
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
        <div className="component--pokedex__input">
          <Route
            path="/search"
            render={props => (
              <SearchInput
                {...props}
                searchText={this.state.search}
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
