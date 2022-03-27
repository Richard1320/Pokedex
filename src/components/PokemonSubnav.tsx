import React from 'react';
import {NavLink, useParams} from 'react-router-dom';

const PokemonSubnav: React.FC = () => {
    const {pokemonId} = useParams();
    const overviewURL = (pokemonId) ? `/pokemon/${pokemonId}` : "";
    // const imagesURL = (pokemonId) ? `/pokemon/${pokemonId}/images` : ";
    const statsURL = (pokemonId) ? `/pokemon/${pokemonId}/stats` : "";
    const movesURL = (pokemonId) ? `/pokemon/${pokemonId}/moves` : "";
    const evolutionURL = (pokemonId) ? `/pokemon/${pokemonId}/evolution` : "";
    const encountersURL = (pokemonId) ? `/pokemon/${pokemonId}/encounters` : "";
    return (
        <div className="component--pokemon-subnav">
            <div className="component--pokemon-subnav__item">
                <NavLink to={overviewURL}>
                    Overview
                </NavLink>
            </div>
            {/*<div className="component--pokemon-subnav__item">*/}
            {/*    <NavLink to={imagesURL}>Images</NavLink>*/}
            {/*</div> */}
            <div className="component--pokemon-subnav__item">
                <NavLink to={statsURL}>Stats</NavLink>
            </div>
            <div className="component--pokemon-subnav__item">
                <NavLink to={movesURL}>Moves</NavLink>
            </div>
            <div className="component--pokemon-subnav__item">
                <NavLink to={evolutionURL}>Evolution</NavLink>
            </div>
            <div className="component--pokemon-subnav__item">
                <NavLink to={encountersURL}>Encounters</NavLink>
            </div>
        </div>
    );
};

export default PokemonSubnav;
