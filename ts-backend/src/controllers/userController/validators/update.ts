
import { celebrate, Segments, Joi } from 'celebrate';

export default celebrate({
    [Segments.HEADERS]: Joi.object().keys({
        authorization: Joi.string().required()
    })
    .unknown(),

    [Segments.BODY]: Joi.object().keys({
        name: Joi.string(), 
        email: Joi.string().email(),
        cpf: Joi.string().length(11),
        currentPassword: Joi.string().min(6),
        newPassword: Joi.string().min(6),
    }).min(1)
});
