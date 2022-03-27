import React, {useEffect, useState} from 'react';
import {NavLink} from 'react-router-dom';
import {normalizeName} from '../Helpers';
import axios from "axios";

const PokedexSubnav: React.FC = () => {
	const [pokedexData, setPokedexData] = useState<any>();

	useEffect(() => {
		fetchData().then();
	}, []);

	async function fetchData(): Promise<void> {
		const pathPokedex = "/assets/data/api/v2/pokedex/index.json";
		const responsePokedex = await axios.get(pathPokedex);
		setPokedexData(responsePokedex.data);
	}

	function renderRows(): JSX.Element[] {
		if (!pokedexData) return [];

		//making the rows to display
		const rows: JSX.Element[] = [];
		const data = pokedexData.results;
		if (data) {
			data.forEach((element: any, index: number) => {
				let url = element.url;
				url = url.replace('api/v2/', '');

				rows.push(
					<div key={index} className="component--pokedex-subnav__item">
						<NavLink to={url}>{normalizeName(element.name)}</NavLink>
					</div>
				);
			});
		}
		return rows;
	}

	return <div className="component--pokedex-subnav">{renderRows()}</div>;

};
export default PokedexSubnav;
