import React, { useState } from 'react';
import { CoinDto } from "../../api-client";
import { useQuery } from "@tanstack/react-query";
import './CoinList.css';
import { TableWrapper, StyledHeading } from "./CoinList.styles";
import { readCoinsQuery } from '../../queries/readCoins';
import { DefaultApi, Configuration } from '../../api-client';
import { OrderModal } from '../OrderModal'; // <- Import hinzufügen

const api = new DefaultApi(new Configuration({ basePath: 'http://localhost:5456/api' }));

export const CoinList: React.FunctionComponent = () => {
    const { data: coins, isLoading, error } = useQuery(readCoinsQuery);
    
    // Modal State hinzufügen
    const [selectedCoin, setSelectedCoin] = useState<CoinDto | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOrderClick = (coin: CoinDto) => {
        setSelectedCoin(coin);
        setIsModalOpen(true);
    };

    const handleOrderSubmit = async (quantity: number) => {
        if (!selectedCoin?.id) {
            alert('Coin ID fehlt!');
            return;
        }

        try {
            const orderData = {
                coinId: selectedCoin.id,
                quantity: quantity,
                type: 'BUY' as const
            };
            
            const result = await api.createOrder({
                orderCreateDto: orderData
            });
            
            console.log('Order created:', result);
            alert(`Order für ${selectedCoin.name} erfolgreich erstellt! Menge: ${quantity}`);
            
            // Modal schließen
            setIsModalOpen(false);
            setSelectedCoin(null);
        } catch (error) {
            console.error('Order failed:', error);
            alert('Fehler beim Erstellen der Order!');
        }
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
        setSelectedCoin(null);
    };

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Fehler beim Laden der Coins.</div>;
    if (!coins) return <div>Keine Daten.</div>;

    return (
        <>
            <TableWrapper>
                <StyledHeading>Coin List</StyledHeading>
                <table className="bitpanda-style-table">
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
                                    <button className="order-btn" onClick={() => handleOrderClick(coin)}>
                                        Order
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </TableWrapper>
            
            {/* Modal hinzufügen */}
            {selectedCoin && (
                <OrderModal
                    coin={selectedCoin}
                    isOpen={isModalOpen}
                    onClose={handleModalClose}
                    onSubmit={handleOrderSubmit}
                />
            )}
        </>
    );
};
