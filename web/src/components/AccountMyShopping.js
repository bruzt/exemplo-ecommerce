import React, { useState } from 'react';
import Link from 'next/link';

import noImg from '../assets/img-n-disp.png';

import { useUser } from '../context/userContext';

export default function AccountMyShopping() {

    const userContext = useUser();

    const [getOpenOrderTab, setOpenOrderTab] = useState([]);

    const orders = [ ...userContext.getUser.orders ].reverse();

    function handleOpenTab(id){

        if(getOpenOrderTab.includes(id)){

            const openOrders = getOpenOrderTab.filter( (orderId) => orderId != id);

            setOpenOrderTab(openOrders);

        } else {

            const openTabs = [ ...getOpenOrderTab ];
            openTabs.push(id)

            setOpenOrderTab(openTabs);
        }
    }

    return (
        <>
            <section>

                <h1>Minhas compras</h1>

                {orders && orders.map((order) => (

                    <div key={order.id} className="card">
                        <button
                            type="button"
                            className={`${(getOpenOrderTab.includes(order.id) ? 'tab-open' : '')}`}
                            onClick={() => handleOpenTab(order.id)}
                        >
                            <div className="card-header">
                                <span>nº {('000000' + order.id).slice(-6)}</span>
                                <span>Data: {Intl.DateTimeFormat('pt-BR').format(new Date(order.createdAt))}</span>
                                <span>Total: R$ {Number(order.total_price).toFixed(2)}</span>

                                {(order.status == 'awaiting payment') && <span className='awaiting-payment'>Aguardando pagamento</span>}
                                {(order.status == 'paid') && <span className='paid'>Pagamento aceito</span>}
                                {(order.status == 'dispatch') && <span className='dispatch'>expedição</span>}
                                {(order.status == 'sent') && (
                                    <span
                                        className='tracking-code'
                                        onClick={(event) => {
                                            event.stopPropagation();
                                            navigator.clipboard.writeText('PP652398735BR')
                                        }}
                                    >
                                        Cod. Rast.:&nbsp;
                                        <span className='user-select'>
                                            PP652398735BR
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
                ))}

            </section>

            <style jsx>{`
                section {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                }

                section h1 {
                    font-size: 30px;
                    margin-bottom: 20px;
                }

                button[type='button'] {
                    width: 100%;
                    border: 0;
                    color: inherit;
                    background: #0D2235;
                    padding: 10px;
                    border-top-right-radius: 5px;
                    border-top-left-radius: 5px;
                    border-bottom-right-radius: 5px;
                    border-bottom-left-radius: 5px;
                    cursor: pointer;
                }

                button[type='button'].tab-open {
                    border-bottom-right-radius: 0;
                    border-bottom-left-radius: 0;
                }

                button[type='button']:hover {
                    background: #16324C;
                }

                button[type='button']:active {
                    background: #0D2235;
                }

                div.card {
                    width: 100%;
                    margin-bottom: 20px;
                }

                div.card-header {
                    width: 100%;
                    font-size: 20px;

                    display: grid;
                    grid-template-columns: 100px 1fr 1fr 1fr;
                }

                a.card-product {
                    background: #0D2235;
                    border-top: 1px solid #16324C;
                    padding: 5px;
                    cursor: pointer;

                    display: grid;
                    grid-template-columns: 100px 600px 150px;
                    grid-gap: 10px;
                }

                a.card-product:last-child {
                    border-bottom-right-radius: 5px;
                    border-bottom-left-radius: 5px;
                }

                a.card-product:hover {
                    background: #16324C;
                }

                div.img-container {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    overflow: hidden;
                }

                div.img-container img {
                    width: auto;
                    max-width: 100px;
                    height: auto;
                    max-height: 50px;
                }

                a.card-product span {
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-line-clamp: 1; /* number of lines to show */
                    -webkit-box-orient: vertical;
                    justify-content: center;
                    white-space: nowrap;
                }

                span.awaiting-payment {
                    padding: 5px;
                    background: #EED202;
                    border-radius: 5px;
                    color: #0D2235;
                }

                span.paid {
                    padding: 5px;
                    background: #3E8C34;
                    border-radius: 5px;
                    color: #0D2235;
                }

                span.dispatch {
                    padding: 5px;
                    background: #43a836;
                    border-radius: 5px;
                    color: #0D2235;
                }

                span.tracking-code {
                    padding: 5px;
                    background: #44c734;
                    border-radius: 5px;
                    color: #0D2235;
                    font-size: 18px;
                    cursor: copy;
                }

                span.tracking-code span.user-select {
                    user-select: text;
                }
                
                span.refused {
                    padding: 5px;
                    background: #a32e39;
                    border-radius: 5px;
                    color: #0D2235;
                }
            `}</style>
        </>
    );
} 