const express = require("express");

const UserModel = require("../../models/UserModel");

/** @param {express.Request} req * @param {express.Response} res */
module.exports = async (req, res) => {
  const { token, password } = req.body;

  const [id, rawToken] = token.split("$");

  if (isNaN(id)) return res.status(400).json({ message: "invalid token" });

  try {
    const user = await UserModel.findByPk(id);

    if (!user) return res.status(400).json({ message: "user not found" });
    if (rawToken !== user.reset_password_token)
      return res.status(400).json({ message: "invalid token" });
    if (Date.now() > user.reset_password_expires)
      return res.status(400).json({ message: "token expired" });

    user.password = password;
    user.reset_password_token = null;
    user.reset_password_expires = null;

    await user.save();

    return res.sendStatus(200);
  } catch (error) {
    console.error(new Date().toUTCString(), "-", error);
    return res.status(500).json({ message: "internal error" });
  }
};
