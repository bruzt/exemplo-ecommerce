const { celebrate, Segments, Joi } = require('celebrate');

module.exports = {

    store: celebrate({
        [Segments.HEADERS]: Joi.object().keys({
            authorization: Joi.string().required()
        }).unknown(),

        [Segments.PARAMS]: Joi.object().keys({
            id: Joi.number().required()
        })
    }),

    destroy: celebrate({
        [Segments.HEADERS]: Joi.object().keys({
            authorization: Joi.string().required()
        }).unknown(),

        [Segments.PARAMS]: Joi.object().keys({
            id: Joi.number().required()
        })
    }),
}