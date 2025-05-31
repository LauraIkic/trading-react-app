import React from 'react';
import { CoinDto } from "../../api-client";

interface Props {
    coin: CoinDto;
}

export const CoinInfo: React.FunctionComponent<Props> = ({ coin }) => {
    return (
        <div>
            <h2>{coin.name}</h2>
            <p>Symbol: {coin.symbol}</p>
            <p>Price: ${coin.currentPrice}</p>
            <p>Market Cap: ${coin.marketCap?.toLocaleString()}</p>
            {coin.image && <img src={coin.image} alt={coin.name} />}
        </div>
    );
};
