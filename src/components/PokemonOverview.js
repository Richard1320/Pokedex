import React, { Component } from 'react';

import { normalizeName, fileFetchData } from '../Helpers';
import '../scss/component-pokemon-overview.scss';

class PokemonOverview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      HDImages: [],
    };
  }
  componentDidMount() {
    var path = '/assets/images/HQImageList.json';
    fileFetchData(path, this.HDImageCallback.bind(this));
  }
  HDImageCallback(json) {
    this.setState({
      HDImages: json,
    });
  }
  renderHDImage() {
    let images = [];
    for (let i = 0; i < this.state.HDImages.length; i++) {
      let name = this.props.data.name || '';
      let key = name + '_' + i;
      let file = this.state.HDImages[i].file;
      let nameLower = name.toLowerCase();
      let fileLower = file.toLowerCase();
      
      // Check if names match
      if (nameLower && fileLower.indexOf(nameLower) !== -1) {
        let image = '/assets/images/FurretTurret_SHINY_HD_SPRITES/' + file;
        images.push(
          <div
            key={key}
            className="component--pokemon-overview__hd-image__item"
          >
            <img src={image} alt={name} title={name} />
          </div>
        );
      }
    }

    return images;
  }
  renderAbilities() {
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
  renderTypes() {
    let types = [];
    if (this.props.data.types) {
      for (let i = 0; i < this.props.data.types.length; i++) {
        let typeName = normalizeName(this.props.data.types[i].type.name);
        types.push(<div key={this.props.data.types[i].slot}>{typeName}</div>);
      }
    }
    return types;
  }
  renderSprites() {
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
              className="component--pokemon-overview__sprites__item"
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
      <div className="component--pokemon-overview">
        <h2>{normalizeName(this.props.data.name)}</h2>
        <div className="component--pokemon-overview__hd-image">
          {this.renderHDImage()}
        </div>
        <div className="component--pokemon-overview__sprites">
          {this.renderSprites()}
        </div>
        <div className="component--pokemon-overview__abilities">
          <h3>Abilities</h3>
          {this.renderAbilities()}
        </div>
        <div className="component--pokemon-overview__types">
          <h3>Types</h3>
          {this.renderTypes()}
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
