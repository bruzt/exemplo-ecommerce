import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import io from 'socket.io-client';

import api from '../../../services/api';

import Pencil from '../../genericComponents/icons/Pencil';
import TrashCan from '../../genericComponents/icons/TrashCan';

import { Container } from './styles';

import PaginationNav from '../../PaginationNav';

interface IOrder {
    id: number;
    freight_name: string;
    freight_price: string;
    total_price: string;
    payment_method: string;
    status: "processing" | "waiting_payment" | "paid" | "dispatch" | "sent" | "received" | "refused";
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

let _socket: SocketIOClient.Socket;

export default function ListOrders() {

    const [getOrders, setOrders] = useState<IOrder[]>([]);
    const [getCountOrders, setCountOrders] = useState(0);

    const router = useRouter();

    const _itemsPerPage = 15;
    const _totalPages = Math.ceil(getCountOrders/_itemsPerPage);
    const _currentPage = Number(router.query.page) || 1;

    useEffect( () => {
        fetchOrders();
    }, [_currentPage]);

    useEffect( () => {
        if(_currentPage == 1) {

            socketOrders();

            return () => { 
                _socket.close();
                _socket = null;
            }
        }
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

        if(!_socket) _socket = io(process.env.BACKEND_URL, {
            transports: ['websocket'],
            upgrade: false,
            query: {
                authorization: localStorage.getItem('token')
            }
        });
        
        _socket.on('newOrder', (message: IOrder) => {
        
            const newOrders = [ message, ...getOrders ];

            if(newOrders.length > _itemsPerPage) {
                newOrders.pop();
            } 

            setCountOrders(getCountOrders + 1);
            setOrders(newOrders);
        });
    }

    function handlePagination(page: number){

        router.replace({
            pathname: '/admin',
            query: {
                ...router.query,
                page
            }
        });
    }

    return (
        <Container>

            <h2>Lista de ordens de compra</h2>

            <table>
                <thead>
                    <tr>
                        <th style={{ width: 50 }}>ID</th>
                        <th style={{ width: 500 }}>Status</th>
                        <th style={{ width: 100 }}>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {getOrders.map( (order) => (
                        <tr key={order.id}>
                            <td>{order.id}</td>
                            <td>
                                <div className={`status ${order.status}`}>
                                    {order.status == 'processing' && <span>Processando</span>}
                                    {order.status == 'waiting_payment' && <span>Aguardando pagamento</span>}
                                    {order.status == 'paid' && <span>Pago</span>}
                                    {order.status == 'dispatch' && <span>Expedição</span>}
                                    {order.status == 'sent' && <span>Enviado</span>}
                                    {order.status == 'received' && <span>Entregue</span>}
                                </div>
                            </td>
                            <td className='actions '>
                                <button type='button'>
                                    <Pencil />
                                </button>

                                <button type='button'>
                                    <TrashCan />
                                </button>
                            </td>
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
