import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import withData from '../HOC/withData';

import '../scss/component-panel-left-subnav.scss';

class PokedexSubnav extends Component {
  getRows() {
    //making the rows to display
    var rows = [];
    var data = this.props.data.results;
    if (data) {
      for (var i = 0; i < data.length; i++) {
        let url = data[i].url;
        url = url.replace('api/v2/', '');

        rows.push(
          <div key={i} className="component--pokedex-list__item">
            <NavLink to={url}>{data[i].name}</NavLink>
          </div>
        );
      }
    }
    return rows;
  }

  render() {
    return <div className="component--pokedex-list">{this.getRows()}</div>;
  }
}
var path = '/assets/data/api/v2/pokedex/index.json';
const WrappedComponent = withData(PokedexSubnav, path);

export default WrappedComponent;
