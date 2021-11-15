const express = require("express");

const OrderModel = require("../../models/OrderModel");

/** @param {express.Request} req * @param {express.Response} res */
module.exports = async (req, res) => {
  const { id } = req.params;

  try {
    const order = await OrderModel.findByPk(id);

    if (!order) return res.status(400).json({ message: "order not found" });

    order.status = "canceled";

    await order.save();

    return res.sendStatus(200);
  } catch (error) {
    console.error(new Date().toGMTString(), "-", error);
    return res.status(500).json({ message: "internal error" });
  }
};
