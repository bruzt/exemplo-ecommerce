import { celebrate, Segments, Joi } from "celebrate";

export default celebrate({
  [Segments.HEADERS]: Joi.object()
    .keys({
      authorization: Joi.string().required(),
    })
    .unknown(),

  [Segments.BODY]: Joi.object().keys({
    freight_name: Joi.string().required(),
    freight_price: Joi.number().required(),
    quantity_buyed: Joi.array().items(Joi.number().required()).required(),
    products_id: Joi.array().items(Joi.number().required()).required(),
    address_id: Joi.number().required(),
  }),
});
