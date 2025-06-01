import React from 'react';
import {useQuery} from "@tanstack/react-query/src";
import {readPortfolioQuery} from "../../queries/readPortfolio";
import {readWalletQuery} from "../../queries/readWallet";

export const PortfolioList: React.FunctionComponent = () => {
    // const { data: portfolio, isLoading, error } = useQuery(readPortfolioQuery);
    // console.log(portfolio)

    return (
        <div>
            <h1>Mein Portfolio</h1>
        </div>
    );
};
