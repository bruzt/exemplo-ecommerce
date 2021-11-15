const express = require("express");

const OrderModel = require("../../models/OrderModel");

/** @param {express.Request} req * @param {express.Response} res */
module.exports = async (req, res) => {
  const { id } = req.tokenPayload;
  const { limit, offset } = req.query;

  try {
    const count = await OrderModel.count({
      col: "id",
      where: {
        user_id: id,
      },
    });

    const orders = await OrderModel.findAll({
      where: {
        user_id: id,
      },
      limit,
      offset,
      attributes: { exclude: ["updatedAt", "address_id", "user_id"] },
      order: [["id", "DESC"]],
      include: [
        {
          association: "address",
          attributes: { exclude: ["createdAt", "updatedAt", "user_id"] },
          required: false,
        },
        {
          association: "products",
          attributes: ["id", "title"],
          through: {
            attributes: [
              "quantity_buyed",
              "product_price",
              "product_discount_percent",
            ],
          },
          required: false,
          paranoid: false,
          include: {
            association: "images",
            attributes: { exclude: ["product_id", "createdAt", "updatedAt"] },
            limit: 1,
            required: false,
          },
        },
      ],
    });

    return res.json({ count, orders });
  } catch (error) {
    console.error(new Date().toGMTString(), "-", error);
    return res.status(500).json({ message: "internal error" });
  }
};
