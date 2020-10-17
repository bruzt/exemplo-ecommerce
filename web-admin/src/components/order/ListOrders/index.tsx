import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

import api from '../../../services/api';

import { Container } from './styles';

interface IOrders {
    id: number;
    freight_name: string;
    freight_price: string;
    total_price: string;
    payment_method: string;
    status: string;
    boleto_url?: string;
    tracking_code?: string;
    createdAt: string;
    updatedAt: string;
    address_id: number;
    user_id: number;
    products: Array<{
        id: number;
        title: string;
        orders_products: {
            quantity_buyed: number;
            product_price: string;
            product_discount_percent: string;
        }
    }>;
}

export default function ListOrders() {

    const [getOrders, setOrders] = useState<IOrders[]>([]);
    const [getCountOrders, setCountOrders] = useState(0);

    useEffect( () => {
        fetchOrders();
        socketOrders();
    }, []);

    async function socketOrders() {
        try {
            const socket = io('http://localhost:3001');
            
            socket.on('newOrder', (message) => {

                setOrders([ message, ...getOrders ]);
                setCountOrders(getCountOrders + 1);
            });
            
        } catch (error) {
            console.log(error);
            alert('Erro ao buscar ordens de compra');
        }
    }

    async function fetchOrders() {
        
        try {

            const response = await api.get('/admin/orders');

            setOrders(response.data.orders);
            setCountOrders(response.data.count);
            
        } catch (error) {
            console.log(error);
            alert('Erro ao buscar ordens de compra');
        }
    }

    return (
        <Container>

            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {getOrders.map( (order) => (
                        <tr key={order.id}>
                            <td>{order.id}</td>
                            <td>{order.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </Container>
    );
}
