const { celebrate, Segments, Joi } = require('celebrate');

module.exports = celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(), 
        email: Joi.string().email().required(), 
        cpf: Joi.string().required().length(11), 
        password: Joi.string().required().min(6),
    }),
});
