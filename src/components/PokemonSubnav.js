import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

export default class PokemonSubnav extends Component {
  render() {
    let overviewURL = '/pokemon/' + this.props.match.params.id;
    let statsURL = '/pokemon/' + this.props.match.params.id + '/stats';
    let movesURL = '/pokemon/' + this.props.match.params.id + '/moves';
    return (
      <div className="component--pokemon__subnav">
        <ul className="component--pokemon__subnav__list">
          <li className="component--pokemon__subnav__list__item">
            <NavLink to={overviewURL}>Overview</NavLink>
          </li>
          <li className="component--pokemon__subnav__list__item">
            <NavLink to={statsURL}>Stats</NavLink>
          </li>
          <li className="component--pokemon__subnav__list__item">
            <NavLink to={movesURL}>Moves</NavLink>
          </li>
        </ul>
      </div>
    );
  }
}
