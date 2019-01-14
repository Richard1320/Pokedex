import React, { Component } from 'react';
import { Radar } from 'react-chartjs-2';

class PokemonStats extends Component {
  render() {
    let labels = [];
    let stats = [];
    if (this.props.data.stats) {
      for (let i = 0; i < this.props.data.stats.length; i++) {
        labels.push(this.props.data.stats[i].stat.name);
        stats.push(this.props.data.stats[i].base_stat);
      }
    }
    let chartData = {
      labels: labels,
      datasets: [
        {
          label: 'Stat',
          data: stats,
        },
      ],
    };
    let options = {
      legend: {
        display: false,
      },
      scale: {
        ticks: {
          beginAtZero: true,
        },
      },
      layout: {
        padding: 20,
      },
    };

    return (
      <div className="component--pokemon-stats">
        <Radar data={chartData} options={options} height={250} />
      </div>
    );
  }
}
// Specifies the default values for props:
PokemonStats.defaultProps = {
  data: {},
};

export default PokemonStats;
