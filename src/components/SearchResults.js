import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import pokemonData from '../assets/data/api/v2/pokemon/index.json';
import itemsData from '../assets/data/api/v2/item/index.json';
import { normalizeName } from '../Helpers';

class SearchResults extends Component {
  filterSearch(value) {
    let search = this.props.search.toLowerCase();
    let name = normalizeName(value.name).toLowerCase();

    return name.indexOf(search) !== -1;
  }
  renderRows() {
    let rows = [];

    if (this.props.search && pokemonData.results && itemsData.results) {
      pokemonData.results.forEach(item => {
        if (this.filterSearch(item)) {
          let itemID = parseInt(item.url.replace('/api/v2/pokemon/', ''));
          let image = '/assets/images/sprites/pokemon/' + itemID + '.png';
          let url = '/pokemon/' + itemID;
          let name = normalizeName(item.name);
          rows.push(
            <div
              key={item.name}
              className="component--search-results__table__row"
            >
              <div className="component--search-results__table__row__type">
                Pokemon
              </div>
              <div className="component--search-results__table__row__image">
                <img src={image} alt={name} title={name} />
              </div>
              <div className="component--search-results__table__row__link">
                <NavLink to={url}>{name}</NavLink>
              </div>
            </div>
          );
        }
      });
      itemsData.results.forEach(item => {
        if (this.filterSearch(item)) {
          let itemID = parseInt(item.url.replace('/api/v2/item/', ''));
          let image = '/assets/images/sprites/items/' + item.name + '.png';
          let url = '/item/' + itemID;
          let name = normalizeName(item.name);
          rows.push(
            <div
              key={item.name}
              className="component--search-results__table__row"
            >
              <div className="component--search-results__table__row__type">
                Item
              </div>
              <div className="component--search-results__table__row__image">
                <img src={image} alt={name} title={name} />
              </div>
              <div className="component--search-results__table__row__link">
                <NavLink to={url}>{name}</NavLink>
              </div>
            </div>
          );
        }
      });
    }

    return rows;
  }
  render() {
    return (
      <div className="component--search-results">
        <div className="component--search-results__table">
          {this.renderRows()}
        </div>
      </div>
    );
  }
}

export default SearchResults;
