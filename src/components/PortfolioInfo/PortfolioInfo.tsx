import React from 'react';
import {TableWrapper, StyledHeading} from "../CoinInfo/CoinList.styles";
import {useQuery} from "@tanstack/react-query";
import {readPortfolioQuery} from "../../queries/readPortfolio";
import {PortfolioAsset} from "./PortfolioAsset";

export const PortfolioInfo: React.FunctionComponent = () => {
    const {data: portfolio ,isLoading, error} = useQuery(readPortfolioQuery);
    const assets = [
        {
            id: '23413',
            coinId: 'Bitcoin',
            quantity: 23,
            value: 3420000000
        },
        {
            id: '23413',
            coinId: 'ABC_coin',
            quantity: 23,
            value: 3420000000
        },
        {
            id: '23413',
            coinId: 'XYZ_coin',
            quantity: 23,
            value: 3420000000
        },
    ];

    return (
        <TableWrapper>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem'}}>
                <StyledHeading>My Portfolio</StyledHeading>
            </div>

            {isLoading && (
                <div className="error-state">
                    <h3>Loading</h3>
                </div>
            )}

            {error && (
            <div className="error-state">
                <h3>Error while loading wallet data</h3>
            </div>
            )}

            {!portfolio?.assets && (
                <div className="error-state">
                    <h3>Your portfolio is empty</h3>
                </div>
            )}

            <thead>
            <tr>
                <th>Coin</th>
                <th>Quantity</th>
                {/*<th>Current Value</th>*/}
            </tr>
            </thead>
            <tbody>
            {assets.map((asset) => (
                <PortfolioAsset key={asset.id} asset={asset} />
            ))}
            </tbody>

        </TableWrapper>
    );
};
