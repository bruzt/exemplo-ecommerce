const { celebrate, Segments, Joi } = require('celebrate');

module.exports = celebrate({
    [Segments.HEADERS]: Joi.object().keys({
        "x-hub-signature": Joi.string().required()
    }).unknown(),

    [Segments.PARAMS]: Joi.object().keys({
        key: Joi.string().required()
    }),

    [Segments.BODY]: Joi.object().keys({
        current_status: Joi.string().required(),
    }).unknown(),
});
