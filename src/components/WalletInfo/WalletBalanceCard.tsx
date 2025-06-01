import React, {useEffect, useState} from 'react';
import './WalletInfo.css';
import { useBalanceMutation } from '../../mutation/useBalanceMutation';
import {BalanceModal} from "../BalanceModal/BalanceModal";
import {WalletRequestDtoTypeEnum} from "../../api-client";

interface WalletProps {
    balance: number;
    refetchBalance: () => void;
}

export const WalletBalanceCard: React.FC<WalletProps> = ({ balance,refetchBalance  }) => {
    const { mutateAsync } = useBalanceMutation();
    const [isModalOpen, setModalOpen] = useState(false);
    const invested = 0
    const total = balance + invested
    const handleSubmit = async (amount: string, type: WalletRequestDtoTypeEnum) => {
        await mutateAsync( {amount, type});
    };

    return (
        <div className="wallet-section">
            <h3 className="section-title">Balance</h3>
            <div className="balance-container">
                <div className="balance-card">
                    <div className="balance-label">Available Balance</div>
                    <div className="balance-amount">${balance.toFixed(2)}</div>
                </div>
                <div className="balance-card">
                    <div className="balance-label">Invested</div>
                    <div className="balance-amount invested">${invested.toFixed(2)}</div>
                </div>
                <div className="balance-card">
                    <div className="balance-label">Total</div>
                    <div className="balance-amount total">${total.toFixed(2)}</div>
                </div>
            </div>

            <div className="wallet-actions">
                <button className="open-modal-btn" onClick={() => setModalOpen(true)}>
                    Manage Wallet
                </button>
            </div>

            <BalanceModal
                isOpen={isModalOpen}
                onClose={() => setModalOpen(false)}
                onSubmit={handleSubmit}
                refetchBalance={refetchBalance}
            />
        </div>
    );
};
