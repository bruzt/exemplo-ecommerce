const { celebrate, Segments, Joi  } = require('celebrate');

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
            zipcode: Joi.string().required(),
            street: Joi.string().required(),
            number: Joi.string().required(),
            district: Joi.string().required(),
            city: Joi.string().required(),
            state: Joi.string().required(),
        })
    }),

    update: celebrate({
        [Segments.HEADERS]: Joi.object().keys({
            authorization: Joi.string().required()
        })
        .unknown(),

        [Segments.PARAMS]: Joi.object().keys({
            id: Joi.number().required(),
        }),

        [Segments.BODY]: Joi.object().keys({
            zipcode: Joi.string(),
            street: Joi.string(),
            number: Joi.string(),
            district: Joi.string(),
            city: Joi.string(),
            state: Joi.string(),
        }).min(1)
    }),

    destroy: celebrate({
        [Segments.HEADERS]: Joi.object().keys({
            authorization: Joi.string().required()
        })
        .unknown(),
        
        [Segments.PARAMS]: Joi.object().keys({
            id: Joi.number().required(),
        }),
    })
}