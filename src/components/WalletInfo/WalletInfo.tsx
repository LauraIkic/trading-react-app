import React from 'react';
import './WalletInfo.css';
import {TableWrapper, StyledHeading} from "../CoinInfo/CoinList.styles";
import {useQuery} from "@tanstack/react-query";
import {readCoinsQuery} from "../../queries/readCoins";
import {readWalletQuery} from "../../queries/readWallet";
import {useAuthStore} from "../../stores/useAuthenticationStore";
import {WalletBalanceCard} from "./WalletBalanceCard";
import {readPortfolioQuery} from "../../queries/readPortfolio";

export const walletRefreshEvent = new EventTarget();

export const WalletInfo: React.FunctionComponent = () => {
    const {data: walletData, isLoading, error} = useQuery(readWalletQuery);
    const {data: portfolio} = useQuery(readPortfolioQuery);

    const user = useAuthStore();
    console.log('wallet', walletData)
    console.log('portfolio', portfolio)
    return (
        // <div className="empty-state">
        //     <h3>Anmeldung erforderlich</h3>
        //     <p>Melde dich an, um dein Wallet zu sehen und Kryptowährungen zu handeln.</p>
        // </div>


        <TableWrapper>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem'}}>
                <StyledHeading>My Wallet</StyledHeading>
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

            <div className="wallet-content">
                <WalletBalanceCard balance={walletData?.balance!} />
            </div>
        </TableWrapper>
    );
};