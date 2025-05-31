import React, { useState, useEffect } from 'react';
import { CoinDto } from "../../api-client";
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
import { walletRefreshEvent } from '../WalletInfo/WalletInfo';

export const CoinList: React.FunctionComponent = () => {
    return <div>
        huhu
    </div>;
    // const { data: coins, isLoading, error } = useQuery(readCoinsQuery);
    // const [selectedCoin, setSelectedCoin] = React.useState<CoinDto | null>(null);
    // const [isModalOpen, setIsModalOpen] = React.useState(false);
    // const [isAuthModalOpen, setIsAuthModalOpen] = React.useState(false);
    //
    // const handleOrder = async (coin: CoinDto) => {
    //     if (!isLoggedIn) {
    //         setSelectedCoin(coin);
    //         setIsAuthModalOpen(true);
    //         return;
    //     }
    //
    //     setSelectedCoin(coin);
    //     setIsModalOpen(true);
    // };
    //
    // const handleModalClose = () => {
    //     setIsModalOpen(false);
    //     setSelectedCoin(null);
    // };
    //
    // // Kein Parameter mehr, einfacher
    // const handleAuthSuccess = () => {
    //     setIsAuthModalOpen(false);
    //     // Wenn User sich nach Auth einloggt und ein Coin ausgewählt war, Order Modal öffnen
    //     if (selectedCoin && isLoggedIn) {
    //         setIsModalOpen(true);
    //     }
    // };
    //
    // const handleModalSubmit = async (quantity: number) => {
    //     if (!selectedCoin || !isLoggedIn) return;
    //
    //     try {
    //         const orderData: OrderCreateDto = {
    //             coinId: selectedCoin.id!,
    //             quantity: quantity,
    //             type: OrderCreateDtoTypeEnum.Buy
    //         };
    //
    //         console.log('Sende Order-Daten:', orderData);
    //
    //         const apiWithAuth = new DefaultApi(new Configuration({
    //             basePath: 'http://localhost:5456/api',
    //             headers: getAuthHeaders()
    //         }));
    //
    //         const result = await apiWithAuth.createOrder({
    //             orderCreateDto: orderData
    //         });
    //
    //         console.log('Order erstellt:', result);
    //
    //         alert(`Erfolgreich gekauft: ${quantity} ${selectedCoin.symbol?.toUpperCase()}`);
    //
    //         // HINZUFÜGEN: Trigger Wallet Refresh
    //         walletRefreshEvent.dispatchEvent(new Event('refresh'));
    //
    //     } catch (error: any) {
    //         console.error('Order fehlgeschlagen:', error);
    //         alert('Kauf fehlgeschlagen: ' + (error.message || 'Unbekannter Fehler'));
    //     } finally {
    //         handleModalClose();
    //     }
    // };
    //
    // if (isLoading) return <div>Loading...</div>;
    // if (error) return <div>Fehler beim Laden der Coins.</div>;
    // if (!coins) return <div>Keine Daten.</div>;
    //
    // return (
    //     <>
    //         <TableWrapper>
    //             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
    //                 <StyledHeading>Coin List</StyledHeading>
    //             </div>
    //
    //             <table className="crypt-style-table">
    //                 <thead>
    //                     <tr>
    //                         <th>Asset</th>
    //                         <th>Preis</th>
    //                         <th>Market Cap</th>
    //                         <th>Aktion</th>
    //                     </tr>
    //                 </thead>
    //                 <tbody>
    //                     {coins.map((coin: CoinDto) => (
    //                         <tr key={coin.id}>
    //                             <td>
    //                                 <div className="asset-cell">
    //                                     <img className="coin-logo" src={coin.image} alt={coin.name} />
    //                                     <div className="coin-details">
    //                                         <div className="coin-name">{coin.name}</div>
    //                                         <div className="coin-symbol">{coin.symbol?.toUpperCase()}</div>
    //                                     </div>
    //                                 </div>
    //                             </td>
    //                             <td>${coin.currentPrice}</td>
    //                             <td>${coin.marketCap?.toLocaleString() || 'N/A'}</td>
    //                             <td>
    //                                 <button className="order-btn" onClick={() => handleOrder(coin)}>
    //                                     Kaufen
    //                                 </button>
    //                             </td>
    //                         </tr>
    //                     ))}
    //                 </tbody>
    //             </table>
    //         </TableWrapper>
    //
    //         <AuthModal
    //             isOpen={isAuthModalOpen}
    //             onClose={() => setIsAuthModalOpen(false)}
    //             onSuccess={handleAuthSuccess}
    //         />
    //
    //         {selectedCoin && (
    //             <OrderModal
    //                 coin={selectedCoin}
    //                 isOpen={isModalOpen}
    //                 onClose={handleModalClose}
    //                 onSubmit={handleModalSubmit}
    //             />
    //         )}
    //     </>
    // );
};
