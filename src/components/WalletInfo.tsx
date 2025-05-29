import React, { useEffect, useState } from 'react';

const WalletInfo = () => {
  const [balance, setBalance] = useState(0);
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    fetch('http://localhost:3000/api/wallet')
      .then((res) => res.json())
      .then((data) => setBalance(data.balance))
      .catch((err) => console.error('Fehler beim Laden der Balance:', err));
  }, []);

  const handleDeposit = () => {
    fetch('http://localhost:3000/api/wallet/deposit', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount }),
    })
      .then((res) => res.json())
      .then((data) => {
        setBalance(data.balance);
        setAmount(0);
      });
  };

  const handleWithdraw = () => {
    fetch('http://localhost:3000/api/wallet/withdraw', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount }),
    })
      .then((res) => res.json())
      .then((data) => {
        setBalance(data.balance);
        setAmount(0);
      });
  };

  return (
    <div className="wallet-container">
      <h2>Wallet</h2>
      <p><strong>Aktuelle Balance:</strong> {balance} €</p>

      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
        placeholder="Betrag (€)"
      />
      <button onClick={handleDeposit}>Geld hinzufügen</button>
      <button onClick={handleWithdraw}>Auszahlen</button>
    </div>
  );
};

export default WalletInfo;