import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import withData from '../HOC/withData';
import { normalizeName } from '../Helpers';

class Item extends Component {
  // renderAttributes() {
  //   let render = [];
  //   for (let i = 0; i < this.props.data.attributes.length; i++) {
  //     let attribute = this.props.data.attributes[i];
  //     render.push(
  //       <div key={attribute.name} className="component--item__attributes__item">
  //         {normalizeName(attribute.name)}
  //       </div>
  //     );
  //   }
  //   return render;
  // }
  render() {
    if (!this.props.data.name) return null;
    let name = this.props.data.name;
    let image = '/assets/images/sprites/items/' + name + '.png';
    let category = this.props.data.category;
    let categoryID = parseInt(
      category.url.replace('/api/v2/item-category/', '')
    );
    let categoryURL = '/item-category/' + categoryID;

    return (
      <div className="component--item">
        <h1 className="component--item__title">{normalizeName(name)}</h1>
        <div className="component--item__category">
          <NavLink to={categoryURL}>{normalizeName(category.name)}</NavLink>
        </div>
        <div className="component--item__image">
          <img src={image} alt={name} title={name} />
        </div>
        <div className="component--item__effect">
          {this.props.data.effect_entries[0].effect}
        </div>
        {/* <div className="component--item__attributes">
          {this.renderAttributes()}
        </div> */}
      </div>
    );
  }
}

// Specifies the default values for props:
Item.defaultProps = {
  data: {},
};

var path = '/assets/data/api/v2/item/:id/index.json';
let WrappedComponent = withData(Item, path);

export default WrappedComponent;
