import React, { useState } from 'react';
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

const api = new DefaultApi(new Configuration({ basePath: 'http://localhost:5456/api' }));

export const CoinList: React.FunctionComponent = () => {
    const { data: coins, isLoading, error } = useQuery(readCoinsQuery);
    const [selectedCoin, setSelectedCoin] = React.useState<CoinDto | null>(null);
    const [isModalOpen, setIsModalOpen] = React.useState(false);

    const handleOrder = async (coin: CoinDto) => {
        setSelectedCoin(coin);
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
        setSelectedCoin(null);
    };

    const handleModalSubmit = async (quantity: number) => {
        if (!selectedCoin) return;

        try {
            const orderData = {
                coinId: selectedCoin.id!,
                quantity: quantity,
                type: 'BUY'
            };
            
            console.log('Sending order data:', orderData);
            
            const response = await fetch('http://localhost:5456/api/order', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(orderData)
            });
            
            console.log('Response status:', response.status);
            
            if (!response.ok) {
                const errorText = await response.text();
                console.error('Error response:', errorText);
                throw new Error(`HTTP ${response.status}: ${errorText}`);
            }
            
            const result = await response.json();
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
                <StyledHeading>Coin List</StyledHeading>
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
                                        Order
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </TableWrapper>

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
