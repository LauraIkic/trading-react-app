import React, { useState } from 'react';
import { CoinDto } from '../api-client';

interface Props {
    coin: CoinDto;
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (quantity: number) => void;
}

export const OrderModal: React.FC<Props> = ({ coin, isOpen, onClose, onSubmit }) => {
    const [inputMode, setInputMode] = useState<'coins' | 'dollars'>('dollars');
    const [coinsAmount, setCoinsAmount] = useState(1);
    const [dollarAmount, setDollarAmount] = useState(100);

    if (!isOpen) return null;

    const coinPrice = coin.currentPrice || 0;
    const calculatedDollars = coinsAmount * coinPrice;
    const calculatedCoins = dollarAmount / coinPrice;

    const handleSubmit = () => {
        const finalQuantity = inputMode === 'coins' ? coinsAmount : calculatedCoins;
        onSubmit(finalQuantity);
    };

    return (
        <div className="modal-overlay">
            <div className="modal">
                <h2>Order für {coin.name}</h2>
                <p>Aktueller Preis: <strong>${coinPrice.toFixed(4)}</strong></p>
                
                {/* Switch zwischen USD und Coin */}
                <div className="currency-switch" style={{
                    display: 'flex',
                    background: '#f5f5f5',
                    borderRadius: '12px',
                    padding: '4px',
                    margin: '1.5rem 0',
                    gap: '4px'
                }}>
                    <button 
                        className={`switch-btn ${inputMode === 'dollars' ? 'active' : ''}`}
                        onClick={() => setInputMode('dollars')}
                        type="button"
                        style={{
                            flex: 1,
                            padding: '12px 20px',
                            border: 'none',
                            borderRadius: '8px',
                            background: inputMode === 'dollars' ? 'white' : 'transparent',
                            cursor: 'pointer',
                            fontSize: '0.9rem',
                            fontWeight: '600',
                            color: inputMode === 'dollars' ? '#333' : '#666',
                            boxShadow: inputMode === 'dollars' ? '0 2px 8px rgba(0, 0, 0, 0.1)' : 'none'
                        }}
                    >
                        USD
                    </button>
                    <button 
                        className={`switch-btn ${inputMode === 'coins' ? 'active' : ''}`}
                        onClick={() => setInputMode('coins')}
                        type="button"
                        style={{
                            flex: 1,
                            padding: '12px 20px',
                            border: 'none',
                            borderRadius: '8px',
                            background: inputMode === 'coins' ? 'white' : 'transparent',
                            cursor: 'pointer',
                            fontSize: '0.9rem',
                            fontWeight: '600',
                            color: inputMode === 'coins' ? '#333' : '#666',
                            boxShadow: inputMode === 'coins' ? '0 2px 8px rgba(0, 0, 0, 0.1)' : 'none'
                        }}
                    >
                        {coin.symbol?.toUpperCase()}
                    </button>
                </div>

                {/* Großer Betrag in der Mitte */}
                <div className="amount-display">
                    {inputMode === 'dollars' ? (
                        <>
                            <input 
                                type="number" 
                                value={dollarAmount} 
                                onChange={(e) => setDollarAmount(Number(e.target.value))}
                                className="amount-input"
                                min="1"
                                step="1"
                            />
                            <span className="currency-symbol">$</span>
                            <p className="conversion">≈ {calculatedCoins.toFixed(6)} {coin.symbol?.toUpperCase()}</p>
                        </>
                    ) : (
                        <>
                            <input 
                                type="number" 
                                value={coinsAmount} 
                                onChange={(e) => setCoinsAmount(Number(e.target.value))}
                                className="amount-input"
                                min="0.01"
                                step="0.01"
                            />
                            <span className="currency-symbol">{coin.symbol?.toUpperCase()}</span>
                            <p className="conversion">≈ ${calculatedDollars.toFixed(2)}</p>
                        </>
                    )}
                </div>

                {/* Action Button */}
                <button className="order-overview-btn" onClick={handleSubmit}>
                    Kaufen
                </button>

                <button className="cancel-btn-simple" onClick={onClose}>
                    Abbrechen
                </button>
            </div>
        </div>
    );
};