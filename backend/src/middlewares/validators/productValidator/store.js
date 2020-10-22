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
        tangible: Joi.boolean().required(),
        weight: Joi.string().required(),
        length: Joi.number().required(),
        height: Joi.number().required(),
        width: Joi.number().required(),
    })
});
