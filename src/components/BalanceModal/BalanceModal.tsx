import React, { useState } from 'react';
import '../BalanceModal/BalanceModal.css';
import {WalletRequestDtoTypeEnum} from "../../api-client";
import {useBalanceMutation} from "../../mutation/useBalanceMutation";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (amount: string, action: WalletRequestDtoTypeEnum ) => void;
}

export const BalanceModal: React.FC<Props> = ({ isOpen, onClose, onSubmit }) => {
    const { mutateAsync } = useBalanceMutation();

    const handleSubmit = async (amount: string, type: WalletRequestDtoTypeEnum) => {
        await mutateAsync( {amount, type});
    };

    const [amount, setAmount] = useState(0);

    if (!isOpen) return null;

    // const handleAction = (action: WalletRequestDtoTypeEnum) => {
    //     if (amount <= 0) return;
    //     onSubmit(amount, action);
    // };

    return (
        <div className="modal-overlay">
            <div className="modal">
                <h2>Wallet verwalten</h2>
                <p className="text-muted">Gib den Betrag in USD ein</p>

                <div className="amount-input-container">
                    <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(Number(e.target.value))}
                        className="amount-input"
                        min="1"
                        step="1"
                    />
                </div>

                <div className="action-buttons">
                    <button className="add-btn" onClick={() => handleSubmit(amount.toString(),WalletRequestDtoTypeEnum.Deposit)}>
                        Add
                    </button>
                    <button className="withdraw-btn" onClick={() => handleSubmit(amount.toString(),WalletRequestDtoTypeEnum.Withdraw)}>
                        Withdraw
                    </button>
                    <button className="cancel-btn" onClick={onClose}>
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};
