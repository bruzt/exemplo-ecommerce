const { celebrate, Segments, Joi } = require('celebrate');

module.exports = {

    index: celebrate({
        [Segments.HEADERS]: Joi.object().keys({
            authorization: Joi.string().required()
        })
        .unknown(),
    }),

    show: celebrate({
        [Segments.PARAMS]: Joi.object().keys({
            id: Joi.number().required()
        }),
    }),

    store: celebrate({
        [Segments.HEADERS]: Joi.object().keys({
            authorization: Joi.string().required()
        })
        .unknown(),

        [Segments.BODY]: Joi.object().keys({
            total_price: Joi.number().required(),
            status: Joi.string(),
            quantity_buyed: Joi.array().items(Joi.number().required()).required(),
            products_id: Joi.array().items(Joi.number().required()).required(),
            address_id: Joi.number().required(),
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
        })
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