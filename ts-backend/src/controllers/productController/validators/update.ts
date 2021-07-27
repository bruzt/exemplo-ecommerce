import { celebrate, Segments, Joi } from 'celebrate';

export default celebrate({
    [Segments.HEADERS]: Joi.object().keys({
        authorization: Joi.string().required()
    })
    .unknown(),

    [Segments.BODY]: Joi.object().keys({
        category_id: Joi.number(),
        title: Joi.string(),
        description: Joi.string(),
        html_body: Joi.string(),
        price: Joi.number(),
        quantity_stock: Joi.number(),
        quantity_sold: Joi.number(),
        discount_percent: Joi.number(),
        discount_datetime_start: Joi.date(),
        discount_datetime_end: Joi.date(),
        tangible: Joi.boolean(),
        weight: Joi.number(),
        length: Joi.number(),
        height: Joi.number(),
        width: Joi.number(),
    }).min(1)
});
