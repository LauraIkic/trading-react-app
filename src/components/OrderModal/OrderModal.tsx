import React, { useState } from 'react';
import { CoinDto } from '../../api-client';
import './OrderModal.css';

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
                <p className="text-muted">
                    Aktueller Preis: <strong>${coinPrice.toFixed(4)}</strong>
                </p>
                
                {/* Toggle zwischen USD und Coin */}
                <div className="currency-switch">
                    <button 
                        className={`switch-btn ${inputMode === 'dollars' ? 'active' : ''}`}
                        onClick={() => setInputMode('dollars')}
                        type="button"
                    >
                        USD
                    </button>
                    <button 
                        className={`switch-btn ${inputMode === 'coins' ? 'active' : ''}`}
                        onClick={() => setInputMode('coins')}
                        type="button"
                    >
                        {coin.symbol?.toUpperCase()}
                    </button>
                </div>

                {/* Amount Display */}
                <div className="amount-display">
                    {inputMode === 'dollars' ? (
                        <>
                            <div className="amount-input-container">
                                <input 
                                    type="number" 
                                    value={dollarAmount} 
                                    onChange={(e) => setDollarAmount(Number(e.target.value))}
                                    className="amount-input"
                                    min="1"
                                    step="1"
                                />
                            </div>
                            <p className="conversion-text">
                                ≈ {calculatedCoins.toFixed(6)} {coin.symbol?.toUpperCase()}
                            </p>
                        </>
                    ) : (
                        <>
                            <div className="amount-input-container">
                                <input 
                                    type="number" 
                                    value={coinsAmount} 
                                    onChange={(e) => setCoinsAmount(Number(e.target.value))}
                                    className="amount-input"
                                    min="0.01"
                                    step="0.01"
                                />
                            </div>
                            <p className="conversion-text">
                                ≈ ${calculatedDollars.toFixed(2)}
                            </p>
                        </>
                    )}
                </div>

                {/* Action Buttons */}
                <button className="buy-btn" onClick={handleSubmit}>
                    Kaufen
                </button>

                <button className="cancel-btn" onClick={onClose}>
                    Abbrechen
                </button>
            </div>
        </div>
    );
};