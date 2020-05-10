const { celebrate, Segments, Joi } = require('celebrate');

module.exports = {

    store: celebrate({
        [Segments.BODY]: Joi.object().keys({
            email: Joi.string().required()
        })
    }),

    update: celebrate({
        [Segments.BODY]: Joi.object().keys({
            token: Joi.string().required(),
            password: Joi.string().required()
        })
    })
}