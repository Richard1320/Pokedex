import React, { Component } from 'react';

import '../scss/component-pokedex-instructions.scss';

class PokedexInstructions extends Component {
  render() {
    return (
      <div className="component--pokedex-instructions">
        <p>Please click on one of the buttons below to start</p>
        <div className="fal fa-arrow-down" />
      </div>
    );
  }
}

export default PokedexInstructions;
