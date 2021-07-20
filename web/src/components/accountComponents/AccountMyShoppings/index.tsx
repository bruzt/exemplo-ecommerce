import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import api from '../../../services/api';

import { Container } from './styles';

import PaginationNav from '../../PaginationNav';

import { IProduct } from '../../../pages/[productId]';
import { IAddress } from '../../../contexts/userContext';

interface IOrderProduct extends IProduct {
    orders_products: {
        quantity_buyed: number;
        product_price: string;
        product_discount_percent: string;
    }
}

interface IOrder {
    id: number;
    freight_name: string;
    freight_price: string;
    total_price: string;
    payment_method: string;
    status: 'processing' | 'waiting_payment' | 'paid' | 'dispatch' | 'sent' | 'received' | 'refused';
    boleto_url: string | null;
    tracking_code: string | null;
    createdAt: string;
    address: IAddress;
    products: IOrderProduct[]
}

export default function AccountMyShoppings() {

    const [getOpenOrderTab, setOpenOrderTab] = useState<number[]>([]);

    const [getOrders, setOrders] = useState<IOrder[]>([]);
    const [getTotalPages, setTotalPages] = useState<number>(1);

    const router = useRouter();

    const currentPage = Number(router.query.page) || 1;
    const _itemsPerPage = 5;

    useEffect( () => {
        fetchOrders();
    }, [router.query.page]);

    async function fetchOrders() {

        const offset = (currentPage - 1) * _itemsPerPage;
        const page = `?limit=${_itemsPerPage}&offset=${offset}`;
        
        try {

            const response = await api.get(`/orders${page}`);

            setTotalPages(Math.ceil(response.data.count/_itemsPerPage));
            setOrders(response.data.orders);
            
        } catch (error) {
            console.error(error);
            alert('Erro ao buscar ordens de compra');
        }
    }

    function handleOpenTab(id: number) {

        if (getOpenOrderTab.includes(id)) {

            const openOrders = getOpenOrderTab.filter((orderId) => orderId != id);

            setOpenOrderTab(openOrders);

        } else {

            const openTabs = [...getOpenOrderTab];
            openTabs.push(id)

            setOpenOrderTab(openTabs);
        }
    }

    function handlePagination(page: number){

        router.push({
            pathname: '/account',
            query: {
                ...router.query,
                page
            }
        });
    }

    return (
        <>
            <Container data-testid='my-shopping-component'>

                <h2>Minhas compras</h2>

                {getOrders.map((order) => (

                    <div key={order.id} className="scroll-x">

                        <div className="card">
                            <button
                                type="button"
                                className={`${(getOpenOrderTab.includes(order.id) ? 'tab-open' : '')}`}
                                onClick={() => handleOpenTab(order.id)}
                            >
                                <div className="card-header">
                                    <span>nº {('000000' + order.id).slice(-6)}</span>
                                    <span>Data: {Intl.DateTimeFormat('pt-BR').format(new Date(order.createdAt))}</span>
                                    <span>Total: R$ {Number(order.total_price).toFixed(2)}</span>

                                    {(order.status == 'processing') && <span className='processing'>Processando</span>}
                                    {(order.status == 'waiting_payment') &&
                                        <a
                                            href={order.boleto_url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={`${(order.boleto_url) ? 'boleto-link' : ''}`}
                                            title={(order.boleto_url) ? 'Abrir boleto' : ''}
                                            onClick={(event) => event.stopPropagation()}
                                        >
                                            <span>Aguardando pagamento</span>
                                        </a>
                                    }
                                    {(order.status == 'paid') && <span className='paid'>Pagamento aceito</span>}
                                    {(order.status == 'dispatch') && <span className='dispatch'>expedição</span>}
                                    {(order.status == 'sent') && (
                                        <span
                                            className='tracking-code'
                                            onClick={(event) => {
                                                event.stopPropagation();
                                                navigator.clipboard.writeText(`${order.tracking_code}`)
                                            }}
                                        >
                                            Cod. Rast.:&nbsp;
                                            <span className='user-select'>
                                                {order.tracking_code}
                                            </span>
                                        </span>
                                    )}
                                    {(order.status == 'refused') && <span className='refused'>Pagamento recusado</span>}
                                </div>
                            </button>
                            
                            {(getOpenOrderTab.includes(order.id)) && (
                                <div className='order-content'>
                                    <div className="order-card freight-card">
                                        <span>Frete: {order.freight_name.toUpperCase()}</span>
                                        <span>R$ {order.freight_price}</span>
                                    </div>
        
                                    {order.products.map((product) => {
        
                                        const product_price = Number(product.orders_products.product_price);
                                        const product_discount_percent = Number(product.orders_products.product_discount_percent);
        
                                        const finalPrice = (product_price - (product_price * (product_discount_percent/100))).toFixed(2);
        
                                        return (        
                                            <Link
                                                key={product.id}
                                                href={`/${product.id}?product=${String(product.title).split(' ').join('-')}`}
                                            >
                                                <a className='order-card' onClick={() => console.log(product)}>
                                                    <div className="img-container">
                                                        <img
                                                            src={`${(product.images.length > 0) ? `${process.env.BACKEND_URL}/uploads/${product.images[0].filename}` : '/images/img-n-disp.png'}`}
                                                            alt={'imagem-' + product.title.split(' ').join('-')}
                                                        />
                                                    </div>
                                                    <span className='product-title'>
                                                        <span>{product.title}</span>
                                                        <span>
                                                            {Number(product.orders_products.product_discount_percent) > 0 && (
                                                                <span className='product-discount'>{product.orders_products.product_discount_percent}%</span>
                                                            )}
                                                        </span>
                                                    </span>
                                                    <span>{product.orders_products.quantity_buyed}</span>
                                                    <span>R$ {(Number(finalPrice) * product.orders_products.quantity_buyed).toFixed(2)}</span>
                                                </a>
                                            </Link>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    </div>
                ))}

                {getTotalPages > 1 && (
                    <PaginationNav 
                        currentPage={currentPage}
                        totalPages={getTotalPages}
                        limitPageNav={5}
                        handlePagination={handlePagination}
                    />
                )}

            </Container>
        </>
    );
}
