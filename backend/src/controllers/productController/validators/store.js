const { celebrate, Segments, Joi } = require('celebrate');

module.exports = celebrate({
    [Segments.HEADERS]: Joi.object().keys({
        authorization: Joi.string().required()
    })
    .unknown(),

    [Segments.BODY]: Joi.object().keys({
        category_id: Joi.number().required(),
        title: Joi.string().required(),
        description: Joi.string().required(),
        html_body: Joi.string(),
        price: Joi.number().required(),
        quantity_stock: Joi.number().required(),
        quantity_sold: Joi.number(),
        discount_percent: Joi.number(),
        discount_datetime_start: Joi.date(),
        discount_datetime_end: Joi.date(),
        tangible: Joi.boolean().required(),
        weight: Joi.number().required(),
        length: Joi.number().required(),
        height: Joi.number().required(),
        width: Joi.number().required(),
    }).preferences({
        abortEarly: false
    })
});
