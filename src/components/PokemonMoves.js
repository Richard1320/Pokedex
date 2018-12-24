import React, { Component } from 'react';
import '../scss/component-pokemon-moves.scss';

export default class PokemonMoves extends Component {
  constructor(props) {
    super(props);
    this.state = {
      generations: {
        chosen: 'g1',
        versions: {
          // /api/v2/generation/
          g1: ['red-blue', 'yellow'],
          g2: ['gold-silver', 'crystal'],
          g3: [
            'ruby-sapphire',
            'emerald',
            'firered-leafgreen',
            'colosseum',
            'xd',
          ],
          g4: ['diamond-pearl', 'platinum', 'heartgold-soulsilver'],
          g5: ['black-white', 'black-2-white-2'],
          g6: ['x-y', 'omega-ruby-alpha-sapphire'],
          g7: ['sun-moon'],
        },
      },
      moveLearnMethod: [
        // /api/v2/move-learn-method/
        'level-up',
        'egg',
        'tutor',
        'machine',
        'stadium-surfing-pikachu',
        'light-ball-egg',
        'colosseum-purification',
        'xd-shadow',
        'xd-purification',
        'form-change',
      ],
    };
  }
  generationChange(event) {
    let generations = Object.assign({}, this.state.generations);
    generations.chosen = event.target.value;
    this.setState({ generations: generations });
  }
  getGenerations() {
    let options = [];
    let versions = this.state.generations.versions;
    Object.keys(versions).forEach(function(key) {
      options.push(
        <option key={key} value={key}>
          {key}: {versions[key].join(', ')}
        </option>
      );
    });

    return (
      <select onChange={this.generationChange.bind(this)}>{options}</select>
    );
  }
  sortMoves(a, b) {
    let sortA = a.name;
    let sortB = b.name;

    // Sort by level up if available
    if (a.level_learned_at && b.level_learned_at) {
      sortA = a.level_learned_at;
      sortB = b.level_learned_at;
    }

    // Return sort order
    if (sortA < sortB) return -1;
    if (sortA > sortB) return 1;
    return 0;
  }
  getMoves(method) {
    // Reorganize data as an array
    let moves = [];
    let chosenGenVersion = this.state.generations.versions[
      this.state.generations.chosen
    ];
    if (this.props.data.moves) {
      // Loop through all available moves
      for (let i = 0; i < this.props.data.moves.length; i++) {
        let item = this.props.data.moves[i];

        // Get game versions that this move can be learned in
        let versions = item.version_group_details;
        let keys = Object.keys(versions);

        // Loop through game versions for move
        for (let key in keys) {
          let itemVersion = versions[key].version_group.name;
          let itemMethod = versions[key].move_learn_method.name;

          // Check if chosen generation can learn this move
          // Check if method to learn move is the same
          if (
            chosenGenVersion.indexOf(itemVersion) !== -1 &&
            itemMethod === method
          ) {
            moves.push({
              method: itemMethod,
              level_learned_at: versions[key].level_learned_at,
              name: item.move.name,
            });

            break;
          }
        }
      }
    }

    // Sort moves by level up or alphabetical
    moves.sort(this.sortMoves);

    return moves;
  }
  renderMoves() {
    let render = [];
    for (let i = 0; i < this.state.moveLearnMethod.length; i++) {
      let method = this.state.moveLearnMethod[i];
      let moves = this.getMoves(method);
      let movesHTML = [];

      // Check if any moves are available
      if (!moves.length) continue;

      for (let x = 0; x < moves.length; x++) {
        let move = moves[x];
        let reactKey = method + '-' + move.name;
        movesHTML.push(
          <div key={reactKey} className="component--pokemon-moves__item">
            <div>{move.name}</div>
            {method === 'level-up' ? (
              <div>Level: {move.level_learned_at}</div>
            ) : null}
          </div>
        );
      }
      render.push(
        <div key={method} className="component--pokemon-moves__method">
          <h3>{method}</h3>
          {movesHTML}
        </div>
      );
    }
    return render;
  }
  render() {
    return (
      <div className="component--pokemon-moves">
        <div className="component--pokemon-moves__generations">
          {this.getGenerations()}
          <h3>Generation {this.state.generations.chosen}</h3>
        </div>
        <div className="component--pokemon-moves__list">
          {this.renderMoves()}
        </div>
      </div>
    );
  }
}
// Specifies the default values for props:
PokemonMoves.defaultProps = {
  data: {},
};
