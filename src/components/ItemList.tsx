import React, {useEffect, useState} from 'react';
import {NavLink, useParams} from 'react-router-dom';
import {normalizeName} from '../Helpers';
import axios from "axios";

const ItemList: React.FC = () => {
    const {itemCategoryId} = useParams();
    const [data, setData] = useState<any>();

    useEffect(() => {
        fetchData().then();
    }, [itemCategoryId]);

    async function fetchData(): Promise<void> {
        if (itemCategoryId) {
            const path = `/assets/data/api/v2/item-category/${itemCategoryId}/index.json`;
            const response = await axios.get(path);
            setData(response.data);
        }
    }

    function renderRows(): JSX.Element[] {
        if (!data || !data.items) return [];

        //making the rows to display
        return data.items.map((item: any) => {
            let image = '/assets/images/sprites/items/' + item.name + '.png';
            let itemID = parseInt(item.url.replace('/api/v2/item/', ''));
            let url = '/item/' + itemID;
            let name = normalizeName(item.name);
            return (
                <div key={item.name} className="component--item-list__table__row">
                    <div className="component--item-list__table__row__image">
                        <img src={image} alt={name} title={name}/>
                    </div>
                    <div className="component--item-list__table__row__link">
                        <NavLink to={url}>{name}</NavLink>
                    </div>
                </div>
            );
        });
    }

    return (
        <div className="component--item-list">
            <div className="component--item-list__table">{renderRows()}</div>
        </div>
    );

};

export default ItemList;
