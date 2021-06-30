import { celebrate, Segments, Joi } from 'celebrate';

export default celebrate({
    [Segments.HEADERS]: Joi.object().keys({
        authorization: Joi.string().required()
    })
    .unknown(),

    [Segments.QUERY]: Joi.object().keys({
        limit: Joi.number(),
        offset: Joi.number(),
    })
});
