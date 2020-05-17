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
            html_body: Joi.string(),
            price: Joi.number().required(),
            quantity_stock: Joi.number().required(),
            category_id: Joi.number().required(),
            discount_percent: Joi.number(),
            weight: Joi.string().required(),
            length: Joi.number().required(),
            height: Joi.number().required(),
            width: Joi.number().required(),
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
            html_body: Joi.string(),
            price: Joi.number(),
            quantity: Joi.number(),
            category_id: Joi.number(),
            discount_percent: Joi.number(),
            weight: Joi.string(),
            length: Joi.number(),
            height: Joi.number(),
            width: Joi.number(),
        }).min(1)
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