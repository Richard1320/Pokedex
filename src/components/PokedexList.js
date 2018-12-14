import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import withData from '../HOC/withData';

class PokedexList extends Component {
  getRows() {
    //making the rows to display
    var rows = [];
    var data = this.props.data.results;
    if (data) {
      for (var i = 0; i < data.length; i++) {
        let url = data[i].url;
        url = url.replace('api/v2/', '');

        rows.push(
          <div key={i}>
            <NavLink to={url}>{data[i].name}</NavLink>
          </div>,
        );
      }
    }
    return rows;
  }

  render() {
    return <div className="component--pokedex-list">{this.getRows()}</div>;
  }
}
var path = '/data/api/v2/pokedex/index.json';
const WrappedComponent = withData(PokedexList, path);

export default WrappedComponent;
