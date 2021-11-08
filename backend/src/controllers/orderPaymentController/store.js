const { Request, Response } = require("express");

const OrderModel = require("../../models/OrderModel");
const payWithCreditCard = require("../../services/pagarMe/payWithCreditCard");
const payWithBoleto = require("../../services/pagarMe/payWithBoleto");
const calcFinalPrice = require("../../util/calcFinalPrice");
const calcInstallments = require("../../util/calcInstallments");

/**
 * @param {Request} req
 * @param {Response} res
 */
module.exports = async function store(req, res) {
  const orderId = Number(req.params.id);
  const userId = req.tokenPayload.id;

  try {
    const order = await OrderModel.findByPk(orderId, {
      include: [
        {
          association: "products",
          through: {
            attributes: [
              "quantity_buyed",
              "product_price",
              "product_discount_percent",
            ],
          },
          required: false,
          paranoid: false,
        },
      ],
    });

    if (order == null)
      return res.status(400).json({ message: "Order not found" });

    if (order.user_id != userId)
      return res.status(403).json({ message: "Not allowed" });

    const products = order.products;

    if (req.body.credit_card) req.body.credit_card.items = [];
    if (req.body.boleto) req.body.boleto.items = [];

    for (let i = 0; i < products.length; i++) {
      if (req.body.credit_card) {
        req.body.credit_card.items.push({
          id: String(products[i].id),
          title: products[i].title,
          unit_price: String(
            calcFinalPrice(products[i].price, products[i].discount_percent)
          ).replace(".", ""),
          quantity: products[i].orders_products.quantity_buyed,
          tangible: products[i].tangible,
        });
      } else if (req.body.boleto) {
        req.body.boleto.items.push({
          id: String(products[i].id),
          title: products[i].title,
          unit_price: String(
            calcFinalPrice(products[i].price, products[i].discount_percent)
          ).replace(".", ""),
          quantity: products[i].orders_products.quantity_buyed,
          tangible: products[i].tangible,
        });
      }
    }

    let pagarMeResponse;
    const reference_key = `${order.id}!${Number(order.createdAt)}`;

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

      pagarMeResponse = await payWithCreditCard(req.body.credit_card);

      order.status = pagarMeResponse.status;
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

      pagarMeResponse = await payWithBoleto(req.body.boleto);

      /*pagarMeResponse = await new Promise( (resolve, reject) => {
                setTimeout( async () => {
                    try {
                        const pmRes = await client.transactions.find({ reference_key });
                        resolve(pmRes[0]);
                    } catch (error) {
                        reject(error);
                    }
                }, 1000);
            });*/

      order.status = pagarMeResponse.status;
      order.payment_method = "boleto";
      order.boleto_url = pagarMeResponse.boleto_url;
    }

    await order.save();

    await order.reload();

    return res.json({ order, pagarme: pagarMeResponse });
  } catch (error) {
    if (error.response) {
      console.log(error.response);
    } else {
      console.log(error);
    }

    return res.status(500).json({ message: "internal error" });
  }
};
