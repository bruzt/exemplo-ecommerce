const express = require("express");

const OrderModel = require("../../models/OrderModel");

/** @param {express.Request} req * @param {express.Response} res */
module.exports = async (req, res) => {
  const limit = req.query.limit;
  const offset = req.query.offset;

  try {
    const count = await OrderModel.count({
      col: "id",
    });

    const orders = await OrderModel.findAll({
      order: [["id", "DESC"]],
      limit,
      offset,
      include: {
        association: "products",
        attributes: ["id", "title"],
        through: {
          attributes: [
            "quantity_buyed",
            "product_price",
            "product_discount_percent",
          ],
        },
      },
    });

    return res.json({ count, orders });
  } catch (error) {
    console.error(new Date().toUTCString(), "-", error);
    return res.status(400).json({ message: "error" });
  }
};
