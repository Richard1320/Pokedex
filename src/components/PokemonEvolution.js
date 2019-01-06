import React, { Component } from 'react';

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
      evolution_chain = this.props.data.evolution_chain;
    } catch (err) {
      return;
    }
    if (!this.state.data.id && evolution_chain) {
      var path = evolution_chain.url;
      path = '/assets/data' + path + 'index.json';
      fileFetchData(path, this.evolutionDataCallback.bind(this));
    }
  }
  componentDidUpdate(prevProps) {
    if (
      !this.state.data.id ||
      prevProps.data.evolution_chain.url !== this.props.data.evolution_chain.url
    ) {
      var path = this.props.data.evolution_chain.url;
      path = '/assets/data' + path + 'index.json';
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

    if (chain.evolution_details[0]) {
      let method = chain.evolution_details[0].trigger.name;
      let keyMethod = 'method-' + name + method;
      let evolutionDetailKeys = Object.keys(chain.evolution_details[0]);
      details.push(
        <div key={keyMethod}>Evolves by {normalizeName(method)}</div>
      );

      for (let i = 0; i < evolutionDetailKeys.length; i++) {
        let evolutionDetailKey = evolutionDetailKeys[i];
        let evolutionDetail = chain.evolution_details[0][evolutionDetailKey];
        if (evolutionDetail && evolutionDetailKey !== 'trigger') {
          let keyDetails = keyMethod + evolutionDetailKey;
          details.push(
            <div key={keyDetails}>
              {normalizeName(evolutionDetailKey)}: {evolutionDetail}
            </div>
          );
        }
      }
    }

    content.push(
      <div key={key} className="component--pokemon-evolution__item">
        <div className="component--pokemon-evolution__item__name">
          {normalizeName(name)}
        </div>
        <div className="component--pokemon-evolution__item__details">
          {details}
        </div>
      </div>
    );
    if (chain.evolves_to) {
      for (let i = 0; i < chain.evolves_to.length; i++) {
        let nextChain = chain.evolves_to[i];
        content = this.evolutionLoop(nextChain, content);
      }
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
