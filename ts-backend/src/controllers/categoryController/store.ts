import { Request, Response } from "express";

import CategoryModel from "../../models/CategoryModel";

interface IBody {
  name: string;
  parent_id?: number;
}

export default async function (req: Request, res: Response) {
  const bodyData = req.body as IBody;

  try {
    if (bodyData.parent_id) {
      const parent = await CategoryModel.findOne(bodyData.parent_id);

      if (parent == null)
        return res
          .status(404)
          .json({ message: "parent category id not found" });
    }

    const category = CategoryModel.create(bodyData);

    await category.save();

    return res.status(201).json(category);
  } catch (error) {
    console.error(new Date().toUTCString(), "-", error);
    return res.status(500).json({ message: "internal error" });
  }
}
