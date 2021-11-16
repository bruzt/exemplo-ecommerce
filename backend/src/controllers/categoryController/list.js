const express = require("express");

const CategoryModel = require("../../models/CategoryModel");

/** @param {express.Request} req * @param {express.Response} res */
module.exports = async (req, res) => {
  try {
    const categories = await CategoryModel.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
      order: [["name", "ASC"]],
    });

    return res.json(categories);
  } catch (error) {
    console.error(new Date().toUTCString(), "-", error);
    return res.status(500).json({ message: "internal error" });
  }
};
