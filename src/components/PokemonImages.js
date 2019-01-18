import React, { Component } from 'react';

import HDImagesData from '../assets/images/HQImageList.json';
import { normalizeName } from '../Helpers';

class PokemonImages extends Component {
  renderHDImage() {
    let images = [];
    let imageTypes = Object.keys(HDImagesData);
    imageTypes.forEach((imageType, i) => {
      let fileArray = HDImagesData[imageType];
      let folder = '';

      switch (imageType) {
        case 'regular':
          folder = 'FurretTurret_REGULAR_HD_SPRITES';
          break;
        case 'shiny':
        default:
          folder = 'FurretTurret_SHINY_HD_SPRITES';
          break;
      }
      fileArray.forEach((element, x) => {
        let name = this.props.pokemonSpecies.name || '';
        let key = name + '_' + x + '_' + i;
        let file = element.file;
        let nameLower = name.toLowerCase();
        let fileLower = file.toLowerCase();

        // Check if names match
        if (nameLower && fileLower.indexOf(nameLower) !== -1) {
          let image = '/assets/images/' + folder + '/' + file;
          let description = file
            .split('.')
            .slice(0, -1)
            .join('.'); // Remove extension from filename
          description = normalizeName(description) + ' ' + imageType;

          images.push(
            <div key={key} className="component--pokemon-images__item">
              <h2>{description}</h2>
              <div>
                <img src={image} alt={description} title={description} />
              </div>
            </div>
          );
        }
      });
    });

    if (!images.length) {
      images.push(
        <div className="component--pokemon-imagess__na">
          No images found for {this.props.pokemon.name}.
        </div>
      );
    }

    return images;
  }
  render() {
    return (
      <div className="component--pokemon-images">{this.renderHDImage()}</div>
    );
  }
}

// Specifies the default values for props:
PokemonImages.defaultProps = {
  pokemon: {},
  pokemonSpecies: {},
};

export default PokemonImages;
