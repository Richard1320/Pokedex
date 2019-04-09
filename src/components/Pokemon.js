import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import axios from 'axios';

import PokemonOverview from './PokemonOverview';
// import PokemonImages from './PokemonImages';
import PokemonStats from './PokemonStats';
import PokemonMoves from './PokemonMoves';
import PokemonEvolution from './PokemonEvolution';
import PokemonEncounters from './PokemonEncounters';

class Pokemon extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
    };
  }
  componentDidMount() {
    let pokemonID;
    try {
      pokemonID = this.props.match.params.id;
    } catch (err) {
      return;
    }
    let path = '/assets/data/api/v2/pokemon/' + pokemonID + '/index.json';
    axios.get(path).then(this.pokemonDataCallback.bind(this));
  }
  componentDidUpdate(prevProps) {
    let prevPokemonID;
    let nextPokemonID;
    try {
      nextPokemonID = this.props.match.params.id;
      prevPokemonID = prevProps.match.params.id;
    } catch (err) {
      return;
    }
    if (prevPokemonID !== nextPokemonID) {
      let path = '/assets/data/api/v2/pokemon/' + nextPokemonID + '/index.json';
      axios.get(path).then(this.pokemonDataCallback.bind(this));
    }
  }
  pokemonDataCallback(response) {
    let pokemonSpeciesID = parseInt(
      response.data.species.url.replace('/api/v2/pokemon-species/', '')
    );
    let path =
      '/assets/data/api/v2/pokemon-species/' + pokemonSpeciesID + '/index.json';

    this.setState({
      pokemon: response.data,
    });
    axios.get(path).then(this.pokemonSpeciesDataCallback.bind(this));
  }
  pokemonSpeciesDataCallback(response) {
    this.setState({
      pokemonSpecies: response.data,
    });
  }
  render() {
    return (
      <div className="component--pokemon">
        <Route
          exact
          path="/pokemon/:id"
          render={() => (
            <PokemonOverview
              {...this.props}
              pokemon={this.state.pokemon}
              pokemonSpecies={this.state.pokemonSpecies}
            />
          )}
        />
        {/* <Route
          path="/pokemon/:id/images"
          render={() => (
            <PokemonImages
              {...this.props}
              pokemon={this.state.pokemon}
              pokemonSpecies={this.state.pokemonSpecies}
            />
          )}
        /> */}
        <Route
          path="/pokemon/:id/stats"
          render={() => (
            <PokemonStats
              {...this.props}
              pokemon={this.state.pokemon}
              pokemonSpecies={this.state.pokemonSpecies}
            />
          )}
        />
        <Route
          path="/pokemon/:id/moves"
          render={() => (
            <PokemonMoves
              {...this.props}
              pokemon={this.state.pokemon}
              pokemonSpecies={this.state.pokemonSpecies}
            />
          )}
        />
        <Route
          path="/pokemon/:id/evolution"
          render={() => (
            <PokemonEvolution
              {...this.props}
              pokemon={this.state.pokemon}
              pokemonSpecies={this.state.pokemonSpecies}
            />
          )}
        />
        <Route
          path="/pokemon/:id/encounters"
          render={() => (
            <PokemonEncounters
              {...this.props}
              pokemon={this.state.pokemon}
              pokemonSpecies={this.state.pokemonSpecies}
            />
          )}
        />
      </div>
    );
  }
}

export default Pokemon;
