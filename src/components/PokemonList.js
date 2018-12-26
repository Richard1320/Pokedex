import React, { Component } from 'react';
import URLPattern from 'url-pattern';
import { NavLink } from 'react-router-dom';

import withData from '../HOC/withData';
import Pagination from './Pagination';
import { normalizeName } from '../Helpers';
import '../scss/component-pokemon-list.scss';

class PokemonList extends Component {
  constructor(props) {
    super(props);
    this.routePattern = new URLPattern('/api/v2/pokemon-species/:id/');
    this.state = {
      pager: {
        page: 1,
        itemsPerPage: 20,
      },
    };
  }
  pagerSubmit(pager) {
    // Set state
    this.setState({
      pager: pager,
    });
  }
  renderRows() {
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
        let image = '/assets/images/sprites/pokemon/' + routeParams.id + '.png';
        let url = '/pokemon/' + routeParams.id;
        let name = normalizeName(item.pokemon_species.name);
        rows.push(
          <div
            key={item.entry_number}
            className="component--pokemon-list__table__row"
          >
            <div className="component--pokemon-list__table__row__number">
              #{item.entry_number}
            </div>
            <div className="component--pokemon-list__table__row__image">
              <img src={image} alt={name} title={name} />
            </div>
            <div className="component--pokemon-list__table__row__link">
              <NavLink to={url}>{name}</NavLink>
            </div>
          </div>
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
        <div className="component--pokemon-list__table">
          {this.renderRows()}
        </div>
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

var path = '/assets/data/api/v2/pokedex/:id/index.json';
let WrappedComponent = withData(PokemonList, path);

export default WrappedComponent;
