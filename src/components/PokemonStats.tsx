import React from 'react';
import {
	Chart as ChartJS,
	RadialLinearScale,
	PointElement,
	LineElement,
	Filler,
	Tooltip,
	ChartData, ChartOptions,
} from 'chart.js';
import {Radar} from 'react-chartjs-2';

ChartJS.register(
	RadialLinearScale,
	PointElement,
	LineElement,
	Filler,
	Tooltip,
);

interface IProps {
	pokemon: any;
	pokemonSpecies: any;
}

const PokemonStats: React.FC<IProps> = (props) => {
	const labels: string[] = [];
	const stats: number[] = [];
	if (props.pokemon.stats) {
		props.pokemon.stats.forEach((stat: any) => {
			labels.push(stat.stat.name);
			stats.push(stat.base_stat);
		});
	}
	const data: ChartData<"radar", number[], string> = {
		labels: labels,
		datasets: [
			{
				// label: props.pokemon.name,
				data: stats,
				backgroundColor: 'rgba(99,120,255,0.2)',
				borderColor: 'rgb(99,120,255)',
				borderWidth: 1,
			},
		],
	};
	const options: ChartOptions<"radar"> = {
		scales: {
			r: {
				suggestedMin: 0,
			}
		}
	};


	return (
		<div className="component--pokemon-stats">
			<Radar data={data} options={options}/>
		</div>
	);

};

export default PokemonStats;
