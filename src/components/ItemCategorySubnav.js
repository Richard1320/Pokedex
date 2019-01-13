import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import withData from '../HOC/withData';

import { normalizeName } from '../Helpers';

class ItemCategorySubnav extends Component {
  renderRows() {
    //making the rows to display
    var rows = [];
    var data = this.props.data.results;
    if (data) {
      for (var i = 0; i < data.length; i++) {
        let url = data[i].url;
        url = url.replace('api/v2/', '');

        rows.push(
          <div key={i} className="component--item-category-subnav__item">
            <NavLink to={url}>{normalizeName(data[i].name)}</NavLink>
          </div>
        );
      }
    }
    return rows;
  }

  render() {
    return (
      <div className="component--item-category-subnav">{this.renderRows()}</div>
    );
  }
}
var path = '/assets/data/api/v2/item-category/index.json';
const WrappedComponent = withData(ItemCategorySubnav, path);

export default WrappedComponent;