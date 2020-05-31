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
            parent_id: Joi.number()
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
            parent_id: Joi.number()
        }).min(1)
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