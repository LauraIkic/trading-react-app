import React, { useState, useEffect } from 'react';
import { CoinDto } from "../../api";
import { useQuery } from "@tanstack/react-query";
import './CoinList.css';
import { TableWrapper, StyledHeading } from "./CoinList.styles";
import { readCoinsQuery } from '../../queries/readCoins';
import { 
    DefaultApi, 
    Configuration, 
    OrderCreateDto,
    OrderCreateDtoTypeEnum 
} from '../../api-client';
import { OrderModal } from '../OrderModal/OrderModal';
import { AuthModal } from '../Auth/AuthModal';

const api = new DefaultApi(new Configuration({ basePath: 'http://localhost:5456/api' }));

export const CoinList: React.FunctionComponent = () => {
    const { data: coins, isLoading, error } = useQuery(readCoinsQuery);
    const [selectedCoin, setSelectedCoin] = React.useState<CoinDto | null>(null);
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [isAuthModalOpen, setIsAuthModalOpen] = React.useState(false);
    const [user, setUser] = useState<any>(null);

    // Check if user is logged in on component mount
    useEffect(() => {
        const token = localStorage.getItem('authToken');
        const userData = localStorage.getItem('user');
        if (token && userData) {
            setUser(JSON.parse(userData));
        }
    }, []);

    const handleOrder = async (coin: CoinDto) => {
        // Check if user is logged in
        if (!user || !localStorage.getItem('authToken')) {
            setSelectedCoin(coin); // Remember which coin to order
            setIsAuthModalOpen(true);
            return;
        }
        
        setSelectedCoin(coin);
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
        setSelectedCoin(null);
    };

    const handleAuthSuccess = (authData: any) => {
        const userData = {
            userName: authData.userName || 'User',
            email: authData.email
        };
        setUser(userData);
        
        // If user was trying to order a coin, open OrderModal
        if (selectedCoin) {
            setIsModalOpen(true);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
        setUser(null);
    };

    const handleModalSubmit = async (quantity: number) => {
        if (!selectedCoin) return;

        try {
            const orderData: OrderCreateDto = {
                coinId: selectedCoin.id!,
                quantity: quantity,
                type: OrderCreateDtoTypeEnum.Buy
            };
            
            console.log('Sending order data:', orderData);
            
            // Use API client with Authorization header
            const token = localStorage.getItem('authToken');
            const apiWithAuth = new DefaultApi(new Configuration({ 
                basePath: 'http://localhost:5456/api',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }));
            
            const result = await apiWithAuth.createOrder({
                orderCreateDto: orderData
            });
            
            console.log('Order created:', result);
            alert(`Order für ${selectedCoin.name} erfolgreich erstellt!`);
        } catch (error: any) {
            console.error('Order failed:', error);
            alert(`Fehler: ${error.message}`);
        } finally {
            handleModalClose();
        }
    };

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Fehler beim Laden der Coins.</div>;
    if (!coins) return <div>Keine Daten.</div>;

    return (
        <>
            <TableWrapper>
                {/* Header with Auth Status */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <StyledHeading>Coin List</StyledHeading>
                    <div>
                        {user ? (
                            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                <span>Willkommen, {user.userName}!</span>
                                <button className="order-btn" onClick={handleLogout}>
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <button 
                                className="order-btn" 
                                onClick={() => setIsAuthModalOpen(true)}
                            >
                                Anmelden
                            </button>
                        )}
                    </div>
                </div>

                <table className="crypt-style-table">
                    <thead>
                        <tr>
                            <th>Asset</th>
                            <th>Preis</th>
                            <th>Market Cap</th>
                            <th>Aktion</th>
                        </tr>
                    </thead>
                    <tbody>
                        {coins.map((coin: CoinDto) => (
                            <tr key={coin.id}>
                                <td>
                                    <div className="asset-cell">
                                        <img className="coin-logo" src={coin.image} alt={coin.name} />
                                        <div className="coin-details">
                                            <div className="coin-name">{coin.name}</div>
                                            <div className="coin-symbol">{coin.symbol?.toUpperCase()}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>${coin.currentPrice}</td>
                                <td>${coin.marketCap?.toLocaleString() || 'N/A'}</td>
                                <td>
                                    <button className="order-btn" onClick={() => handleOrder(coin)}>
                                        Kaufen
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </TableWrapper>

            {/* Modals */}
            <AuthModal 
                isOpen={isAuthModalOpen}
                onClose={() => setIsAuthModalOpen(false)}
                onSuccess={handleAuthSuccess}
            />

            {selectedCoin && (
                <OrderModal 
                    coin={selectedCoin} 
                    isOpen={isModalOpen} 
                    onClose={handleModalClose} 
                    onSubmit={handleModalSubmit} 
                />
            )}
        </>
    );
};
