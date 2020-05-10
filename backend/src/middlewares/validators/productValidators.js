const { celebrate, Segments, Joi } = require('celebrate');

module.exports = {

    store: celebrate({
        [Segments.HEADERS]: Joi.object().keys({
            authorization: Joi.string().required()
        })
        .unknown(),

        [Segments.BODY]: Joi.object().keys({
            name: Joi.string().required(),
            description: Joi.string().required(),
            price: Joi.number().required(),
            quantity: Joi.number().required(),
            category: Joi.string(),
            discount_percent: Joi.number()
        })
    }),

    update: celebrate({
        [Segments.HEADERS]: Joi.object().keys({
            authorization: Joi.string().required()
        })
        .unknown(),

        [Segments.BODY]: Joi.object().keys({
            name: Joi.string(),
            description: Joi.string(),
            price: Joi.number(),
            quantity: Joi.number(),
            category: Joi.string(),
            discount_percent: Joi.number()
        })
    }),

    destroy: celebrate({
        [Segments.HEADERS]: Joi.object().keys({
            authorization: Joi.string().required()
        })
        .unknown(),

        [Segments.PARAMS]: Joi.object().keys({
            id: Joi.number().required()
        })
    }),
}