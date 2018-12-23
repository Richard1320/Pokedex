import React, { Component } from 'react';
import '../scss/component-pokemon-moves.scss';

export default class PokemonMoves extends Component {
  constructor(props) {
    super(props);
    this.state = {
      generations: {
        chosen: 'g1',
        versions: {
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
        </option>,
      );
    });

    return (
      <select onChange={this.generationChange.bind(this)}>{options}</select>
    );
  }
  getMoves() {
    // console.log(this.props.data.moves);
    let moves = [];
    let chosenGenVersion = this.state.generations.versions[
      this.state.generations.chosen
    ];
    if (this.props.data.moves) {
      console.log(this.props.data.moves);
      // Loop through all available moves
      for (let i = 0; i < this.props.data.moves.length; i++) {
        let item = this.props.data.moves[i];

        // Get game versions that this move can be learned in
        let versions = item.version_group_details;
        let keys = Object.keys(versions);

        // Loop through game versions for move
        for (let key in keys) {
          let version = versions[key].version_group.name;

          // Check if chosen generation can learn this move
          if (chosenGenVersion.indexOf(version) !== -1) {
            moves.push(
              <div
                key={item.move.name}
                className="component--pokemon-moves__item"
              >
                <div>Move: {item.move.name}</div>
                <div>Learned by: {versions[key].move_learn_method.name}</div>
                {versions[key].move_learn_method.name === 'level-up' ? (
                  <div>Level: {versions[key].level_learned_at}</div>
                ) : null}
              </div>,
            );
            break;
          }
        }
      }
    }
    return moves;
  }
  render() {
    return (
      <div className="component--pokemon-moves">
        <div className="component--pokemon-moves__generations">
          {this.getGenerations()}
          <h3>Generation {this.state.generations.chosen}</h3>
        </div>
        <div className="component--pokemon-moves__list">{this.getMoves()}</div>
      </div>
    );
  }
}
// Specifies the default values for props:
PokemonMoves.defaultProps = {
  data: {},
};
