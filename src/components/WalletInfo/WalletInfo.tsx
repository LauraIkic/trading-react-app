import React from 'react';
import './WalletInfo.css';
import {TableWrapper, StyledHeading} from "../CoinInfo/CoinList.styles";
import {useQuery} from "@tanstack/react-query";
import {readCoinsQuery} from "../../queries/readCoins";
import {readWalletQuery} from "../../queries/readWallet";
import {useAuthStore} from "../../stores/useAuthenticationStore";
import {WalletBalanceCard} from "./WalletBalanceCard";

export const walletRefreshEvent = new EventTarget();

export const WalletInfo: React.FunctionComponent = () => {
    const {data: walletData, isLoading, error} = useQuery(readWalletQuery);
    const user = useAuthStore();
    console.log('wallet', walletData)
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


{/*/!* Holdings Section *!/*/}
{/*<div className="wallet-section">*/}
{/*    <h3 className="section-title">Meine Coins</h3>*/}
{/*    /!*{walletData.holdings && walletData.holdings.length > 0 ? (*!/*/}
{/*    /!*    <table className="crypt-style-table">*!/*/}
{/*    /!*        <thead>*!/*/}
{/*    /!*            <tr>*!/*/}
{/*    /!*                <th>Asset</th>*!/*/}
{/*    /!*                <th>Menge</th>*!/*/}
{/*    /!*                <th>Wert</th>*!/*/}
{/*    /!*                <th>Gewinn/Verlust</th>*!/*/}
{/*    /!*            </tr>*!/*/}
{/*    /!*        </thead>*!/*/}
{/*    /!*        <tbody>*!/*/}
{/*    /!*            {walletData.holdings && walletData.holdings.map((holding: Holding, index: number) => (*!/*/}
{/*    /!*                <tr key={index}>*!/*/}
{/*    /!*                    <td>*!/*/}
{/*    /!*                        <div className="asset-cell">*!/*/}
{/*    /!*                            <div className="coin-placeholder">*!/*/}
{/*    /!*                                {holding.coinSymbol.charAt(0)}*!/*/}
{/*    /!*                            </div>*!/*/}
{/*    /!*                            <div className="coin-details">*!/*/}
{/*    /!*                                <div className="coin-name">{holding.coinName}</div>*!/*/}
{/*    /!*                                <div className="coin-symbol">{holding.coinSymbol}</div>*!/*/}
{/*    /!*                            </div>*!/*/}
{/*    /!*                        </div>*!/*/}
{/*    /!*                    </td>*!/*/}
{/*    /!*                    <td>{holding.amount.toFixed(6)} {holding.coinSymbol}</td>*!/*/}
{/*    /!*                    <td>${holding.value.toLocaleString()}</td>*!/*/}
{/*    /!*                    <td className={`profit ${holding.profit >= 0 ? 'positive' : 'negative'}`}>*!/*/}
{/*    /!*                        {holding.profit >= 0 ? '+' : ''}${holding.profit.toFixed(2)} ({holding.profitPercent >= 0 ? '+' : ''}{holding.profitPercent.toFixed(2)}%)*!/*/}
{/*    /!*                    </td>*!/*/}
{/*    /!*                </tr>*!/*/}
{/*    /!*            ))}*!/*/}
{/*    /!*        </tbody>*!/*/}
{/*    /!*    </table>*!/*/}
{/*    /!*) : (*!/*/}
{/*    /!*    <div className="empty-placeholder">*!/*/}
{/*    /!*        <p>Noch keine Coins im Portfolio. Kaufe deine ersten Kryptowährungen!</p>*!/*/}
{/*    /!*    </div>*!/*/}
{/*    /!*)}*!/*/}
{/*</div>*/}

{/*/!* Recent Transactions Section *!/*/}
{/*<div className="wallet-section">*/}
{/*    <h3 className="section-title">Letzte Transaktionen</h3>*/}
{/*    /!*<div className="transactions-container">*!/*/}
{/*    /!*    {walletData.transactions && walletData.transactions.length > 0 ? (*!/*/}
{/*    /!*        walletData.transactions.map((transaction: Transaction, index: number) => (*!/*/}
{/*    /!*            <div key={index} className="transaction-item">*!/*/}
{/*    /!*                <div className="transaction-info">*!/*/}
{/*    /!*                    <div className={`transaction-type ${transaction.type}`}>*!/*/}
{/*    /!*                        {transaction.type === 'buy' ? 'Kauf' : 'Verkauf'}*!/*/}
{/*    /!*                    </div>*!/*/}
{/*    /!*                    <div className="transaction-details">*!/*/}
{/*    /!*                        <span className="transaction-coin">*!/*/}
{/*    /!*                            {transaction.coinName} ({transaction.coinSymbol})*!/*/}
{/*    /!*                        </span>*!/*/}
{/*    /!*                        <span className="transaction-date">{transaction.date}</span>*!/*/}
{/*    /!*                        {transaction.orderId && (*!/*/}
{/*    /!*                            <span className="transaction-order-id">Order: {transaction.orderId.slice(-6)}</span>*!/*/}
{/*    /!*                        )}*!/*/}
{/*    /!*                    </div>*!/*/}
{/*    /!*                </div>*!/*/}
{/*    /!*                <div className="transaction-amount">*!/*/}
{/*    /!*                    {transaction.type === 'buy' ? '+' : '-'}{transaction.amount} {transaction.coinSymbol}*!/*/}
{/*    /!*                </div>*!/*/}
{/*    /!*            </div>*!/*/}
{/*    /!*        ))*!/*/}
{/*    /!*    ) : (*!/*/}
{/*    /!*        <div className="empty-placeholder">*!/*/}
{/*    /!*            <p>Noch keine Transaktionen vorhanden.</p>*!/*/}
{/*    /!*        </div>*!/*/}
{/*    /!*    )}*!/*/}
{/*    /!*</div>*!/*/}
{/*</div>*/}