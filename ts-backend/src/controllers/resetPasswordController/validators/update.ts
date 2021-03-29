import { celebrate, Segments, Joi } from 'celebrate';

export default celebrate({
    [Segments.BODY]: Joi.object().keys({
        token: Joi.string().required(),
        password: Joi.string().required()
    })
});
