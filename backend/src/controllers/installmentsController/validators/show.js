const { celebrate, Segments, Joi } = require('celebrate');

module.exports = celebrate({
    [Segments.BODY]: Joi.object().keys({
        amount: Joi.number().required(),
    }),
});
