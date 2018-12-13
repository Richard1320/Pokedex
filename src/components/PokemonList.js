import React, { Component } from 'react';
import withData from './withData';
import { NavLink, matchPath } from 'react-router-dom';
const match = matchPath(window.location.pathname, {
  path: '/pokedex/:id',
});
class PokemonList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      limit: 15,
    };
  }
  getRows() {
    //making the rows to display
    let rows = [];
    let data = this.props.data.pokemon_entries;
    if (data) {
      let count = data.length;
      let start = (this.state.page - 1) * this.state.limit;
      let end = start + this.state.limit;
      if (end > count) {
        end = count;
      }

      data.slice(start, end).forEach(function(item) {
        let image = '/images/sprites/pokemon/' + item.entry_number + '.png';
        rows.push(
          <div
            key={item.entry_number}
            className="component--pokemon-list__pokemon"
          >
            Pokedex #: {item.entry_number}
            <img src={image} alt={item.pokemon_species.name} />
            {item.pokemon_species.name}
          </div>,
        );
      });
    }

    return rows;
  }

  render() {
    return (
      <div className="component--pokemon-list">
        <div className="component--pokemon-list__table">{this.getRows()}</div>
      </div>
    );
  }
}
let WrappedComponent = '';
if (match) {
  let pokedexId = match.params.id;
  var path = '/data/api/v2/pokedex/' + pokedexId + '/index.json';
  WrappedComponent = withData(PokemonList, path);
}
export default WrappedComponent;
