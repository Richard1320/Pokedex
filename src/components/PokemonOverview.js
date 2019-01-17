import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import { normalizeName } from '../Helpers';

class PokemonOverview extends Component {
  renderAbilities() {
    let abilities = [];
    if (this.props.data.abilities) {
      abilities = this.props.data.abilities.map(element => {
        let abilityName = normalizeName(element.ability.name);
        return (
          <div key={element.slot}>
            {abilityName}
            {element.is_hidden ? ' (Hidden Ability)' : null}
          </div>
        );
      });
    }
    return abilities;
  }
  renderTypes() {
    let types = [];
    if (this.props.data.types) {
      types = this.props.data.types.map(element => {
        let typeName = normalizeName(element.type.name);
        return <div key={element.slot}>{typeName}</div>;
      });
    }
    return types;
  }
  renderDescription() {
    let entries = this.props.data.flavor_text_entries;
    if (entries) {
      // Get the English entry
      let entry = entries.filter(entry => entry.language.name === 'en');
      return entry[0].flavor_text;
    }
  }
  renderSprites() {
    let sprites = [];
    if (this.props.data.sprites) {
      let spriteTypes = {
        Regular: [
          'front_default',
          'front_female',
          'back_default',
          'back_female',
        ],
        Shiny: [
          'front_shiny',
          'front-shiny_female',
          'back_shiny',
          'back_shiny_female',
        ],
      };
      let spriteTypesKeys = Object.keys(spriteTypes);
      spriteTypesKeys.forEach(spriteType => {
        let spriteKeys = spriteTypes[spriteType];
        sprites.push(
          <div
            key={spriteType}
            className="component--pokemon-overview__sprites__item-title"
          >
            {spriteType}
          </div>
        );
        spriteKeys.forEach(spriteKey => {
          if (this.props.data.sprites[spriteKey]) {
            let image = this.props.data.sprites[spriteKey];
            let title = normalizeName(this.props.data.name + ' ' + spriteKey);
            image = image.replace(
              'https://raw.githubusercontent.com/PokeAPI/sprites/master/',
              '/assets/images/'
            );

            sprites.push(
              <div
                key={spriteKey}
                className="component--pokemon-overview__sprites__item"
              >
                <img src={image} alt={this.props.data.name} title={title} />
              </div>
            );
          }
        });
      });
    }
    return sprites;
  }
  renderVariations() {
    let render = [];
    if (this.props.data.varieties && this.props.data.varieties.length > 1) {
      render = this.props.data.varieties.map(item => {
        let itemID = parseInt(item.pokemon.url.replace('/api/v2/pokemon/', ''));
        let url = '/pokemon/' + itemID;
        let name = normalizeName(item.pokemon.name);
        return (
          <div
            key={item.pokemon.name}
            className="component--pokemon-overview__variations__item"
          >
            <NavLink to={url}>{name}</NavLink>
            {item.is_default ? ' (Default)' : null}
          </div>
        );
      });
    }
    return render;
  }
  render() {
    let variatonsTitle =
      this.props.data.varieties && this.props.data.varieties.length > 1 ? (
        <h3>Variations</h3>
      ) : null;
    return (
      <div className="component--pokemon-overview">
        <h2>{normalizeName(this.props.data.name)}</h2>
        <div className="component--pokemon-overview__sprites">
          {this.renderSprites()}
        </div>
        <div className="component--pokemon-overview__description">
          {this.renderDescription()}
        </div>
        <div className="component--pokemon-overview__abilities">
          <h3>Abilities</h3>
          {this.renderAbilities()}
        </div>
        <div className="component--pokemon-overview__types">
          <h3>Types</h3>
          {this.renderTypes()}
        </div>
        <div className="component--pokemon-overview__variations">
          {variatonsTitle}
          {this.renderVariations()}
        </div>
      </div>
    );
  }
}
// Specifies the default values for props:
PokemonOverview.defaultProps = {
  data: {},
};
export default PokemonOverview;
