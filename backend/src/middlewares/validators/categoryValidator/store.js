const { celebrate, Segments, Joi  } = require('celebrate');

module.exports = celebrate({

    [Segments.HEADERS]: Joi.object().keys({
        authorization: Joi.string().required()
    }).unknown(),
    
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        parent_id: Joi.number()
    })
});
