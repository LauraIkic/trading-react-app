import React from 'react';
import './WalletInfo.css';
import {TableWrapper, StyledHeading} from "../CoinInfo/CoinList.styles";
import {useQuery} from "@tanstack/react-query";
import {readWalletQuery} from "../../queries/readWallet";
import {WalletBalanceCard} from "./WalletBalanceCard";


export const WalletInfo: React.FunctionComponent = () => {
    const {data: walletData, isLoading, error, refetch} = useQuery(readWalletQuery);

    return (
        <TableWrapper>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem'}}>
                <StyledHeading>My Wallet</StyledHeading>
            </div>

            {isLoading ? (
                <div className="status-state loading">
                    <h3>Loading Wallet...</h3>
                </div>
            ) : error ? (
                <div className="status-state error">
                    <h3>Something went wrong.</h3>
                </div>
            ) : (
                <div className="wallet-content">
                    <WalletBalanceCard balance={walletData?.balance!} refetchBalance={refetch} />
                </div>
            )}

        </TableWrapper>
    );
};