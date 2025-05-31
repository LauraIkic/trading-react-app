import React from 'react';
import WalletInfo from './WalletInfo';  // Default Import
import { PortfolioInfo } from './PortfolioInfo';
import { CoinList } from './CoinInfo/CoinList';

export const Dashboard: React.FC = () => {
  return (
    <div>
      <WalletInfo />
      <PortfolioInfo />
      <CoinList />
    </div>
  );
};
