import { Request, Response } from "express";

import ImageModel from "../../models/ImageModel";

export default async function destroy(req: Request, res: Response) {
  const { id } = req.params;

  try {
    const image = await ImageModel.findOne(id);

    if (!image) return res.status(404).json({ message: "image not found" });

    await image.remove();

    return res.sendStatus(204);
  } catch (error) {
    console.error(new Date().toUTCString(), "-", error);
    return res.status(500).json({ message: "internal error" });
  }
}
