const { celebrate, Segments, Joi } = require('celebrate');

module.exports = celebrate({
    [Segments.HEADERS]: Joi.object().keys({
        authorization: Joi.string().required()
    })
    .unknown(),

    [Segments.BODY]: Joi.object().keys({
        name: Joi.string(), 
        email: Joi.string().email(),
        currentPassword: Joi.string(),
        newPassword: Joi.string(),
    }).min(1)
});
