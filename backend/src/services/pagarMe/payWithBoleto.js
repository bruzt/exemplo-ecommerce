const pagarMeClient = require('./pagarMeClient');
/*
{
    customer: {
      external_id: string,
      name: 'teste 1',
      email: string,
      type: string,
      country: string,
      phone_numbers: string[],
      documents: [ [Object] ]
    },
    shipping: {
      name: string,
      address: {
        street: string,
        street_number: string,
        neighborhood: string,
        zipcode: string,
        country: string,
        state: string,
        city: string
      },
      fee: string
    },
    items: [
      {
        id: string,
        title: string,
        unit_price: string,
        quantity: number,
        tangible: boolean,
      }
    ],
    amount: string,
    reference_key: string,
}
  */

/**
 * 
 * @param {{
    customer: {
      external_id: string,
      name: 'teste 1',
      email: string,
      type: string,
      country: string,
      phone_numbers: string[],
      documents: [ [Object] ]
    },
    shipping: {
      name: string,
      address: {
        street: string,
        street_number: string,
        neighborhood: string,
        zipcode: string,
        country: string,
        state: string,
        city: string
      },
      fee: string
    },
    items: [
      {
        id: string,
        title: string,
        unit_price: string,
        quantity: number,
        tangible: boolean,
      }
    ],
    amount: string,
    reference_key: string,
}} boletoInfo 
 * @returns {Promise<{
     status: string,
     boleto_url: string,
    }>}
 */
module.exports = async function payWithBoleto(boletoInfo){

    const client = await pagarMeClient();

    let date = new Date();
    date.setDate(date.getDate() + 3);

    const boleto_expiration_date = `${date.getFullYear()}-${((date.getMonth() + 1) < 10) ? `0${date.getMonth() + 1}` : date.getMonth() + 1}-${(date.getDate() < 10) ? `0${date.getDate()}` : date.getDate() }`;  
    const boleto_instructions = 'O BOLETO VENCE EM 3 (TRÊS) DIAS.';

    const response = await client.transactions.create({
        ...boletoInfo,
        payment_method: 'boleto',
        capture: true, // retorna o link para o boleto
        boleto_expiration_date,
        boleto_instructions,
    });

    return response;
}
  