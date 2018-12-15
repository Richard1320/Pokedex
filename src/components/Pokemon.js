import React, { Component } from 'react';

import withData from '../HOC/withData';

class Pokemon extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  getAbilities() {
    let abilities = [];
    if (this.props.data.abilities) {
      for (let i = 0; i < this.props.data.abilities.length; i++) {
        abilities.push(
          <p key={this.props.data.abilities[i].slot}>
            {this.props.data.abilities[i].ability.name}
            {this.props.data.abilities[i].is_hidden ? '(Hidden Ability)' : null}
          </p>,
        );
      }
    }
    return abilities;
  }
  getTypes() {
    let types = [];
    if (this.props.data.types) {
      for (let i = 0; i < this.props.data.types.length; i++) {
        types.push(
          <p key={this.props.data.types[i].slot}>
            {this.props.data.types[i].type.name}
          </p>,
        );
      }
    }
    return types;
  }
  getSprites() {
    let sprites = [];
    if (this.props.data.sprites) {
      let keys = [
        'back_default',
        'back_female',
        'back_shiny',
        'back_shiny_female',
        'front_default',
        'front_female',
        'front_shiny',
        'front-shiny_female',
      ];
      for (let i = 0; i < keys.length; i++) {
        let key = keys[i];
        if (this.props.data.sprites[key]) {
          let image = this.props.data.sprites[key];
          let title = this.props.data.name + ' ' + key;
          image = image.replace(
            'https://raw.githubusercontent.com/PokeAPI/sprites/master/',
            '/images/',
          );

          sprites.push(
            <div key={key}>
              <img src={image} alt={this.props.data.name} title={title} />
            </div>,
          );
        }
      }
    }
    return sprites;
  }
  render() {
    return (
      <div className="component--pokemon">
        <h3>{this.props.data.name}</h3>
        <div className="component--pokemon__sprites">{this.getSprites()}</div>
        <p>
          <strong>Abilities</strong>
        </p>
        {this.getAbilities()}
        <p>
          <strong>Types</strong>
        </p>
        {this.getTypes()}
      </div>
    );
  }
}

var path = '/data/api/v2/pokemon/:id/index.json';
let WrappedComponent = withData(Pokemon, path);

export default WrappedComponent;
