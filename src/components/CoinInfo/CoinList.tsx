import React from 'react';
import {CoinDto} from "../../api";
import {useQuery} from "@tanstack/react-query";
import {readCoinsQuery} from "../../queries/readCoins";

export const CoinList: React.FunctionComponent = () => {

    const { data, isLoading, error } = useQuery(readCoinsQuery);

    if (isLoading) return <p>Loading...</p>;
    if (error instanceof Error) return <p>Error: {error.message}</p>;

    return (
        <div>
            <h1>Coin List</h1>
            <ul>
                {data?.map((coin: CoinDto) => (
                    <li key={coin.id}>
                        <strong>{coin.name}</strong>
                    </li>
                ))}
            </ul>
        </div>
    );
};
