import { Request, Response } from "express";

import OrderModel from "../../models/OrderModel";

export default async function show(req: Request, res: Response) {
  const id = req.params.id;
  const userId = req.tokenPayload.id;

  try {
    const order = await OrderModel.findOne(id, {
      relations: ["address"],
    });

    if (order == null)
      return res.status(400).json({ message: "Buy order not found" });
    if (order.user_id != userId)
      return res.status(403).json({ message: "Not allowed" });

    return res.json(order);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "internal error" });
  }
}
