import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import withData from '../HOC/withData';

import { normalizeName } from '../Helpers';

class PokedexSubnav extends Component {
  renderRows() {
    //making the rows to display
    var rows = [];
    var data = this.props.data.results;
    if (data) {
      data.forEach((element, index) => {
        let url = element.url;
        url = url.replace('api/v2/', '');

        rows.push(
          <div key={index} className="component--pokedex-subnav__item">
            <NavLink to={url}>{normalizeName(element.name)}</NavLink>
          </div>
        );
      });
    }
    return rows;
  }

  render() {
    return <div className="component--pokedex-subnav">{this.renderRows()}</div>;
  }
}
var path = '/assets/data/api/v2/pokedex/index.json';
const WrappedComponent = withData(PokedexSubnav, path);

export default WrappedComponent;
