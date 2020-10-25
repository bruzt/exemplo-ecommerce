import React, { useEffect } from 'react';

import { useOrder } from '../contexts/orderContext';

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
            <PageLayout>

                {(orderContext.getOrder == 'cart') && <Cart />}
                {(orderContext.getOrder == 'address') && <SelectAddress />}
                {(orderContext.getOrder == 'payment') && <PaymentMethod />}
                {(orderContext.getOrder == 'thanksForBuy') && <ThanksForBuy />}

            </PageLayout>
        </>
    );
}
