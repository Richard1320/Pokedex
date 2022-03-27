import React from 'react';
import {NavLink, useMatch} from 'react-router-dom';

const PokemonSubnav: React.FC = () => {
    const match = useMatch("pokedex/:id");
    const overviewURL = (match) ? '/pokemon/' + match.params.id : "";
    // const imagesURL = (match) ? '/pokemon/' + match.params.id + '/images' : ";
    const statsURL = (match) ? '/pokemon/' + match.params.id + '/stats' : "";
    const movesURL = (match) ? '/pokemon/' + match.params.id + '/moves' : "";
    const evolutionURL = (match) ? '/pokemon/' + match.params.id + '/evolution' : "";
    const encountersURL = (match) ? '/pokemon/' + match.params.id + '/encounters' : "";
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
