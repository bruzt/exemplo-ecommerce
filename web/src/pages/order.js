import React, { useEffect } from 'react';

import { useOrder } from '../context/orderContext';

import Cart from '../components/Cart';
import SelectAddress from '../components/SelectAddress';

export default function Order() {

    const orderContext = useOrder();

    useEffect( () => {

        orderContext.order = 'cart';

    }, []);

    if(orderContext.order == 'cart') return <Cart />
    else if(orderContext.order == 'address') return <SelectAddress />
}
