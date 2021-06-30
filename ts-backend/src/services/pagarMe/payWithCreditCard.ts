import pagarMeClient from './client';

import { ICreditCard } from '../../controllers/orderController/store';

interface IPagarMeCreditCardResponse {
    status: string;
}

export default async function payWithCreditCard(creditCardPaymentInfo: ICreditCard){

    const client = await pagarMeClient();

    const response: IPagarMeCreditCardResponse = await client.transactions.create({
        ...creditCardPaymentInfo,
        payment_method: 'credit_card',
    });

    return response;
}
