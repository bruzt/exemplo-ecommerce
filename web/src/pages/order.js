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

    if(orderContext.order == 'cart') return <Cart />
    else if(orderContext.order == 'address') return <SelectAddress />
    else if(orderContext.order == 'payment') return <Payment />
    else if(orderContext.order == 'thanksForBuy') return <ThanksForBuy />
}
