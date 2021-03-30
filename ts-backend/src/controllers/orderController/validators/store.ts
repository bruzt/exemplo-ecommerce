import { celebrate, Segments, Joi } from 'celebrate';

export default celebrate({
    [Segments.HEADERS]: Joi.object().keys({
        authorization: Joi.string().required()
    })
    .unknown(),

    [Segments.BODY]: Joi.object().keys({
        freight_name: Joi.string().required(),
        freight_price: Joi.number().required(),
        quantity_buyed: Joi.array().items(Joi.number().required()).required(),
        products_id: Joi.array().items(Joi.number().required()).required(),
        address_id: Joi.number().required(),
        credit_card: Joi.object().keys({
            installments: Joi.number().required(),
            card_number: Joi.string().required(),
            card_cvv: Joi.string().required(),
            card_expiration_date: Joi.string().required(),
            card_holder_name: Joi.string().required(),
            customer: Joi.object().keys({
                external_id: Joi.string().required(),
                name: Joi.string().required(),
                email: Joi.string().required(),
                type: Joi.string().required(),
                country: Joi.string().required(),
                phone_numbers: Joi.array().items(Joi.string().required()).required(),
                documents: Joi.array().items(Joi.object().keys({
                    type: Joi.string().required(),
                    number: Joi.string().required()
                })).required()
            }).required(),
            billing: Joi.object().keys({
                name: Joi.string().required(),
                address: Joi.object().keys({
                    street: Joi.string().required(),
                    street_number: Joi.string().required(),
                    neighborhood: Joi.string().required(),
                    city: Joi.string().required(),
                    state: Joi.string().required(),
                    zipcode: Joi.string().required(),
                    country: Joi.string().required(),
                }).required()
            }).required(),
            shipping: Joi.object().keys({
                name: Joi.string().required(), 
                address: Joi.object().keys({
                    street: Joi.string().required(),
                    street_number: Joi.string().required(),
                    neighborhood: Joi.string().required(),
                    city: Joi.string().required(),
                    state: Joi.string().required(),
                    zipcode: Joi.string().required(),
                    country: Joi.string().required(),
                }).required()
            }).required(),
        }),
        boleto: Joi.object().keys({
            customer: {
                external_id: Joi.string().required(),
                name: Joi.string().required(),
                type: Joi.string().required(),
                country: Joi.string().required(),
                email: Joi.string().required(),
                phone_numbers: Joi.array().items(Joi.string().required()).required(),
                documents: Joi.array().items(Joi.object().keys({
                    type: Joi.string().required(),
                    number: Joi.string().required()
                })).required()
            },
            /*billing: {
                name: Joi.string().required(),
                address: {
                    country: Joi.string().required(),
                    state: Joi.string().required(),
                    city: Joi.string().required(),
                    neighborhood: Joi.string().required(),
                    street: Joi.string().required(),
                    street_number: Joi.string().required(),
                    zipcode: Joi.string().required()
                }
            },*/
            shipping: {
                name: Joi.string().required(),
                address: {
                    street: Joi.string().required(),
                    street_number: Joi.string().required(),
                    neighborhood: Joi.string().required(),
                    city: Joi.string().required(),
                    state: Joi.string().required(),
                    zipcode: Joi.string().required(),
                    country: Joi.string().required(),
                }
            }
        }),
    })
});
