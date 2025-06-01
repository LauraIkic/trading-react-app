import React, { useState } from 'react';
import '../BalanceModal/BalanceModal.css';
import {WalletRequestDtoTypeEnum} from "../../api-client";
import {useBalanceMutation} from "../../mutation/useBalanceMutation";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (amount: string, action: WalletRequestDtoTypeEnum) => void;
    refetchBalance: () => void;
}

export const BalanceModal: React.FC<Props> = ({ isOpen, onClose, onSubmit , refetchBalance}) => {
    const { mutateAsync } = useBalanceMutation();

    const handleSubmit = async (amount: string, type: WalletRequestDtoTypeEnum) => {
        await mutateAsync( {amount, type});
        onClose()
        refetchBalance();
    };

    const [amount, setAmount] = useState(0);

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal">
                <h2>Manage Wallet</h2>
                <p className="text-muted">Enter an amount (USD)</p>

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
                    <div>
                        <button className="add-btn" onClick={() => handleSubmit(amount.toString(),WalletRequestDtoTypeEnum.Deposit)}
                                style={{ marginRight: '10px' }}
                        >
                            Add
                        </button>
                        <button className="withdraw-btn" onClick={() => handleSubmit(amount.toString(),WalletRequestDtoTypeEnum.Withdraw)}>
                            Withdraw
                        </button>
                    </div>
                    <button className="cancel-btn" onClick={onClose}>
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};
