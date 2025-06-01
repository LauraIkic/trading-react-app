import React from 'react';
import { CoinDto } from "../../api-client";
import { useQuery } from "@tanstack/react-query";
import './CoinList.css';
import { TableWrapper, StyledHeading } from "./CoinList.styles";
import { readCoinsQuery } from '../../queries/readCoins';
import { OrderModal } from '../OrderModal/OrderModal';
import { AuthModal } from '../Auth/AuthModal';

export const CoinList: React.FunctionComponent = () => {

    const { data: coins, isLoading, error } = useQuery(readCoinsQuery);
    const [selectedCoin, setSelectedCoin] = React.useState<CoinDto | null>(null);
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [isAuthModalOpen, setIsAuthModalOpen] = React.useState(false);

    const handleOrder = async (coin: CoinDto) => {
        setSelectedCoin(coin);
        setIsModalOpen(true);
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
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <StyledHeading>Coin List</StyledHeading>
                </div>

                <table className="crypt-style-table">
                    <thead>
                        <tr>
                            <th>Asset</th>
                            <th>Price</th>
                            <th>Market Cap</th>
                            <th>Action</th>
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
                                        BUY
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </TableWrapper>

            <AuthModal
                isOpen={isAuthModalOpen}
                onClose={() => setIsAuthModalOpen(false)}
                onSuccess={() => {}}
            />

            {selectedCoin && (
                <OrderModal
                    coin={selectedCoin}
                    isOpen={isModalOpen}
                    onClose={handleModalClose}
                    onSubmit={()=> {}}
                />
            )}
        </>
    );
};
