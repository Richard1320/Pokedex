import React, { Component } from 'react';
import { HashRouter } from 'react-router-dom';

import Pokedex from './components/Pokedex';
import Credit from './components/Credit';
import './scss/app.scss';

class App extends Component {
  render() {
    return (
      <HashRouter>
        <div className="component--app">
          <Pokedex {...this.props} />
          <Credit />
        </div>
      </HashRouter>
    );
  }
}

export default App;
