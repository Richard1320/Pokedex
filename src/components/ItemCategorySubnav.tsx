import React, {useEffect, useState} from 'react';
import {NavLink} from 'react-router-dom';
import {normalizeName} from '../Helpers';
import axios from "axios";

const ItemCategorySubnav: React.FC = () => {
    const [itemCategoryData, setItemCategoryData] = useState<any>();

    useEffect(() => {
        fetchData().then();
    }, []);

    async function fetchData(): Promise<void> {
        const pathItemCategory = "/assets/data/api/v2/item-category/index.json";
        const responseItemCategory = await axios.get(pathItemCategory);
        setItemCategoryData(responseItemCategory.data);
    }

    function renderRows(): JSX.Element[] {
        if (!itemCategoryData || !itemCategoryData.results) return [];

        //making the rows to display
        return itemCategoryData.results.map((element: any) => {
            let url = element.url;
            url = url.replace('api/v2/', '');

            return (
                <div
                    key={element.name}
                    className="component--item-category-subnav__item"
                >
                    <NavLink to={url}>{normalizeName(element.name)}</NavLink>
                </div>
            );
        });

    }

    return (
        <div className="component--item-category-subnav">{renderRows()}</div>
    );
};

export default ItemCategorySubnav;
