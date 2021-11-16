import { Request, Response } from "express";

import OrderModel from "../../models/OrderModel";

export default async function destroy(req: Request, res: Response) {
  const { id } = req.params;

  try {
    const order = await OrderModel.findOne(id);

    if (order == null)
      return res.status(404).json({ message: "order not found" });

    if (order.status == "canceled")
      return res.status(400).json({ message: "order already canceled" });

    order.status = "canceled";

    await order.save();

    return res.status(200).json(order);
  } catch (error) {
    console.error(new Date().toUTCString(), "-", error);
    return res.status(500).json({ message: "internal error" });
  }
}
