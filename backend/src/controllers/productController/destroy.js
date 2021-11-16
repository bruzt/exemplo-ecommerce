const express = require("express");

const ProductModel = require("../../models/ProductModel");
const { flushProduct } = require("../../database/sonic/flushObject");

/** @param {express.Request} req * @param {express.Response} res */
module.exports = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await ProductModel.destroy({ where: { id } });

    if (product == 0)
      return res.status(400).json({ message: "product not found" });

    await flushProduct(id);

    return res.sendStatus(200);
  } catch (error) {
    console.error(new Date().toUTCString(), "-", error);
    return res.status(500).json({ message: "internal error" });
  }
};
