import React, { Component } from 'react';
import URLPattern from 'url-pattern';
import { NavLink } from 'react-router-dom';

import withData from '../HOC/withData';
import Pagination from './Pagination';

class PokemonList extends Component {
  constructor(props) {
    super(props);
    this.routePattern = new URLPattern('/api/v2/pokemon-species/:id/');
    this.state = {
      pager: {
        page: 1,
        itemsPerPage: 15,
      },
    };
  }
  pagerSubmit(pager) {
    // Set state
    this.setState({
      pager: pager,
    });
  }
  getRows() {
    //making the rows to display
    let _this = this;
    let rows = [];
    let data = this.props.data.pokemon_entries;
    if (data) {
      let count = data.length;
      let start = (this.state.pager.page - 1) * this.state.pager.itemsPerPage;
      let end = start + this.state.pager.itemsPerPage;
      if (end > count) {
        end = count;
      }

      data.slice(start, end).forEach(function(item) {
        let routeParams = _this.routePattern.match(item.pokemon_species.url);
        let image = '/images/sprites/pokemon/' + routeParams.id + '.png';
        let url = '/pokemon/' + routeParams.id;
        rows.push(
          <div
            key={item.entry_number}
            className="component--pokemon-list__pokemon"
          >
            Pokedex #{item.entry_number}
            <img src={image} alt={item.pokemon_species.name} />
            <NavLink to={url}>{item.pokemon_species.name}</NavLink>
          </div>,
        );
      });
    }

    return rows;
  }

  render() {
    let count = 0;
    if (this.props.data.hasOwnProperty('pokemon_entries')) {
      count = this.props.data.pokemon_entries.length;
    }
    return (
      <div className="component--pokemon-list">
        <div className="component--pokemon-list__table">{this.getRows()}</div>
        <Pagination
          count={count}
          pager={this.state.pager}
          pagerSubmit={this.pagerSubmit.bind(this)}
        />
      </div>
    );
  }
}

// Specifies the default values for props:
PokemonList.defaultProps = {
  data: {},
};

var path = '/data/api/v2/pokedex/:id/index.json';
let WrappedComponent = withData(PokemonList, path);

export default WrappedComponent;
