import React, { Component } from 'react';

import withData from '../HOC/withData';
import { normalizeName } from '../Helpers';

class PokemonEncounters extends Component {
  constructor(props) {
    super(props);
    this.state = {
      versions: {
        chosen: 'red',
        options: [
          // /api/v2/version/
          'red',
          'blue',
          'yellow',
          'gold',
          'silver',
          'crystal',
          'ruby',
          'sapphire',
          'emerald',
          'firered',
          'leafgreen',
          'diamond',
          'pearl',
          'platinum',
          'heartgold',
          'soulsilver',
          'black',
          'white',
          'colosseum',
          'xd',
          'black-2',
          'white-2',
          'x',
          'y',
          'omega-ruby',
          'alpha-sapphire',
          'sun',
          'moon',
        ],
      },
    };
  }
  versionChange(event) {
    let versions = Object.assign({}, this.state.versions);
    versions.chosen = event.target.value;
    this.setState({ versions: versions });
  }
  getVersions() {
    let options = [];
    let versions = this.state.versions.options;

    for (let i = 0; i < versions.length; i++) {
      let version = versions[i];
      let encounters = this.getEncounters(version);
      let reactKey = 'encounter-option-' + version;

      // Check if any moves are available
      // if (!encounters.length) continue;

      options.push(
        <option key={reactKey} value={version}>
          {normalizeName(version)}:{' '}
          {encounters.length ? encounters.length + ' locations' : 'N/A'}
        </option>
      );
    }

    return (
      <select
        onChange={this.versionChange.bind(this)}
        value={this.state.versions.chosen}
      >
        {options}
      </select>
    );
  }
  // sortMoves(a, b) {
  //   let sortA = a.name;
  //   let sortB = b.name;

  //   // Sort by level up if available
  //   if (a.level_learned_at && b.level_learned_at) {
  //     sortA = a.level_learned_at;
  //     sortB = b.level_learned_at;
  //   }

  //   // Return sort order
  //   if (sortA < sortB) return -1;
  //   if (sortA > sortB) return 1;
  //   return 0;
  // }
  getEncounters(chosenVer) {
    // Reorganize data as an array
    let encounters = [];
    if (this.props.data) {
      let dataKeys = Object.keys(this.props.data);
      // Loop through all available moves
      for (let i = 0; i < dataKeys.length; i++) {
        let dataKey = dataKeys[i];
        let item = this.props.data[dataKey];

        // Get game versions that this pokemon can be encountered in
        let versions = item.version_details;
        // Loop through game versions for move
        for (let x = 0; x < versions.length; x++) {
          let itemVersion = versions[x];
          // Check if chosen version can encounter pokemon at this location
          if (itemVersion.version.name === chosenVer) {
            encounters.push({
              encounter_details: itemVersion.encounter_details,
              name: item.location_area.name,
            });
            break;
          }
        }
      }
    }
    // Sort moves by level up or alphabetical
    // moves.sort(this.sortMoves);

    return encounters;
  }
  renderConditions(condition_values) {
    let render = [];

    for (let i = 0; i < condition_values.length; i++) {
      let condition = condition_values[i];
      let reactKey = condition.name;
      render.push(
        <div
          key={reactKey}
          className="component--pokemon-encounters__list__item__details__item__conditions__item"
        >
          Condition: {normalizeName(condition.name)}
        </div>
      );
    }

    return render;
  }
  removeDuplicateEncounterDetails(encounter_details) {
    encounter_details = encounter_details.filter(
      (obj, index, self) =>
        index ===
        self.findIndex(
          t =>
            t.min_level === obj.min_level &&
            t.max_level === obj.max_level &&
            t.method.name === obj.method.name
        )
    );
    return encounter_details;
  }
  renderEncounterDetails(encounter_details) {
    let render = [];
    encounter_details = this.removeDuplicateEncounterDetails(encounter_details);
    for (let i = 0; i < encounter_details.length; i++) {
      let detail = encounter_details[i];
      let reactKey =
        'encounter-detail-' + detail.max_level + detail.method.name;
      render.push(
        <div
          key={reactKey}
          className="component--pokemon-encounters__list__item__details__item"
        >
          <div className="component--pokemon-encounters__list__item__details__item__method">
            Method: {normalizeName(detail.method.name)}
          </div>
          <div className="component--pokemon-encounters__list__item__details__item__max-level">
            Max Level: {detail.max_level}
          </div>
          <div className="component--pokemon-encounters__list__item__details__item__chance">
            Chance: {detail.chance}
          </div>
          <div className="component--pokemon-encounters__list__item__details__item__conditions">
            {this.renderConditions(detail.condition_values)}
          </div>
        </div>
      );
    }
    return render;
  }
  renderEncounters() {
    let render = [];
    let encounters = this.getEncounters(this.state.versions.chosen);
    // Check if any encounters are available
    if (!encounters.length) {
      return (
        <div className="component--pokemon-encounters__na">
          No data is available for encountering this pokemon in the wild in
          {this.state.versions.chosen} version
        </div>
      );
    }
    for (let x = 0; x < encounters.length; x++) {
      let encounter = encounters[x];
      let reactKey = 'encounter-' + encounter.name;
      render.push(
        <div
          key={reactKey}
          className="component--pokemon-encounters__list__item"
        >
          <div className="component--pokemon-encounters__list__item__location">
            {normalizeName(encounter.name)}
          </div>
          <div className="component--pokemon-encounters__list__item__details">
            {this.renderEncounterDetails(encounter.encounter_details)}
          </div>
        </div>
      );
    }

    return render;
  }
  render() {
    return (
      <div className="component--pokemon-encounters">
        <div className="component--pokemon-encounters__versions">
          <div className="component--pokemon-encounters__versions__select select-wrapper">
            {this.getVersions()}
          </div>
          <h2>{normalizeName(this.state.versions.chosen)} Version</h2>
        </div>
        <div className="component--pokemon-encounters__list">
          {this.renderEncounters()}
        </div>
      </div>
    );
  }
}
// Specifies the default values for props:
PokemonEncounters.defaultProps = {
  data: {},
};
var path = '/assets/data/api/v2/pokemon/:id/encounters/index.json';
let WrappedComponent = withData(PokemonEncounters, path);

export default WrappedComponent;
