import React from 'react'
import { Article } from '../../../interfaces/Article';
import { ExChangeRate } from '../../../interfaces/ExchangeRate';
import New from '../new'

export interface Props {
    inventory: Article[];
    exchange_rate: ExChangeRate[];
}
function Edit({ inventory, exchange_rate }: Props) {
    return (<New inventory={inventory} exchange_rate={exchange_rate}></New>)
}

export default Edit

export const getServerSideProps = async () => {
    const resInventory = await fetch("http://localhost:3000/api/inventory");
    const inventory = await resInventory.json();
    const resExchange = await fetch(
        "http://localhost:3000/api/inventory/exchangeRate"
    );
    const exchange_rate = await resExchange.json();
    return {
        props: {
            inventory: inventory,
            exchange_rate: exchange_rate,
        },
    };
};