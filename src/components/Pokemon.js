import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import withData from '../HOC/withData';
import PokemonOverview from './PokemonOverview';
import PokemonStats from './PokemonStats';
import PokemonMoves from './PokemonMoves';

class Pokemon extends Component {
  render() {
    return (
      <div className="component--pokemon">
        <Route
          exact
          path="/pokemon/:id"
          render={() => <PokemonOverview {...this.props} />}
        />
        <Route
          path="/pokemon/:id/stats"
          render={() => <PokemonStats {...this.props} />}
        />
        <Route
          path="/pokemon/:id/moves"
          render={() => <PokemonMoves {...this.props} />}
        />
      </div>
    );
  }
}

var path = '/assets/data/api/v2/pokemon/:id/index.json';
let WrappedComponent = withData(Pokemon, path);

export default WrappedComponent;
