const express = require("express");

const CategoryModel = require("../../models/CategoryModel");

/** @param {express.Request} req * @param {express.Response} res */
module.exports = async (req, res) => {
  const { id } = req.params;

  try {
    const [updated] = await CategoryModel.update(req.body, { where: { id } });

    if (updated == 0)
      return res.status(400).json({ message: "no update has been made" });

    return res.sendStatus(200);
  } catch (error) {
    console.error(new Date().toUTCString(), "-", error);
    return res.status(500).json({ message: "internal error" });
  }
};
