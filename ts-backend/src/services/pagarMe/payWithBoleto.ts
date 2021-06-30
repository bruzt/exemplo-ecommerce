import pagarMeClient from './client';

import { IBoleto } from '../../controllers/orderController/store';

interface IPagarMeBoletoResponse {
    status: string;
    boleto_url: string;
}

export default async function payWithBoleto(boletoPaymentInfo: IBoleto) {
    
    const client = await pagarMeClient();

    const date = new Date();
    date.setDate(date.getDate() + 3);
    const boleto_expiration_date = `${date.getFullYear()}-${((date.getMonth() + 1) < 10) ? `0${date.getMonth() + 1}` : date.getMonth() + 1}-${(date.getDate() < 10) ? `0${date.getDate()}` : date.getDate()}`;
    const boleto_instructions = 'O BOLETO VENCE EM 3 (TRÊS) DIAS.'

    const response: IPagarMeBoletoResponse = await client.transactions.create({
        ...boletoPaymentInfo,
        payment_method: 'boleto',
        capture: true, // retorna o link para o boleto
        boleto_expiration_date,
        boleto_instructions,
    });

    return response;
}
