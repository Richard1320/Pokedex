import React, { Component } from 'react';

import { normalizeName, fileFetchData } from '../Helpers';

class PokemonImages extends Component {
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
    let imageTypes = Object.keys(this.state.HDImages);
    for (let i = 0; i < imageTypes.length; i++) {
      let imageType = imageTypes[i];
      let fileArray = this.state.HDImages[imageType];
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
      for (let x = 0; x < fileArray.length; x++) {
        let name = this.props.data.name || '';
        let key = name + '_' + x + '_' + i;
        let file = fileArray[x].file;
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
      }
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
  data: {},
};
export default PokemonImages;
