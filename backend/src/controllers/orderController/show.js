const express = require("express");

const OrderModel = require("../../models/OrderModel");

/** @param {express.Request} req * @param {express.Response} res */
module.exports = async (req, res) => {
  const orderId = Number(req.params.id);
  const userId = req.tokenPayload.id;

  try {
    const order = await OrderModel.findByPk(orderId, {
      include: [
        {
          association: "address",
        },
      ],
    });

    if (order == null)
      return res.status(400).json({ message: "Buy order not found" });

    if (order.user_id != userId)
      return res.status(403).json({ message: "Not allowed" });

    return res.json(order);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error searching order" });
  }
};
