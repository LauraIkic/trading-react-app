import React from 'react';
import {CoinDto} from "../../api";
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
