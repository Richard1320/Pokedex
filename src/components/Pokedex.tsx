import React, {useState} from 'react';
import {useLocation, Routes, Route, NavLink} from 'react-router-dom';
import PokedexInstructions from './PokedexInstructions';
import PokedexSubnav from './PokedexSubnav';
import PokemonList from './PokemonList';
import PokemonSubnav from './PokemonSubnav';
import Pokemon from './Pokemon';
import ItemCategorySubnav from './ItemCategorySubnav';
import ItemList from './ItemList';
import Item from './Item';
import SearchInput from './SearchInput';
import SearchResults from './SearchResults';

const Pokedex: React.FC = () => {
    const location = useLocation();
    const [search, setSearch] = useState("");
    const wrapperClass = ['component--pokedex'];
    const routeArray = location.pathname.split('/').map((element: any) => {
        return isNaN(element) ? element : '';
    });
    wrapperClass.push('route-' + routeArray.join('-'));
    if (search) wrapperClass.push('has-search-results');

    return (
        <div className={wrapperClass.join(' ')}>
            <div className="component--pokedex__menu">
                <NavLink to="/pokedex">
                    <span className="btn--red"/>
                    Pokedex
                </NavLink>
                <NavLink to="/item-category">
                    <span className="btn--blue"/>
                    Items
                </NavLink>
                <NavLink to="/search">
                    <span className="btn--green"/>
                    Search
                </NavLink>
            </div>
            <div className="component--pokedex__panel-left">
                <Routes>
                    <Route path="/" element={<PokedexInstructions/>}/>
                    <Route path="/pokedex">
                        <Route path="" element={<PokedexSubnav/>}/>
                        <Route path=":pokedexId" element={<PokedexSubnav/>}/>
                    </Route>
                    <Route path="/pokemon/:pokemonId/*" element={<PokemonSubnav/>}/>
                    <Route path="/item">
                        <Route path="" element={<ItemCategorySubnav/>}/>
                        <Route path=":itemCategoryId" element={<ItemCategorySubnav/>}/>
                    </Route>
                    <Route path="/item-category">
                        <Route path="" element={<ItemCategorySubnav/>}/>
                        <Route path=":itemCategoryId" element={<ItemCategorySubnav/>}/>
                    </Route>
                </Routes>
            </div>
            <div className="component--pokedex__panel-right">
                <Routes>
                    <Route path="/pokedex/:pokedexId" element={<PokemonList/>}/>
                    <Route path="/pokemon/:pokemonId/*" element={<Pokemon/>}/>
                    <Route path="/item-category/:itemCategoryId" element={<ItemList/>}/>
                    <Route path="/item/:itemId" element={<Item/>}/>
                    <Route path="/search" element={<SearchResults searchText={search}/>}/>
                </Routes>
            </div>
            <div className="component--pokedex__input">
                <Routes>
                    <Route path="/search" element={<SearchInput searchText={search} searchSubmit={setSearch}/>}/>
                </Routes>
            </div>
        </div>
    );
};

export default Pokedex;
