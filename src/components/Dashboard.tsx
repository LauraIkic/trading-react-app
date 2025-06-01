import React from 'react';
import {CoinList} from "./CoinInfo/CoinList";
import {WalletInfo} from "./WalletInfo/WalletInfo";
import {PortfolioInfo} from "./PortfolioInfo/PortfolioInfo";

export const Dashboard: React.FunctionComponent = () => {

    return (
        <div>
            <WalletInfo/>
            <PortfolioInfo/>
            <CoinList/>
        </div>
    );
};
