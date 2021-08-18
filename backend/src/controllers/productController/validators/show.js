const { celebrate, Segments, Joi } = require('celebrate');

module.exports = celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required()
    }),

    [Segments.QUERY]: Joi.object().keys({
        buyedWith: Joi.number(),
    }),
});
