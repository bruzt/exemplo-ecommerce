import { Request, Response } from "express";

import ProductModel from "../../models/ProductModel";
import sonicFlushObject from "../../databases/sonic/flushObject";

interface IParams {
  id: number;
}

export default async function destroy(req: Request, res: Response) {
  const { id }: IParams = req.params as any;

  try {
    const product = await ProductModel.findOne(id);

    if (product == null)
      return res.status(404).json({ message: "product not found" });

    await product.softRemove();

    await sonicFlushObject.flushProduct(id);

    return res.sendStatus(204);
  } catch (error) {
    console.error(new Date().toUTCString(), "-", error);
    return res.status(500).json({ message: "internal error" });
  }
}
