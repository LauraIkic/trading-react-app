import React from 'react';
import { TableWrapper, StyledHeading } from "../CoinInfo/CoinList.styles";
import { useQuery } from "@tanstack/react-query";
import { readOrderQuery } from "../../queries/readOrders";

export const OrderInfo: React.FunctionComponent = () => {
    const { data: orders, isLoading, error } = useQuery(readOrderQuery);

    console.log('orders', orders);

    return (
        <TableWrapper style={{ background: '#8e8b9324' }}>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem'}}>
                <StyledHeading>My Orders</StyledHeading>
            </div>

            {isLoading ? (
                <div className="status-state loading">
                    <h3>Loading Orders...</h3>
                </div>
            ) : error ? (
                <div className="status-state error">
                    <h3>Something went wrong.</h3>
                </div>
            ) : (
                <table className="crypt-style-table">
                    <thead>
                    <tr>
                        <th>Coin</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Type</th>
                        <th>Status</th>
                    </tr>
                    </thead>
                    <tbody>
                    {orders?.map((order: any) => (
                        <tr key={order.id}>
                            <td>{order.coinId}</td>
                            <td>{order.quantity}</td>
                            <td>${order.price.toFixed(2)}</td>
                            <td>{order.type}</td>
                            <td>{order.status}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}

        </TableWrapper>
    );
};
