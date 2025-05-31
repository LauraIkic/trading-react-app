import React from 'react';
import './WalletInfo.css';
import { TableWrapper, StyledHeading } from "../CoinInfo/CoinList.styles";

export const walletRefreshEvent = new EventTarget();

export const WalletInfo: React.FunctionComponent = () => {


    return (
        <TableWrapper>
            {/* Header Section */}

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <StyledHeading>Mein Wallet</StyledHeading>
                {/*{user.isAuthenticated && (*/}
                    <div className="user-status">
                        <span className="welcome-text">Laura</span>
                        <button onClick={()=>{}} className="refresh-btn" >
                            Lädt
                        </button>
                    </div>
                {/*)}*/}
            </div>

            {/*<div className="wallet-content">*/}

            {/*    <div className="empty-state">*/}
            {/*        <h3>Anmeldung erforderlich</h3>*/}
            {/*        <p>Melde dich an, um dein Wallet zu sehen und Kryptowährungen zu handeln.</p>*/}
            {/*    </div>*/}

            {/*    <div className="loading-state">*/}
            {/*        <p>Initialisierung...</p>*/}
            {/*    </div>*/}

            {/*        <div className="error-state">*/}
            {/*            <h3>Fehler beim Laden</h3>*/}
            {/*            <p>error</p>*/}
            {/*            <button onClick={() => {}} className="retry-btn">*/}
            {/*                Erneut versuchen*/}
            {/*            </button>*/}
            {/*        </div>*/}

            {/*        <div className="loading-state">*/}
            {/*            <p>Lade Wallet-Daten...</p>*/}
            {/*        </div>*/}

            {/*        <>*/}
            {/*            /!* Balance Section *!/*/}
            {/*            <div className="wallet-section">*/}
            {/*                <h3 className="section-title">Guthaben</h3>*/}
            {/*                <div className="balance-container">*/}
            {/*                    <div className="balance-card">*/}
            {/*                        <div className="balance-label">Verfügbares Guthaben</div>*/}
            {/*                        <div className="balance-amount">'0.00'</div>*/}
            {/*                    </div>*/}
            {/*                    <div className="balance-card">*/}
            {/*                        <div className="balance-label">Investiert</div>*/}
            {/*                        <div className="balance-amount invested">0</div>*/}
            {/*                    </div>*/}
            {/*                    <div className="balance-card">*/}
            {/*                        <div className="balance-label">Gesamtwert</div>*/}
            {/*                        <div className="balance-amount total">0</div>*/}
            {/*                    </div>*/}
            {/*                </div>*/}
            {/*            </div>*/}

            {/*            /!* Holdings Section *!/*/}
            {/*            <div className="wallet-section">*/}
            {/*                <h3 className="section-title">Meine Coins</h3>*/}
            {/*                /!*{walletData.holdings && walletData.holdings.length > 0 ? (*!/*/}
            {/*                /!*    <table className="crypt-style-table">*!/*/}
            {/*                /!*        <thead>*!/*/}
            {/*                /!*            <tr>*!/*/}
            {/*                /!*                <th>Asset</th>*!/*/}
            {/*                /!*                <th>Menge</th>*!/*/}
            {/*                /!*                <th>Wert</th>*!/*/}
            {/*                /!*                <th>Gewinn/Verlust</th>*!/*/}
            {/*                /!*            </tr>*!/*/}
            {/*                /!*        </thead>*!/*/}
            {/*                /!*        <tbody>*!/*/}
            {/*                /!*            {walletData.holdings && walletData.holdings.map((holding: Holding, index: number) => (*!/*/}
            {/*                /!*                <tr key={index}>*!/*/}
            {/*                /!*                    <td>*!/*/}
            {/*                /!*                        <div className="asset-cell">*!/*/}
            {/*                /!*                            <div className="coin-placeholder">*!/*/}
            {/*                /!*                                {holding.coinSymbol.charAt(0)}*!/*/}
            {/*                /!*                            </div>*!/*/}
            {/*                /!*                            <div className="coin-details">*!/*/}
            {/*                /!*                                <div className="coin-name">{holding.coinName}</div>*!/*/}
            {/*                /!*                                <div className="coin-symbol">{holding.coinSymbol}</div>*!/*/}
            {/*                /!*                            </div>*!/*/}
            {/*                /!*                        </div>*!/*/}
            {/*                /!*                    </td>*!/*/}
            {/*                /!*                    <td>{holding.amount.toFixed(6)} {holding.coinSymbol}</td>*!/*/}
            {/*                /!*                    <td>${holding.value.toLocaleString()}</td>*!/*/}
            {/*                /!*                    <td className={`profit ${holding.profit >= 0 ? 'positive' : 'negative'}`}>*!/*/}
            {/*                /!*                        {holding.profit >= 0 ? '+' : ''}${holding.profit.toFixed(2)} ({holding.profitPercent >= 0 ? '+' : ''}{holding.profitPercent.toFixed(2)}%)*!/*/}
            {/*                /!*                    </td>*!/*/}
            {/*                /!*                </tr>*!/*/}
            {/*                /!*            ))}*!/*/}
            {/*                /!*        </tbody>*!/*/}
            {/*                /!*    </table>*!/*/}
            {/*                /!*) : (*!/*/}
            {/*                /!*    <div className="empty-placeholder">*!/*/}
            {/*                /!*        <p>Noch keine Coins im Portfolio. Kaufe deine ersten Kryptowährungen!</p>*!/*/}
            {/*                /!*    </div>*!/*/}
            {/*                /!*)}*!/*/}
            {/*            </div>*/}

            {/*            /!* Recent Transactions Section *!/*/}
            {/*            <div className="wallet-section">*/}
            {/*                <h3 className="section-title">Letzte Transaktionen</h3>*/}
            {/*                /!*<div className="transactions-container">*!/*/}
            {/*                /!*    {walletData.transactions && walletData.transactions.length > 0 ? (*!/*/}
            {/*                /!*        walletData.transactions.map((transaction: Transaction, index: number) => (*!/*/}
            {/*                /!*            <div key={index} className="transaction-item">*!/*/}
            {/*                /!*                <div className="transaction-info">*!/*/}
            {/*                /!*                    <div className={`transaction-type ${transaction.type}`}>*!/*/}
            {/*                /!*                        {transaction.type === 'buy' ? 'Kauf' : 'Verkauf'}*!/*/}
            {/*                /!*                    </div>*!/*/}
            {/*                /!*                    <div className="transaction-details">*!/*/}
            {/*                /!*                        <span className="transaction-coin">*!/*/}
            {/*                /!*                            {transaction.coinName} ({transaction.coinSymbol})*!/*/}
            {/*                /!*                        </span>*!/*/}
            {/*                /!*                        <span className="transaction-date">{transaction.date}</span>*!/*/}
            {/*                /!*                        {transaction.orderId && (*!/*/}
            {/*                /!*                            <span className="transaction-order-id">Order: {transaction.orderId.slice(-6)}</span>*!/*/}
            {/*                /!*                        )}*!/*/}
            {/*                /!*                    </div>*!/*/}
            {/*                /!*                </div>*!/*/}
            {/*                /!*                <div className="transaction-amount">*!/*/}
            {/*                /!*                    {transaction.type === 'buy' ? '+' : '-'}{transaction.amount} {transaction.coinSymbol}*!/*/}
            {/*                /!*                </div>*!/*/}
            {/*                /!*            </div>*!/*/}
            {/*                /!*        ))*!/*/}
            {/*                /!*    ) : (*!/*/}
            {/*                /!*        <div className="empty-placeholder">*!/*/}
            {/*                /!*            <p>Noch keine Transaktionen vorhanden.</p>*!/*/}
            {/*                /!*        </div>*!/*/}
            {/*                /!*    )}*!/*/}
            {/*                /!*</div>*!/*/}
            {/*            </div>*/}
            {/*        </>*/}

            {/*        <div className="empty-state">*/}
            {/*            <h3>Keine Daten verfügbar</h3>*/}
            {/*            <p>Wallet-Daten konnten nicht geladen werden.</p>*/}
            {/*            <button  className="retry-btn">*/}
            {/*                Erneut laden*/}
            {/*            </button>*/}
            {/*        </div>*/}

            {/*</div>*/}
        </TableWrapper>
    );
};
