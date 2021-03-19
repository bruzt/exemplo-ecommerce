import { celebrate, Segments, Joi } from 'celebrate';

export default celebrate({
    [Segments.BODY]: Joi.object().keys({
        email: Joi.string().email().required(),
        password: Joi.string().required().min(6)
    })
});
