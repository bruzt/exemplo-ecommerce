import React, { useState } from 'react';
import Link from 'next/link';

import noImg from '../../../assets/img-n-disp.png';

import { useUser } from '../../../context/userContext';

import { Container } from './styles';

export default function AccountMyShoppings() {

    const userContext = useUser();

    const [getOpenOrderTab, setOpenOrderTab] = useState([]);

    const orders = [...userContext.getUser.orders].reverse();

    function handleOpenTab(id) {

        if (getOpenOrderTab.includes(id)) {

            const openOrders = getOpenOrderTab.filter((orderId) => orderId != id);

            setOpenOrderTab(openOrders);

        } else {

            const openTabs = [...getOpenOrderTab];
            openTabs.push(id)

            setOpenOrderTab(openTabs);
        }
    }

    return (
        <>
            <Container>

                <h1>Minhas compras</h1>

                {orders && orders.map((order) => (

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

                                    {(order.status == 'awaiting-payment') &&
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

                            {(getOpenOrderTab.includes(order.id)) && order.products.map((product) => (
                                <Link
                                    key={product.id}
                                    href='/[productId]'
                                    as={`/${product.id}?product=${String(product.title).split(' ').join('-')}`}
                                >
                                    <a className='card-product' onClick={() => console.log(product)}>
                                        <div className="img-container">
                                            <img
                                                src={`${(product.images.length > 0) ? `${process.env.BACKEND_URL}/uploads/${product.images[0].filename}` : noImg}`}
                                                alt={'imagem-' + product.title.split(' ').join('-')}
                                            />
                                        </div>
                                        <span className='product-price'>{product.title}</span>
                                        <span>R$ {Number(product.orders_products.product_price).toFixed(2)}</span>
                                    </a>
                                </Link>
                            ))}
                        </div>
                    </div>
                ))}

            </Container>
        </>
    );
}
