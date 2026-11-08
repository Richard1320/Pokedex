import React, {useEffect, useState} from 'react';
import {NavLink, useParams} from 'react-router-dom';
import {normalizeName} from '../Helpers';
import {fetchJSON} from '../fetchJSON';
import {DATA_URL, SPRITES_URL} from '../cdn';

const Item: React.FC = () => {
    const {itemId} = useParams();
    const [data, setData] = useState<any>();

    useEffect(() => {
        fetchData().then();
    }, [itemId]);

    async function fetchData(): Promise<void> {
        if (itemId) {
            const path = `${DATA_URL}/api/v2/item/${itemId}/index.json`;
            const response = await fetchJSON(path);
            setData(response);
        }
    }

    if (!data || !data.name) return null;
    const name = data.name;
    const image = SPRITES_URL + '/items/' + name + '.png';
    const category = data.category;
    const categoryID = parseInt(category.url.replace('/api/v2/item-category/', ''));
    const categoryURL = '/item-category/' + categoryID;

    return (
        <div className="component--item">
            <h1 className="component--item__title">{normalizeName(name)}</h1>
            <div className="component--item__category">
                <NavLink to={categoryURL}>{normalizeName(category.name)}</NavLink>
            </div>
            <div className="component--item__image">
                <img src={image} alt={name} title={name}/>
            </div>
            <div className="component--item__effect">
                {data.effect_entries[0].effect}
            </div>
        </div>
    );

};

export default Item;
