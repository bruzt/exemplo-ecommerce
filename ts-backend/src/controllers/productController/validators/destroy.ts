import { celebrate, Segments, Joi } from 'celebrate';

export default celebrate({
    [Segments.HEADERS]: Joi.object().keys({
        authorization: Joi.string().required()
    })
    .unknown(),

    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required()
    })
});
