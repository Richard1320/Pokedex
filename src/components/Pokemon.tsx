import React, {useEffect, useState} from 'react';
import {Routes, Route, useMatch} from 'react-router-dom';
import axios, {AxiosResponse} from 'axios';

import PokemonOverview from './PokemonOverview';
import PokemonStats from './PokemonStats';
import PokemonMoves from './PokemonMoves';
import PokemonEvolution from './PokemonEvolution';
import PokemonEncounters from './PokemonEncounters';

const Pokemon: React.FC = () => {
    const match = useMatch("pokemon/:id");
    const [pokemon, setPokemon] = useState({});
    const [pokemonSpecies, setPokemonSpecies] = useState({});

    useEffect(() => {
        if (match) {
            const nextPokemonID = match.params.id;
            const path = '/assets/data/api/v2/pokemon/' + nextPokemonID + '/index.json';
            axios.get(path).then(pokemonDataCallback);
        }
    }, [match?.params.id]);

    function pokemonDataCallback(response: AxiosResponse) {
        setPokemon(response.data);
        let pokemonSpeciesID = parseInt(
            response.data.species.url.replace('/api/v2/pokemon-species/', '')
        );
        let path = `/assets/data/api/v2/pokemon-species/${pokemonSpeciesID}/index.json`;
        axios.get(path).then((speciesResponse: AxiosResponse) => {
            setPokemonSpecies(speciesResponse.data);
        });
    }

    return (
        <div className="component--pokemon">
            <Routes>
                <Route
                    path="/pokemon/:id"
                    element={<PokemonOverview pokemon={pokemon} pokemonSpecies={pokemonSpecies}/>}
                />
                <Route
                    path="/pokemon/:id/stats"
                    element={<PokemonStats pokemon={pokemon} pokemonSpecies={pokemonSpecies}/>}
                />
                <Route
                    path="/pokemon/:id/moves"
                    element={<PokemonMoves pokemon={pokemon} pokemonSpecies={pokemonSpecies}/>}
                />
                <Route
                    path="/pokemon/:id/evolution"
                    element={<PokemonEvolution pokemon={pokemon} pokemonSpecies={pokemonSpecies}/>}
                />
                <Route
                    path="/pokemon/:id/encounters"
                    element={<PokemonEncounters pokemon={pokemon} pokemonSpecies={pokemonSpecies}/>}
                />
            </Routes>
        </div>
    );
};

export default Pokemon;
