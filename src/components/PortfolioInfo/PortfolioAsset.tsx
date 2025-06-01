import React from 'react';
import {Asset} from "../../api-client";

interface Props {
  asset: Asset;
}

export const PortfolioAsset: React.FC<Props> = ({ asset }) => {
    /**
     * TODO: Fetch coin/id -> to get the coin information
     */
  // const currentValue = (asset.quantity * entry.currentPrice).toFixed(2);

  return (
    <tr>
      <td>{asset.coinId}</td>
      <td>{asset.quantity}</td>
      {/*<Td>{currentValue} €</Td>*/}
    </tr>
  );
};
