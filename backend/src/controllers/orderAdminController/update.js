const express = require("express");

const OrderModel = require("../../models/OrderModel");

/** @param {express.Request} req * @param {express.Response} res */
module.exports = async (req, res) => {
  //if(Object.keys(req.body).length === 0) return res.status(400).json({ message: 'empty object not allowed'});

  const { id } = req.params;
  const { status } = req.body;

  try {
    const [updated] = await OrderModel.update({ status }, { where: { id } });

    if (updated == 0)
      return res.status(400).json({ message: "no update has been made" });

    return res.sendStatus(200);
  } catch (error) {
    console.error(new Date().toGMTString(), "-", error);
    return res.status(500).json({ message: "internal error" });
  }
};
