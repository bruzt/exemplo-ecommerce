import { celebrate, Segments, Joi } from 'celebrate';

export default celebrate({
    [Segments.BODY]: Joi.object().keys({
        amount: Joi.number().required(),
    }),
});
