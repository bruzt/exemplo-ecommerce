const { celebrate, Segments, Joi } = require('celebrate');

module.exports = celebrate({
    [Segments.BODY]: Joi.object().keys({
        token: Joi.string().required(),
        password: Joi.string().required()
    })
});
