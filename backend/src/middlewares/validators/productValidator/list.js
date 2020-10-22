const { celebrate, Segments, Joi } = require('celebrate');

module.exports = celebrate({
    [Segments.QUERY]: Joi.object().keys({
        title: Joi.string(),
        category: Joi.number(),
        filter: Joi.string(),
        section: Joi.string(),
        limit: Joi.number(),
        offset: Joi.number(),
    }),
});
