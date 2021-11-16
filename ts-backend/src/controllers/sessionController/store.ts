import { Request, Response } from "express";

import UserModel from "../../models/UserModel";

export default async function store(req: Request, res: Response) {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ where: { email } });

    if (!user)
      return res
        .status(400)
        .send({ message: "email or password is incorrect" });

    const comparePassword = await user.checkPassword(password);

    if (!comparePassword)
      return res
        .status(400)
        .json({ message: "email or password is incorrect" });

    const serializedUser = {
      ...user,
      password: undefined,
      tempPassword: undefined,
    };

    return res.json({
      user: serializedUser,
      token: user.generateJwt(),
    });
  } catch (error) {
    console.error(new Date().toUTCString(), "-", error);
    return res.status(500).json({ message: "internal error" });
  }
}
