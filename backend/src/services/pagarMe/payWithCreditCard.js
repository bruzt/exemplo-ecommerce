const pagarMeClient = require('./pagarMeClient');

/**
 * 
 * @param {{
    installments: number,
    card_number: string,
    card_cvv: string,
    card_expiration_date: string,
    card_holder_name: string,
    customer: {
        external_id: string,
        name: string,
        email: string,
        type: string,
        country: string,
        phone_numbers: string[],
        documents: Array<{
            type: string,
            number: string,
        }>,
    },
    billing: {
        name: string,
        address: {
        street: string,
        street_number: string,
        neighborhood: string,
        zipcode: string,
        country: string,
        state: string,
        city: string
        }
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
        fee: string,
    },
    items: Array<{
        id: string,
        title: string,
        unit_price: string,
        quantity: number,
        tangible: boolean
    }>,
    amount: string,
    reference_key: string
}} creditCardInfo 
 * @returns {Promise<{
     status: string
 }>}
 */
module.exports = async function payWithCreditCard(creditCardInfo){

    const client = await pagarMeClient();

    const response = await client.transactions.create({
        ...creditCardInfo,
        payment_method: 'credit_card',
    });

    return response;
}
  