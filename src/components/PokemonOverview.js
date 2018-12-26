import React, { Component } from 'react';

import { normalizeName } from '../Helpers';
import '../scss/component-pokemon-overview.scss';

export default class PokemonOverview extends Component {
  getAbilities() {
    let abilities = [];
    if (this.props.data.abilities) {
      for (let i = 0; i < this.props.data.abilities.length; i++) {
        let abilityName = normalizeName(
          this.props.data.abilities[i].ability.name
        );

        abilities.push(
          <div key={this.props.data.abilities[i].slot}>
            {abilityName}
            {this.props.data.abilities[i].is_hidden
              ? ' (Hidden Ability)'
              : null}
          </div>
        );
      }
    }
    return abilities;
  }
  getTypes() {
    let types = [];
    if (this.props.data.types) {
      for (let i = 0; i < this.props.data.types.length; i++) {
        let typeName = normalizeName(this.props.data.types[i].type.name);
        types.push(<div key={this.props.data.types[i].slot}>{typeName}</div>);
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
          let title = normalizeName(this.props.data.name + ' ' + key);
          image = image.replace(
            'https://raw.githubusercontent.com/PokeAPI/sprites/master/',
            '/assets/images/'
          );

          sprites.push(
            <div
              key={key}
              className="component--pokemon__overview__sprites__item"
            >
              <img src={image} alt={this.props.data.name} title={title} />
            </div>
          );
        }
      }
    }
    return sprites;
  }
  render() {
    return (
      <div className="component--pokemon__overview">
        <h2>{normalizeName(this.props.data.name)}</h2>
        <div className="component--pokemon__overview__sprites">
          {this.getSprites()}
        </div>
        <div className="component--pokemon__overview__abilities">
          <h3>Abilities</h3>
          {this.getAbilities()}
        </div>
        <div className="component--pokemon__overview__types">
          <h3>Types</h3>
          {this.getTypes()}
        </div>
      </div>
    );
  }
}
// Specifies the default values for props:
PokemonOverview.defaultProps = {
  data: {},
};
