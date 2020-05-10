const { celebrate, Segments, Joi } = require('celebrate');

module.exports = {

    show: celebrate({
        [Segments.PARAMS]: Joi.object().keys({
            id: Joi.number().required()
        }),
    }),

    store: celebrate({
        [Segments.BODY]: Joi.object().keys({
            name: Joi.string().required(), 
            email: Joi.string().email().required(), 
            password: Joi.string().required().min(6),
        }),
    }),

    update: celebrate({
        [Segments.HEADERS]: Joi.object().keys({
            authorization: Joi.string().required()
        })
        .unknown(),

        [Segments.BODY]: Joi.object().keys({
            name: Joi.string(), 
            email: Joi.string().email(),
            password: Joi.string()
        }),
    }),

    destroy: celebrate({
        [Segments.HEADERS]: Joi.object().keys({
            authorization: Joi.string().required()
        })
        .unknown(),
    })
}