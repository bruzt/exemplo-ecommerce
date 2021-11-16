import { Request, Response } from "express";

import OrderModel from "../../models/OrderModel";

export default async function update(req: Request, res: Response) {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const order = await OrderModel.findOne(id);

    if (order == null)
      return res.status(404).json({ message: "order not found" });

    if (status) order.status = status;

    await order.save();

    return res.json(order);
  } catch (error) {
    console.error(new Date().toUTCString(), "-", error);
    return res.status(500).json({ message: "internal error" });
  }
}
