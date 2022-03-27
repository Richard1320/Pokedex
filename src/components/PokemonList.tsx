import React, {useEffect, useState} from 'react';
import {NavLink, useParams} from 'react-router-dom';
import Pagination from './Pagination';
import {normalizeName} from '../Helpers';
import axios from "axios";

const PokemonList: React.FC = () => {
    const {pokedexId} = useParams();
    const [pager, setPager] = useState({page: 1, itemsPerPage: 20});
    const [data, setData] = useState<any>();

    useEffect(() => {
        // Reset pager to 1
        setPager({...pager, page: 1});
        fetchData().then();
    }, [pokedexId]);

    async function fetchData(): Promise<void> {
        if (pokedexId) {
            const path = `/assets/data/api/v2/pokedex/${pokedexId}/index.json`;
            const response = await axios.get(path);
            setData(response.data);
        }
    }

    function renderRows(): JSX.Element[] {
        if (!data || !data.pokemon_entries) return [];

        //making the rows to display
        const pokemonEntries = data.pokemon_entries;
        const count = pokemonEntries.length;
        const start = (pager.page - 1) * pager.itemsPerPage;
        let end = start + pager.itemsPerPage;
        if (end > count) {
            end = count;
        }

        return pokemonEntries.slice(start, end).map((item: any) => {
            let itemID = parseInt(
                item.pokemon_species.url.replace('/api/v2/pokemon-species/', '')
            );
            let image = '/assets/images/sprites/pokemon/' + itemID + '.png';
            let url = '/pokemon/' + itemID;
            let name = normalizeName(item.pokemon_species.name);
            return (
                <div
                    key={item.entry_number}
                    className="component--pokemon-list__table__row"
                >
                    <div className="component--pokemon-list__table__row__number">
                        #{item.entry_number}
                    </div>
                    <div className="component--pokemon-list__table__row__image">
                        <img src={image} alt={name} title={name}/>
                    </div>
                    <div className="component--pokemon-list__table__row__link">
                        <NavLink to={url}>{name}</NavLink>
                    </div>
                </div>
            );
        });

    }

    return (
        <div className="component--pokemon-list">
            <div className="component--pokemon-list__table">
                {renderRows()}
            </div>
            <Pagination
                count={data?.hasOwnProperty('pokemon_entries') ? data.pokemon_entries.length : 0}
                pager={pager}
                pagerSubmit={setPager}
            />
        </div>
    );

};

export default PokemonList;
