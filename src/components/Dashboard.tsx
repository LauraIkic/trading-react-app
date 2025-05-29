import React from 'react';
import {PortfolioInfo} from "./PortfolioInfo";
import {CoinList} from "./CoinInfo/CoinList";
import {WalletInfo} from "./WalletInfo";

export const Dashboard: React.FunctionComponent = () => {

    return (
        <div>
            <WalletInfo/>
            <PortfolioInfo/>
            <CoinList/>
        </div>
    );
};
