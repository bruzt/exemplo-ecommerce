import React, { useEffect } from 'react';

import { useOrder } from '../context/orderContext';

import Cart from '../components/Cart';
import SelectAddress from '../components/SelectAddress';
import Payment from '../components/Payment';
import ThanksForBuy from '../components/ThanksForBuy';

export default function Order() {

    const orderContext = useOrder();

    useEffect( () => {

        orderContext.setOrder('cart');

    }, []);

    if(orderContext.getOrder == 'cart') return <Cart />
    else if(orderContext.getOrder == 'address') return <SelectAddress />
    else if(orderContext.getOrder == 'payment') return <Payment />
    else if(orderContext.getOrder == 'thanksForBuy') return <ThanksForBuy />
}
