const { celebrate, Segments, Joi  } = require('celebrate');

module.exports = celebrate({
    [Segments.HEADERS]: Joi.object().keys({
        authorization: Joi.string().required()
    })
    .unknown(),

    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required(),
    }),

    [Segments.BODY]: Joi.object().keys({
        zipcode: Joi.string(),
        street: Joi.string(),
        number: Joi.string(),
        neighborhood: Joi.string(),
        city: Joi.string(),
        state: Joi.string(),
    }).min(1)
});
