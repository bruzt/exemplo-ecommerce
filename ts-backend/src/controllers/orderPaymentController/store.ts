import { Request, Response } from "express";

import OrderModel from "../../models/OrderModel";
import payWithCreditCard from "../../services/pagarMe/payWithCreditCard";
import payWithBoleto from "../../services/pagarMe/payWithBoleto";
import calcInstallments from "../../utils/calcInstallments";

export default async function store(req: Request, res: Response) {
  const orderId = Number(req.params.id);
  const userId = req.tokenPayload.id;

  try {
    const order = await OrderModel.findOne(orderId, {
      relations: ["ordersProducts", "ordersProducts.product"],
    });

    if (order == null)
      return res.status(400).json({ message: "Order not found" });

    if (order.user_id != userId)
      return res.status(403).json({ message: "Not allowed" });

    const products = order.ordersProducts!.map(
      (orderProduct) => orderProduct.product!
    );

    const quantityBuyed = order.ordersProducts!.map(
      (orderProduct) => orderProduct.quantity_buyed
    );

    if (req.body.credit_card) req.body.credit_card.items = [];
    else if (req.body.boleto) req.body.boleto.items = [];

    for (let i = 0; i < products.length; i++) {
      if (req.body.credit_card && req.body.credit_card.items) {
        req.body.credit_card.items.push({
          id: String(products[i].id),
          title: products[i].title,
          unit_price: String(products[i].finalPrice).replace(".", ""),
          quantity: quantityBuyed[i],
          tangible: products[i].tangible,
        });
      } else if (req.body.boleto && req.body.boleto.items) {
        req.body.boleto.items.push({
          id: String(products[i].id),
          title: products[i].title,
          unit_price: String(products[i].finalPrice).replace(".", ""),
          quantity: quantityBuyed[i],
          tangible: products[i].tangible,
        });
      }
    }

    let pagarMeResponse;
    const reference_key = `${order.id}!${Number(order.created_at)}`;

    const productsAmount = String(order.total_price).replace(".", "");
    const shippingFee = String(Number(order.freight_price).toFixed(2)).replace(
      ".",
      ""
    );

    ////////////////////////////////////
    // PAGAMENTO CARTAO CREDITO
    ///////////////////////////////////
    if (req.body.credit_card) {
      let amount = String(Number(productsAmount) + Number(shippingFee));

      // apply interest rate to total price
      if (
        req.body.credit_card.installments >
        Number(process.env.FREE_INSTALLMENTS)
      ) {
        const installmentsOptions = calcInstallments(
          parseFloat(String(amount) + "e-2")
        ); // parseFloat(string + 'e-2') adds . of cents
        amount = (
          Number(
            installmentsOptions.installments[
              req.body.credit_card.installments - 1
            ]
          ) * Number(req.body.credit_card.installments)
        )
          .toFixed(2)
          .replace(".", "");
      }

      req.body.credit_card.amount = amount;
      req.body.credit_card.shipping.fee = shippingFee;

      req.body.credit_card.reference_key = reference_key;

      const response = await payWithCreditCard(req.body.credit_card);
      pagarMeResponse = response;

      order.status = response.status;
      order.payment_method = "credit_card";

      ////////////////////////////////////
      // PAGAMENTO BOLETO
      ///////////////////////////////////
    } else if (req.body.boleto) {
      req.body.boleto.amount = String(
        Number(productsAmount) + Number(shippingFee)
      );
      req.body.boleto.shipping.fee = shippingFee;

      req.body.boleto.reference_key = reference_key;

      const response = await payWithBoleto(req.body.boleto);
      pagarMeResponse = response;

      order.status = response.status;
      order.payment_method = "boleto";
      order.boleto_url = response.boleto_url;
    }

    await order.save();

    return res.json({ order, pagarme: pagarMeResponse });
  } catch (error) {
    // @ts-ignore
    if (error.response) {
      // @ts-ignore
      console.log(error.response);
    } else {
      console.log(error);
    }

    return res.status(500).json({ message: "Internal error" });
  }
}
