import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import withData from '../HOC/withData';
import { normalizeName } from '../Helpers';

class ItemList extends Component {
  renderRows() {
    //making the rows to display
    let rows = [];
    let data = this.props.data.items;
    if (data) {
      rows = data.map(item => {
        let image = '/assets/images/sprites/items/' + item.name + '.png';
        let itemID = parseInt(item.url.replace('/api/v2/item/', ''));
        let url = '/item/' + itemID;
        let name = normalizeName(item.name);
        return (
          <div key={item.name} className="component--item-list__table__row">
            <div className="component--item-list__table__row__image">
              <img src={image} alt={name} title={name} />
            </div>
            <div className="component--item-list__table__row__link">
              <NavLink to={url}>{name}</NavLink>
            </div>
          </div>
        );
      });
    }

    return rows;
  }

  render() {
    return (
      <div className="component--item-list">
        <div className="component--item-list__table">{this.renderRows()}</div>
      </div>
    );
  }
}

// Specifies the default values for props:
ItemList.defaultProps = {
  data: {},
};

var path = '/assets/data/api/v2/item-category/:id/index.json';
let WrappedComponent = withData(ItemList, path);

export default WrappedComponent;
