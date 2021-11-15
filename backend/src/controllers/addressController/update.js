const express = require("express");

const UserModel = require("../../models/UserModel");
const AddressModel = require("../../models/AddressModel");

/** @param {express.Request} req * @param {express.Response} res */
module.exports = async (req, res) => {
  const id = req.params.id;
  const user_id = req.tokenPayload.id;

  try {
    const user = await UserModel.findByPk(user_id, {
      include: [
        {
          association: "addresses",
          where: { id },
          required: false,
        },
      ],
    });

    if (!user) return res.status(400).json({ message: "user not found" });
    if (user.addresses.length < 1)
      return res.status(400).json({ message: "address not found" });

    await AddressModel.update(req.body, { where: { id } });

    return res.sendStatus(200);
  } catch (error) {
    console.error(new Date().toGMTString(), "-", error);
    res.status(500).json({ message: "internal error" });
  }
};
