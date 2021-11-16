const express = require("express");

const UserModel = require("../../models/UserModel");
const AddressModel = require("../../models/AddressModel");

/** @param {express.Request} req * @param {express.Response} res */
module.exports = async (req, res) => {
  const user_id = req.tokenPayload.id;

  try {
    const user = await UserModel.findByPk(user_id);

    if (!user) return res.status(400).json({ message: "user not found" });

    const address = await AddressModel.create({ user_id, ...req.body });

    return res.json(address);
  } catch (error) {
    console.error(new Date().toUTCString(), "-", error);
    res.status(500).json({ message: "internal error" });
  }
};
