import React, { useState } from 'react';
import './WalletInfo.css';
import { useBalanceMutation } from '../../mutation/useBalanceMutation';
import {BalanceModal} from "../BalanceModal/BalanceModal";
import {WalletRequestDtoTypeEnum} from "../../api-client";

interface WalletProps {
    balance: number;
}

export const WalletBalanceCard: React.FC<WalletProps> = ({ balance }) => {
    const { mutateAsync } = useBalanceMutation();
    const [isModalOpen, setModalOpen] = useState(false);

    const handleSubmit = async (amount: string, type: WalletRequestDtoTypeEnum) => {
        console.log('handle')
        await mutateAsync( {amount, type});
        setModalOpen(false);
    };

    return (
        <div className="wallet-section">
            <h3 className="section-title">Balance</h3>
            <div className="balance-container">
                <div className="balance-card">
                    <div className="balance-label">Available Balance</div>
                    <div className="balance-amount">{balance}</div>
                </div>
                <div className="balance-card">
                    <div className="balance-label">Invested</div>
                    <div className="balance-amount invested">0</div>
                </div>
                <div className="balance-card">
                    <div className="balance-label">Total</div>
                    <div className="balance-amount total">0</div>
                </div>
            </div>

            {/* Modal öffnen Button */}
            <div className="wallet-actions">
                <button className="open-modal-btn" onClick={() => setModalOpen(true)}>
                    Wallet verwalten
                </button>
            </div>

            {/* Modal Komponente */}
            <BalanceModal
                isOpen={isModalOpen}
                onClose={() => setModalOpen(false)}
                onSubmit={handleSubmit}
            />
        </div>
    );
};
