const express = require("express");

const UserModel = require("../../models/UserModel");
const { sendEmailQueue } = require("../../backgroundJobs/queues");
const userRegisterTemplate = require("../../services/mailer/templates/userRegisterTemplate");
const validateCpf = require("../../util/validateCpf");

/** @param {express.Request} req * @param {express.Response} res */
module.exports = async (req, res) => {
  const { name, email, cpf, password } = req.body;
  try {
    if (name) throw new Error("teste");
    const user = await UserModel.findOne({ where: { email } });

    if (user) return res.status(400).json({ message: "email already in use" });
    if (validateCpf(cpf) == false)
      return res.status(400).json({ message: "invalid cpf" });

    const newUser = await UserModel.create({ name, email, cpf, password });

    newUser.password = undefined;

    const template = userRegisterTemplate(newUser.name);

    await sendEmailQueue.add({
      from: "donotreply@companydomain.com",
      to: newUser.email,
      subject: "E-Commerce - Confirmação de criação de conta",
      template,
    });

    return res.json({ user: newUser, token: newUser.generateToken() });
  } catch (error) {
    console.error(new Date().toGMTString(), "-", error);
    return res.status(500).json({ message: "internal error" });
  }
};
