const { celebrate, Segments, Joi } = require('celebrate');

module.exports = {

    index: celebrate({
        [Segments.HEADERS]: Joi.object().keys({
            authorization: Joi.string().required()
        })
        .unknown(),
    }),

    store: celebrate({
        [Segments.HEADERS]: Joi.object().keys({
            authorization: Joi.string().required()
        })
        .unknown(),

        [Segments.BODY]: Joi.object().keys({
            total_price: Joi.number().required(),
            quantity_buyed: Joi.array().items(Joi.number().required()).required(),
            products_id: Joi.array().items(Joi.number().required()).required(),
            address_id: Joi.number().required(),
            credit_card: Joi.object().keys({
                amount: Joi.number().required(),
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
                        zipcode: Joi.string().required(),
                        country: Joi.string().required(),
                        state: Joi.string().required(),
                        city: Joi.string().required(),
                    }).required()
                }).required(),
                shipping: Joi.object().keys({
                    name: Joi.string().required(),
                    fee: Joi.number().required(), 
                    address: Joi.object().keys({
                        street: Joi.string().required(),
                        street_number: Joi.string().required(),
                        zipcode: Joi.string().required(),
                        country: Joi.string().required(),
                        state: Joi.string().required(),
                        city: Joi.string().required(),
                    }).required()
                }).required(),
                /*items: Joi.array().items(Joi.object().keys({
                    id: Joi.string().required(),
                    title: Joi.string().required(),
                    unit_price: Joi.number().required(),
                    quantity: Joi.number().required(),
                    tangible: Joi.boolean().required()
                })).required()*/
            }).required()
        })
    }),

    update: celebrate({
        [Segments.HEADERS]: Joi.object().keys({
            authorization: Joi.string().required()
        })
        .unknown(),

        [Segments.PARAMS]: Joi.object().keys({
            id: Joi.number().required()
        }),

        [Segments.BODY]: Joi.object().keys({
            status: Joi.string()
        }).min(1)
    }),

    destroy: celebrate({
        [Segments.HEADERS]: Joi.object().keys({
            authorization: Joi.string().required()
        })
        .unknown(),

        [Segments.PARAMS]: Joi.object().keys({
            id: Joi.number().required()
        }),
    }),
}