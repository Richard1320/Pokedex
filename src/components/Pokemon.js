import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import withData from '../HOC/withData';
import PokemonOverview from './PokemonOverview';
import PokemonImages from './PokemonImages';
import PokemonStats from './PokemonStats';
import PokemonMoves from './PokemonMoves';
import PokemonEvolution from './PokemonEvolution';
import PokemonEncounters from './PokemonEncounters';

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
          path="/pokemon/:id/images"
          render={() => <PokemonImages {...this.props} />}
        />
        <Route
          path="/pokemon/:id/stats"
          render={() => <PokemonStats {...this.props} />}
        />
        <Route
          path="/pokemon/:id/moves"
          render={() => <PokemonMoves {...this.props} />}
        />
        <Route
          path="/pokemon/:id/evolution"
          render={() => <PokemonEvolution {...this.props} />}
        />
        <Route
          path="/pokemon/:id/encounters"
          render={() => <PokemonEncounters {...this.props} />}
        />
      </div>
    );
  }
}

var paths = [
  '/assets/data/api/v2/pokemon/:id/index.json',
  '/assets/data/api/v2/pokemon-species/:id/index.json',
];
let WrappedComponent = withData(Pokemon, paths);

export default WrappedComponent;
