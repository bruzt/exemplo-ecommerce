const { celebrate, Segments, Joi  } = require('celebrate');

module.exports = celebrate({
    [Segments.HEADERS]: Joi.object().keys({
        authorization: Joi.string().required()
    }).unknown(),

    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required(),
    }),
    
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string(),
        parent_id: Joi.number()
    }).min(1)
});
