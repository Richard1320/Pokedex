import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import withData from '../HOC/withData';
import PokemonStats from './PokemonStats';
import PokemonOverview from './PokemonOverview';

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
      </div>
    );
  }
}

var path = '/data/api/v2/pokemon/:id/index.json';
let WrappedComponent = withData(Pokemon, path);

export default WrappedComponent;
