import React, { Component } from 'react';
import { Route, NavLink, HashRouter } from 'react-router-dom';
import Home from './components/Home';
import Stuff from './components/Stuff';
import PokedexChoice from './components/PokedexChoice';
import './scss/component-app.scss';

class App extends Component {
  render() {
    return (
      <HashRouter>
        <div className="component--app">
          <h1>Pokedex</h1>
          <ul className="component--app__menu">
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/stuff">Stuff</NavLink>
            </li>
            <li>
              <NavLink to="/pokedex">Pokedex</NavLink>
            </li>
          </ul>
          <div className="component--app__panel-left">
            <Route exact path="/pokedex" component={PokedexChoice} />
          </div>
          <div className="component--app__panel-right">
            <Route exact path="/" component={Home} />
            <Route path="/stuff/:name?" component={Stuff} />
          </div>
        </div>
      </HashRouter>
    );
  }
}

export default App;
