import React from 'react';
import {PortfolioInfo} from "./PortfolioInfo/PortfolioInfo";
import {CoinList} from "./CoinInfo/CoinList";
import {WalletInfo} from "./WalletInfo/WalletInfo";

export const Dashboard: React.FunctionComponent = () => {

    return (
        <div>
            <WalletInfo/>
            <PortfolioInfo/>
            <CoinList/>
        </div>
    );
};
