const express = require("express");

const ProductModel = require("../../models/ProductModel");
const { flushProduct } = require("../../database/sonic/flushObject");
const { ingestProduct } = require("../../database/sonic/ingest");

/** @param {express.Request} req * @param {express.Response} res */
module.exports = async (req, res) => {
  const { id } = req.params;

  try {
    const [updated] = await ProductModel.update(req.body, { where: { id } });

    if (updated == 0)
      return res.status(400).json({ message: "no update has been made" });

    if (req.body.title) {
      await flushProduct(id);
      await ingestProduct(id, req.body.title);
    }

    return res.sendStatus(200);
  } catch (error) {
    console.error(new Date().toUTCString(), "-", error);
    return res.status(500).json({ message: "internal error" });
  }
};
