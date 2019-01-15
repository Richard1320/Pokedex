import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

// import withData from '../HOC/withData';
import { normalizeName, fileFetchData } from '../Helpers';

class SearchResults extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pokemon: {},
      items: {},
    };
  }
  componentDidMount() {
    fileFetchData(
      '/assets/data/api/v2/pokemon/index.json',
      this.pokemonCallback.bind(this)
    );
    fileFetchData(
      '/assets/data/api/v2/item/index.json',
      this.itemsCallback.bind(this)
    );
  }
  pokemonCallback(json) {
    this.setState({
      pokemon: json,
    });
  }
  itemsCallback(json) {
    this.setState({
      items: json,
    });
  }

  filterSearch(value) {
    let search = this.props.search.toLowerCase();
    let name = normalizeName(value.name).toLowerCase();

    return name.indexOf(search) !== -1;
  }
  renderRows() {
    let rows = [];

    if (
      this.props.search &&
      this.state.pokemon.results &&
      this.state.items.results
    ) {
      this.state.pokemon.results.forEach(item => {
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
      this.state.items.results.forEach(item => {
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

// // Specifies the default values for props:
// SearchResults.defaultProps = {
//   data: {},
// };

// let path = [
//   '/assets/data/api/v2/item/index.json',
//   '/assets/data/api/v2/pokemon/index.json',
// ];
// let params = { keyNames: ['items', 'pokemon'] };
// let WrappedComponent = withData(SearchResults, path, params);

// export default WrappedComponent;
export default SearchResults;
