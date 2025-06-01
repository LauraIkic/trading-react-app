import React from 'react';
import {TableWrapper, StyledHeading} from "../CoinInfo/CoinList.styles";
import {useQuery} from "@tanstack/react-query";
import {readPortfolioQuery} from "../../queries/readPortfolio";
import {Asset} from "../../api-client";

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
        <TableWrapper style={{background: '#8e8b9324'}}>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem'}}>
                <StyledHeading>My Portfolio</StyledHeading>
            </div>

            {isLoading ? (
                <div className="status-state loading">
                    <h3>Loading portfolio...</h3>
                </div>
            ) : error ? (
                <div className="status-state error">
                    <h3>Something went wrong.</h3>
                </div>
            ) : (
                <table className="crypt-style-table">
                    <thead>
                    <tr>
                        <th>Asset</th>
                        <th>Quantity</th>
                        <th>Value</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {assets.map((asset: Asset) => (
                        <tr key={asset.id}>
                            <td>
                                <div className="asset-cell">
                                    {/*<img className="coin-logo" src={coin.image} alt={coin.name} />*/}
                                    <div className="coin-details">
                                        <div className="coin-name">{asset.coinId}</div>
                                        {/*<div className="coin-symbol">{coin.symbol?.toUpperCase()}</div>*/}
                                    </div>
                                </div>
                            </td>
                            <td>{asset.quantity}</td>
                            <td>${asset.value}</td>
                            <td>
                                <button className="order-btn" onClick={() => {}}>
                                    SELL
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}

        </TableWrapper>
    );
};
