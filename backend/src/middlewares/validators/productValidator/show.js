const { celebrate, Segments, Joi } = require('celebrate');

module.exports = celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required()
    }),
});
