const { celebrate, Segments, Joi } = require('celebrate');

module.exports = celebrate({
    [Segments.BODY]: Joi.object().keys({
        email: Joi.string().email().required(),
        password: Joi.string().required().min(6)
    })
});
