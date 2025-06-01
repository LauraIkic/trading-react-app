import React from 'react';
import {CoinList} from "./CoinInfo/CoinList";
import {WalletInfo} from "./WalletInfo/WalletInfo";
import {PortfolioInfo} from "./PortfolioInfo/PortfolioInfo";
import {OrderInfo} from "./OrderInfo/OrderInfo";

export const Dashboard: React.FunctionComponent = () => {

    return (
        <div>
            <WalletInfo/>
            <OrderInfo/>
            <PortfolioInfo/>
            <CoinList/>
        </div>
    );
};
