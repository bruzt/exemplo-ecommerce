import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import io from 'socket.io-client';

import api from '../../../services/api';

import { Container } from './styles';

import PaginationNav from '../../PaginationNav';

interface IOrder {
    id: number;
    freight_name: string;
    freight_price: string;
    total_price: string;
    payment_method: string;
    status: "awaiting-payment" | "paid" | "dispatch" | "sent" | "received";
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

    const [getOrders, setOrders] = useState<IOrder[]>([]);
    const [getCountOrders, setCountOrders] = useState(0);

    const router = useRouter();

    const _itemsPerPage = 15;
    const _totalPages = Math.ceil(getCountOrders/_itemsPerPage);
    const _currentPage = Number(router.query.page) || 1;
    let _socket: SocketIOClient.Socket;

    useEffect( () => {
        fetchOrders();
    }, [_currentPage]);

    useEffect( () => {
        socketOrders();
        return () => _socket.close();
    }, [getOrders]);
    
    async function fetchOrders() {
        try {
            const response = await api.get(`/admin/orders?limit=${_itemsPerPage}&offset=${(_currentPage - 1) * _itemsPerPage}`);

            setCountOrders(response.data.count);
            setOrders(response.data.orders);
            
        } catch (error) {
            console.log(error);
            alert('Erro ao buscar ordens de compra');
        }
    }

    async function socketOrders() {

        if(!_socket) _socket = io(process.env.BACKEND_URL);
        
        _socket.on('newOrder', (message: IOrder) => {
            
            if(_currentPage == 1) {

                const newOrders = [ message, ...getOrders ];

                if(newOrders.length > _itemsPerPage) {
                    newOrders.pop();
                } 

                setCountOrders(getCountOrders + 1);
                setOrders(newOrders);
            }
        });
    }

    function handlePagination(page: number){

        router.replace({
            pathname: '/admin',
            query: {
                page
            }
        });
    }

    return (
        <Container>

            <table>
                <thead>
                    <tr>
                        <th style={{ width: 50 }}>ID</th>
                        <th style={{ width: 500 }}>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {getOrders.map( (order) => (
                        <tr key={order.id}>
                            <td>{order.id}</td>
                            <td className={order.status}>{order.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {_totalPages > 1 && (
                <PaginationNav 
                    currentPage={_currentPage}
                    totalPages={_totalPages}
                    limitPageNav={5}
                    handlePagination={handlePagination}
                />
            )}

        </Container>
    );
}
