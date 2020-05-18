import React from 'react';

import { useOrder } from '../context/orderContext';

import Cart from '../components/Cart';
import Address from '../components/Address';

export default function Order() {

    const orderContext = useOrder();

    if(orderContext.order == 'cart') return <Cart />;

    else if(orderContext.order == 'address') return <Address />;
}