
import { celebrate, Segments, Joi } from 'celebrate';

export default celebrate({
    [Segments.QUERY]: Joi.object().keys({
        title: Joi.string(),
        category: Joi.number(),
        filter: Joi.string(),
        section: Joi.string(),
        limit: Joi.number(),
        offset: Joi.number(),
    }),
});
