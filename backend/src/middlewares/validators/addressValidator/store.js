const { celebrate, Segments, Joi  } = require('celebrate');

module.exports = celebrate({
    [Segments.HEADERS]: Joi.object().keys({
        authorization: Joi.string().required()
    })
    .unknown(),

    [Segments.BODY]: Joi.object().keys({
        zipcode: Joi.string().required(),
        street: Joi.string().required(),
        number: Joi.string().required(),
        neighborhood: Joi.string().required(),
        city: Joi.string().required(),
        state: Joi.string().required(),
    })
});
