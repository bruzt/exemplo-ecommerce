import React, { useEffect } from 'react';
import Head from 'next/head';

import { useOrder } from '../context/orderContext';

import PageLayout from '../components/PageLayout';
import Cart from '../components/Cart';
import SelectAddress from '../components/SelectAddress';
import PaymentMethod from '../components/PaymentMethod';
import ThanksForBuy from '../components/ThanksForBuy';

export default function Order() {

    const orderContext = useOrder();

    useEffect( () => {

        orderContext.setOrder('cart');

    }, []);

    return (
        <>
            <Head>
                <title>Obrigado pela compra</title>
                <meta name="robots" content="noindex" />
            </Head>

            <PageLayout>

                {(orderContext.getOrder == 'cart') && <Cart />}
                {(orderContext.getOrder == 'address') && <SelectAddress />}
                {(orderContext.getOrder == 'payment') && <PaymentMethod />}
                {(orderContext.getOrder == 'thanksForBuy') && <ThanksForBuy />}

            </PageLayout>
        </>
    );
}
