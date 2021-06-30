import { celebrate, Segments, Joi  } from 'celebrate';

export default celebrate({
        
    [Segments.BODY]: Joi.object().keys({
        destZipCode: Joi.string().required(),
        weight: Joi.string().required(),
        length: Joi.number().required(),
        height: Joi.number().required(),
        width: Joi.number().required(),
    })
});
