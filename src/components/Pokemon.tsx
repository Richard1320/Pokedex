import React, {useEffect, useState} from 'react';
import {Routes, Route, useParams} from 'react-router-dom';
import axios from 'axios';

import PokemonOverview from './PokemonOverview';
import PokemonStats from './PokemonStats';
import PokemonMoves from './PokemonMoves';
import PokemonEvolution from './PokemonEvolution';
import PokemonEncounters from './PokemonEncounters';

const Pokemon: React.FC = () => {
    const {pokemonId} = useParams();
    const [pokemon, setPokemon] = useState<any>();
    const [pokemonSpecies, setPokemonSpecies] = useState<any>();

    useEffect(() => {
        if (pokemonId) {
            fetchData().then();
        }
    }, [pokemonId]);

    async function fetchData(): Promise<void> {
        const pathPokemon = `/assets/data/api/v2/pokemon/${pokemonId}/index.json`;
        const responsePokemon = await axios.get(pathPokemon);
        setPokemon(responsePokemon.data);

        const pokemonSpeciesID = parseInt(responsePokemon.data.species.url.replace('/api/v2/pokemon-species/', ''));
        const pathSpecies = `/assets/data/api/v2/pokemon-species/${pokemonSpeciesID}/index.json`;
        const responseSpecies = await axios.get(pathSpecies);
        setPokemonSpecies(responseSpecies.data);
    }

    if (!pokemon || !pokemonSpecies) {
        return null;
    }

    return (
        <div className="component--pokemon">
            <Routes>
                <Route
                    path="stats"
                    element={<PokemonStats pokemon={pokemon} pokemonSpecies={pokemonSpecies}/>}
                />
                <Route
                    path="moves"
                    element={<PokemonMoves pokemon={pokemon} pokemonSpecies={pokemonSpecies}/>}
                />
                <Route
                    path="evolution"
                    element={<PokemonEvolution pokemon={pokemon} pokemonSpecies={pokemonSpecies}/>}
                />
                <Route
                    path="encounters"
                    element={<PokemonEncounters pokemon={pokemon} pokemonSpecies={pokemonSpecies}/>}
                />
                <Route
                    path="*"
                    element={<PokemonOverview pokemon={pokemon} pokemonSpecies={pokemonSpecies}/>}
                />
            </Routes>
        </div>
    );
};

export default Pokemon;
