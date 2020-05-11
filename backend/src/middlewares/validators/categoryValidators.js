const { celebrate, Segments, Joi  } = require('celebrate');

module.exports = {

    show: celebrate({
        
        [Segments.PARAMS]: Joi.object().keys({
            id: Joi.number().required(),
        })
    }),

    store: celebrate({

        [Segments.HEADERS]: Joi.object().keys({
            authorization: Joi.string().required()
        }).unknown(),
        
        [Segments.BODY]: Joi.object().keys({
            name: Joi.string().required(),
            parent: Joi.number()
        })
    }),

    update: celebrate({
        [Segments.HEADERS]: Joi.object().keys({
            authorization: Joi.string().required()
        }).unknown(),

        [Segments.PARAMS]: Joi.object().keys({
            id: Joi.number().required(),
        }),
        
        [Segments.BODY]: Joi.object().keys({
            name: Joi.string(),
            parent: Joi.number()
        })
    }),
    
    destroy: celebrate({
        [Segments.HEADERS]: Joi.object().keys({
            authorization: Joi.string().required()
        }).unknown(),
        
        [Segments.PARAMS]: Joi.object().keys({
            id: Joi.number().required(),
        })
    }),
    
}