const express = require("express");

const UserModel = require("../../models/UserModel");

/** @param {express.Request} req * @param {express.Response} res */
module.exports = async (req, res) => {
  try {
    const users = await UserModel.findAll({
      attributes: { exclude: ["password"] },
    });

    return res.json(users);
  } catch (error) {
    console.error(new Date().toGMTString(), error);
    return res.status(500).json({ message: "internal error" });
  }
};
