import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import '../scss/component-panel-left-subnav.scss';

export default class PokemonSubnav extends Component {
  render() {
    let overviewURL = '/pokemon/' + this.props.match.params.id;
    let statsURL = '/pokemon/' + this.props.match.params.id + '/stats';
    let movesURL = '/pokemon/' + this.props.match.params.id + '/moves';
    return (
      <div className="component--pokemon-subnav">
        <div className="component--pokemon-subnav__item">
          <NavLink exact to={overviewURL}>
            Overview
          </NavLink>
        </div>
        <div className="component--pokemon-subnav__item">
          <NavLink to={statsURL}>Stats</NavLink>
        </div>
        <div className="component--pokemon-subnav__item">
          <NavLink to={movesURL}>Moves</NavLink>
        </div>
      </div>
    );
  }
}
