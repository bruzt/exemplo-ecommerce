import { Request, Response } from "express";

import UserModel from "../../models/UserModel";

export default async function destroy(req: Request, res: Response) {
  const { id } = req.tokenPayload;

  try {
    const user = await UserModel.findOne(id);

    if (!user) return res.status(404).json({ message: "user not found" });

    await user.softRemove();

    return res.sendStatus(204);
  } catch (error) {
    console.error(new Date().toUTCString(), "-", error);
    res.status(500).json({ message: "internal error" });
  }
}
