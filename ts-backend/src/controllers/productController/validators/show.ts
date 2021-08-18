import { celebrate, Segments, Joi } from 'celebrate';

export default celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required()
    }),

    [Segments.QUERY]: Joi.object().keys({
        buyedWith: Joi.number(),
    }),
});
