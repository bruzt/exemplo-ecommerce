const { celebrate, Segments, Joi  } = require('celebrate');

module.exports = {

    store: celebrate({
        
        [Segments.BODY]: Joi.object().keys({
            destZipCode: Joi.string().required(),
            weight: Joi.string().required(),
            length: Joi.number().required(),
            height: Joi.number().required(),
            width: Joi.number().required(),
        })
    }),
}