import React from 'react';
import {BrowserRouter} from 'react-router-dom';

import Pokedex from './components/Pokedex';
import Credit from './components/Credit';
import './scss/app.scss';

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <div className="component--app">
                <Pokedex/>
                <Credit/>
            </div>
        </BrowserRouter>
    );
};

export default App;
