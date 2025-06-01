import React from 'react';
import {TableWrapper, StyledHeading} from "../CoinInfo/CoinList.styles";
import {useQuery} from "@tanstack/react-query";
import {readPortfolioQuery} from "../../queries/readPortfolio";

export const PortfolioInfo: React.FunctionComponent = () => {
    const {data: portfolio ,isLoading, error} = useQuery(readPortfolioQuery);

    console.log('portfolio', portfolio)
    return (
        // <div className="empty-state">
        //     <h3>Anmeldung erforderlich</h3>
        //     <p>Melde dich an, um dein Wallet zu sehen und Kryptowährungen zu handeln.</p>
        // </div>


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

            {!portfolio?.portfolioItems && (
                <div className="error-state">
                    <h3>Your portfolio is empty</h3>
                </div>
            )}

        </TableWrapper>
    );
};