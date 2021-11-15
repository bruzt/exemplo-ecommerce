const express = require("express");
const crypto = require("crypto");

const UserModel = require("../../models/UserModel");
const { sendEmailQueue } = require("../../backgroundJobs/queues");
const resetPasswordTemplate = require("../../services/mailer/templates/resetPasswordTemplate");

/** @param {express.Request} req * @param {express.Response} res */
module.exports = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await UserModel.findOne({ where: { email } });

    if (!user) return res.status(400).json({ message: "user not found" });

    const rawToken = crypto.randomBytes(20).toString("hex");

    const expires = new Date();
    expires.setHours(expires.getHours() + 1);

    user.reset_password_token = rawToken;
    user.reset_password_expires = expires;

    await user.save();

    const template = resetPasswordTemplate(user);

    sendEmailQueue.add({
      from: "donotreply@companydomain.com",
      to: email,
      subject: "Reset Password",
      template,
    });

    return res.sendStatus(204);
  } catch (error) {
    console.error(new Date().toGMTString(), "-", error);
    return res.status(500).json({ message: "internal error" });
  }
};
