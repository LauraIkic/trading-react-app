import React, { useState, useEffect } from 'react';
import './WalletInfo.css';
import { TableWrapper, StyledHeading } from "../CoinInfo/CoinList.styles";
import { useAuth } from '../../context/AuthContext';

// Definiere die Typen für ein einzelnes Holding und eine einzelne Transaktion
interface Holding {
    coinName: string;
    coinSymbol: string;
    amount: number;
    value: number;
    profit: number;
    profitPercent: number;
}

interface Transaction {
    type: 'buy' | 'sell';
    coinName: string;
    coinSymbol: string;
    amount: number;
    date: string;
    orderId?: string; // Optional, falls nicht immer vorhanden
}

interface WalletData {
    balance: number;
    availableBalance: number;
    investedAmount: number;
    totalValue: number;
    holdings?: Holding[]; // Verwende den definierten Holding-Typ
    transactions?: Transaction[]; // Verwende den definierten Transaction-Typ
}

// Einfaches Event System
export const walletRefreshEvent = new EventTarget();

export const WalletInfo: React.FunctionComponent = () => {
    const { user, isLoggedIn, getAuthHeaders, loading: authLoading } = useAuth();
    // Stelle sicher, dass walletData den WalletData-Typ verwendet
    const [walletData, setWalletData] = useState<WalletData | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Fetch wallet data when user is logged in
    useEffect(() => {
        if (isLoggedIn && !authLoading) {
            fetchWalletData();
        }
    }, [isLoggedIn, authLoading]);

    // Listen auf Refresh Events
    useEffect(() => {
        const handleRefresh = () => {
            console.log('Wallet refresh requested');
            if (isLoggedIn) {
                fetchWalletData();
            }
        };

        walletRefreshEvent.addEventListener('refresh', handleRefresh);
        
        return () => {
            walletRefreshEvent.removeEventListener('refresh', handleRefresh);
        };
    }, [isLoggedIn]);

    const fetchWalletData = async () => {
        try {
            setLoading(true);
            setError(null);
            
            console.log('Lade Wallet-Daten für Benutzer:', user?.userName);
            
            // 1. WALLET-DATEN LADEN
            const walletResponse = await fetch('http://localhost:5456/api/wallet', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    ...getAuthHeaders()
                }
            });

            if (!walletResponse.ok) {
                if (walletResponse.status === 401) {
                    throw new Error('Nicht autorisiert - bitte erneut anmelden');
                }
                throw new Error(`Fehler beim Laden der Wallet-Daten: ${walletResponse.status}`);
            }

            const wallet = await walletResponse.json();
            console.log('Wallet-Daten erhalten:', wallet);
            
            // 2. PORTFOLIO ITEMS LADEN - HINZUGEFÜGT!
            try {
                const portfolioResponse = await fetch('http://localhost:5456/api/portfolio/items', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        ...getAuthHeaders()
                    }
                });

                if (portfolioResponse.ok) {
                    const portfolioItems = await portfolioResponse.json();
                    console.log('Portfolio Items erhalten:', portfolioItems);
                    
                    // Portfolio Items in wallet-kompatibles Format konvertieren
                    const holdings = portfolioItems.map((item: any) => ({
                        coinName: item.coinName || item.coinId || 'Unknown',
                        coinSymbol: item.coinSymbol || item.coinId?.toUpperCase() || 'UNKNOWN',
                        amount: item.quantity || 0,
                        value: (item.quantity || 0) * (item.currentPrice || 0),
                        investedValue: (item.quantity || 0) * (item.averagePrice || 0),
                        profit: ((item.currentPrice || 0) - (item.averagePrice || 0)) * (item.quantity || 0),
                        profitPercent: item.averagePrice ? (((item.currentPrice || 0) - item.averagePrice) / item.averagePrice) * 100 : 0
                    }));
                    
                    // DANN: Berechne Gesamt-Investition
                    const totalInvested = holdings.reduce((sum: number, holding: any) => sum + holding.investedValue, 0);

                    // Füge es zur Wallet hinzu
                    wallet.totalInvested = totalInvested;
                    wallet.holdings = holdings;
                } else {
                    console.warn('Portfolio Items konnten nicht geladen werden');
                }
            } catch (portfolioError) {
                console.error('Fehler beim Laden der Portfolio Items:', portfolioError);
            }

            // 3. ORDERS/TRANSAKTIONEN LADEN (Optional)
            try {
                const ordersResponse = await fetch('http://localhost:5456/api/orders', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        ...getAuthHeaders()
                    }
                });

                if (ordersResponse.ok) {
                    const orders = await ordersResponse.json();
                    console.log('Orders erhalten:', orders);
                    
                    // Orders in Transaktions-Format konvertieren
                    const transactions = orders.map((order: any) => ({
                        type: order.type.toLowerCase(), // 'BUY' -> 'buy'
                        coinName: order.coinId, // Falls coinName nicht direkt verfügbar
                        coinSymbol: order.coinId.toUpperCase().substring(0, 3), // Vereinfacht
                        amount: order.quantity,
                        date: new Date().toLocaleString('de-DE'), // Oder order.createdAt falls verfügbar
                        orderId: order.id
                    }));
                    
                    // Wallet-Daten mit echten Transaktionen erweitern
                    wallet.transactions = transactions;
                }
            } catch (ordersError) {
                console.error('Fehler beim Laden der Orders:', ordersError);
            }
            
            setWalletData(wallet);
            
        } catch (err: any) {
            console.error('Wallet-Fehler:', err);
            setError(err.message);
            
            // Fallback zu Mock-Daten für Demo
            if (err.message.includes('Fehler beim Laden')) {
                console.log('Verwende Mock-Daten für Demo');
                setWalletData({
                    balance: 5000,
                    availableBalance: 1250,
                    investedAmount: 3750,
                    totalValue: 5000,
                    holdings: [
                        {
                            coinName: 'Bitcoin',
                            coinSymbol: 'BTC',
                            amount: 0.025,
                            value: 1250,
                            profit: 150,
                            profitPercent: 13.6
                        },
                        {
                            coinName: 'Ethereum',
                            coinSymbol: 'ETH',
                            amount: 1.5,
                            value: 2500,
                            profit: -75,
                            profitPercent: -2.9
                        }
                    ],
                    transactions: [
                        {
                            type: 'buy',
                            coinName: 'Bitcoin',
                            coinSymbol: 'BTC',
                            amount: 0.005,
                            date: new Date().toLocaleString('de-DE'),
                            orderId: 'demo-order-123'
                        },
                        {
                            type: 'sell',
                            coinName: 'Ethereum',
                            coinSymbol: 'ETH',
                            amount: 0.1,
                            date: new Date(Date.now() - 86400000).toLocaleString('de-DE'),
                            orderId: 'demo-order-122'
                        }
                    ]
                });
                setError(null);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <TableWrapper>
            {/* Header Section */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <StyledHeading>Mein Wallet</StyledHeading>
                {isLoggedIn && user && (
                    <div className="user-status">
                        <span className="welcome-text">{user.userName}</span>
                        <button onClick={fetchWalletData} className="refresh-btn" disabled={loading}>
                            {loading ? 'Lädt...' : 'Aktualisieren'}
                        </button>
                    </div>
                )}
            </div>

            {/* Wallet Content Area */}
            <div className="wallet-content">
                {!isLoggedIn ? (
                    // Not logged in state
                    <div className="empty-state">
                        <h3>Anmeldung erforderlich</h3>
                        <p>Melde dich an, um dein Wallet zu sehen und Kryptowährungen zu handeln.</p>
                    </div>
                ) : authLoading ? (
                    // Auth loading
                    <div className="loading-state">
                        <p>Initialisierung...</p>
                    </div>
                ) : error && !walletData ? (
                    // Error state
                    <div className="error-state">
                        <h3>Fehler beim Laden</h3>
                        <p>{error}</p>
                        <button onClick={fetchWalletData} className="retry-btn">
                            Erneut versuchen
                        </button>
                    </div>
                ) : loading && !walletData ? (
                    // Loading state
                    <div className="loading-state">
                        <p>Lade Wallet-Daten...</p>
                    </div>
                ) : walletData ? (
                    <>
                        {/* Balance Section */}
                        <div className="wallet-section">
                            <h3 className="section-title">Guthaben</h3>
                            <div className="balance-container">
                                <div className="balance-card">
                                    <div className="balance-label">Verfügbares Guthaben</div>
                                    <div className="balance-amount">${walletData.availableBalance?.toLocaleString() || '0.00'}</div>
                                </div>
                                <div className="balance-card">
                                    <div className="balance-label">Investiert</div>
                                    <div className="balance-amount invested">${walletData.investedAmount?.toLocaleString() || '0.00'}</div>
                                </div>
                                <div className="balance-card">
                                    <div className="balance-label">Gesamtwert</div>
                                    <div className="balance-amount total">${walletData.totalValue?.toLocaleString() || '0.00'}</div>
                                </div>
                            </div>
                        </div>

                        {/* Holdings Section */}
                        <div className="wallet-section">
                            <h3 className="section-title">Meine Coins</h3>
                            {walletData.holdings && walletData.holdings.length > 0 ? (
                                <table className="crypt-style-table">
                                    <thead>
                                        <tr>
                                            <th>Asset</th>
                                            <th>Menge</th>
                                            <th>Wert</th>
                                            <th>Gewinn/Verlust</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {walletData.holdings && walletData.holdings.map((holding: Holding, index: number) => (
                                            <tr key={index}>
                                                <td>
                                                    <div className="asset-cell">
                                                        <div className="coin-placeholder">
                                                            {holding.coinSymbol.charAt(0)}
                                                        </div>
                                                        <div className="coin-details">
                                                            <div className="coin-name">{holding.coinName}</div>
                                                            <div className="coin-symbol">{holding.coinSymbol}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>{holding.amount.toFixed(6)} {holding.coinSymbol}</td>
                                                <td>${holding.value.toLocaleString()}</td>
                                                <td className={`profit ${holding.profit >= 0 ? 'positive' : 'negative'}`}>
                                                    {holding.profit >= 0 ? '+' : ''}${holding.profit.toFixed(2)} ({holding.profitPercent >= 0 ? '+' : ''}{holding.profitPercent.toFixed(2)}%)
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            ) : (
                                <div className="empty-placeholder">
                                    <p>Noch keine Coins im Portfolio. Kaufe deine ersten Kryptowährungen!</p>
                                </div>
                            )}
                        </div>

                        {/* Recent Transactions Section */}
                        <div className="wallet-section">
                            <h3 className="section-title">Letzte Transaktionen</h3>
                            <div className="transactions-container">
                                {walletData.transactions && walletData.transactions.length > 0 ? (
                                    walletData.transactions.map((transaction: Transaction, index: number) => (
                                        <div key={index} className="transaction-item">
                                            <div className="transaction-info">
                                                <div className={`transaction-type ${transaction.type}`}>
                                                    {transaction.type === 'buy' ? 'Kauf' : 'Verkauf'}
                                                </div>
                                                <div className="transaction-details">
                                                    <span className="transaction-coin">
                                                        {transaction.coinName} ({transaction.coinSymbol})
                                                    </span>
                                                    <span className="transaction-date">{transaction.date}</span>
                                                    {transaction.orderId && (
                                                        <span className="transaction-order-id">Order: {transaction.orderId.slice(-6)}</span>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="transaction-amount">
                                                {transaction.type === 'buy' ? '+' : '-'}{transaction.amount} {transaction.coinSymbol}
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="empty-placeholder">
                                        <p>Noch keine Transaktionen vorhanden.</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </>
                ) : (
                    // No data state
                    <div className="empty-state">
                        <h3>Keine Daten verfügbar</h3>
                        <p>Wallet-Daten konnten nicht geladen werden.</p>
                        <button onClick={fetchWalletData} className="retry-btn">
                            Erneut laden
                        </button>
                    </div>
                )}
            </div>
        </TableWrapper>
    );
};
