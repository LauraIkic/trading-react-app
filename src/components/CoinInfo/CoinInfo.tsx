import React from 'react';
import {CoinDto} from "../../api";
import {useQuery} from "@tanstack/react-query";
import {readCoinsQuery} from "../../queries/readCoins";
interface Props {
    coin: CoinDto;
}
export const CoinInfo: React.FunctionComponent<Props> = ({coin}) => {

    return (
        <div>
            <h1>Coin Info</h1>
            {coin.id}
        </div>
    );
};
