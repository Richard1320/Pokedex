import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import { normalizeName, fileFetchData } from '../Helpers';

class PokemonEvolution extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
    };
  }
  componentDidMount() {
    let evolution_chain;
    try {
      evolution_chain = this.props.pokemonSpecies.evolution_chain;
    } catch (err) {
      return;
    }
    if (evolution_chain) {
      var path = evolution_chain.url;
      path = '/assets/data' + path + 'index.json';
      fileFetchData(path, this.evolutionDataCallback.bind(this));
    }
  }
  componentDidUpdate(prevProps) {
    let prevEvolutionURL;
    let nextEvolutionURL;
    try {
      nextEvolutionURL = this.props.pokemonSpecies.evolution_chain.url;
      prevEvolutionURL = prevProps.pokemonSpecies.evolution_chain.url;
    } catch (err) {}
    if (prevEvolutionURL !== nextEvolutionURL) {
      let path = '/assets/data' + nextEvolutionURL + 'index.json';
      fileFetchData(path, this.evolutionDataCallback.bind(this));
    }
  }
  evolutionDataCallback(json) {
    this.setState({
      data: json,
    });
  }
  evolutionLoop(chain, content) {
    let name = chain.species.name;
    let key = 'evolution-' + name;
    let details = [];
    let evolutionID = parseInt(
      chain.species.url.replace('/api/v2/pokemon-species/', '')
    );
    let url = '/pokemon/' + evolutionID;
    let image = '/assets/images/sprites/pokemon/' + evolutionID + '.png';

    if (chain.evolution_details[0]) {
      let method = chain.evolution_details[0].trigger.name;
      let keyMethod = 'method-' + name + method;
      let evolutionDetailKeys = Object.keys(chain.evolution_details[0]);
      details.push(
        <div key={keyMethod}>Evolves by {normalizeName(method)}</div>
      );

      evolutionDetailKeys.forEach(evolutionDetailKey => {
        let evolutionDetail = chain.evolution_details[0][evolutionDetailKey];

        // Skip the trigger description in loop. Already rendered above.
        if (evolutionDetailKey === 'trigger') return;

        // Check if evolution requirement exists
        // Check if evolution requirement data is an object
        if (evolutionDetail && typeof evolutionDetail === 'object') {
          // Check if evolution requirement has the name property
          if (evolutionDetail.hasOwnProperty('name')) {
            evolutionDetail = evolutionDetail.name;
          } else {
            return;
          }
        }

        if (evolutionDetail) {
          let keyDetails = keyMethod + evolutionDetailKey;
          details.push(
            <div key={keyDetails}>
              {normalizeName(evolutionDetailKey)}:{' '}
              {normalizeName(evolutionDetail)}
            </div>
          );
        }
      });
    }

    content.push(
      <div key={key} className="component--pokemon-evolution__item">
        <div className="component--pokemon-evolution__item__sprite">
          <NavLink to={url}>
            <img src={image} alt={name} title={normalizeName(name)} />
          </NavLink>
        </div>
        <div className="component--pokemon-evolution__item__name">
          <NavLink to={url}>{normalizeName(name)}</NavLink>
        </div>
        <div className="component--pokemon-evolution__item__details">
          {details}
        </div>
      </div>
    );
    if (chain.evolves_to) {
      chain.evolves_to.forEach(nextChain => {
        content = this.evolutionLoop(nextChain, content);
      });
    }
    return content;
  }
  renderEvolutionContent() {
    let chain = this.state.data.chain;
    let chainContent = [];
    if (chain) {
      chainContent = this.evolutionLoop(chain, chainContent);
    }
    return chainContent;
  }
  render() {
    return (
      <div className="component--pokemon-evolution">
        <h2>Pokemon Evolution</h2>
        {this.renderEvolutionContent()}
      </div>
    );
  }
}

export default PokemonEvolution;
