import { Request, Response } from "express";
import { getConnection } from "typeorm";

import OrderModel from "../../models/OrderModel";
import UserModel from "../../models/UserModel";
import ProductModel from "../../models/ProductModel";
import OrderProductModel from "../../models/OrderProductModel";
import socketIo from "../../websocket/socketIo";
import { sendEmailQueue } from "../../backgroundJobs/queues";
import buyOrderTemplate from "../../services/mailer/templates/buyOrderTemplate";

interface ICustomer {
  external_id: string;
  name: string;
  email: string;
  type: string;
  country: string;
  phone_numbers: string[];
  documents: Array<{
    type: string;
    number: string;
  }>;
}

interface IShipping {
  name: string;
  fee?: string;
  address: {
    street: string;
    street_number: string;
    neighborhood: string;
    city: string;
    state: string;
    zipcode: string;
    country: string;
  };
}

interface IItems {
  id: string;
  title: string;
  unit_price: string;
  quantity: number;
  tangible: boolean;
}

export interface ICreditCard {
  installments: number;
  card_number: string;
  card_cvv: string;
  card_expiration_date: string;
  card_holder_name: string;
  amount?: string;
  reference_key?: string;
  customer: ICustomer;
  billing: {
    name: string;
    address: {
      street: string;
      street_number: string;
      neighborhood: string;
      city: string;
      state: string;
      zipcode: string;
      country: string;
    };
  };
  shipping: IShipping;
  items?: IItems[];
}

export interface IBoleto {
  amount?: string;
  reference_key?: string;
  customer: ICustomer;
  shipping: IShipping;
  items?: IItems[];
}

interface IBody {
  products_id: number[];
  quantity_buyed: number[];
  freight_name: string;
  freight_price: number;
  address_id: number;
  credit_card?: ICreditCard;
  boleto?: IBoleto;
}

export default async function store(req: Request, res: Response) {
  const body = req.body as IBody;
  const { id } = req.tokenPayload;

  try {
    await getConnection().transaction(async (transactionalEntityManager) => {
      // verify if user and his address exists
      const user = await UserModel.findOne(id, {
        relations: ["addresses"],
      });

      if (user == null)
        return res.status(404).json({ message: "user not found" });

      const addresses = user.addresses?.filter(
        (address) => address.id == body.address_id
      );
      if (addresses == null || addresses.length == 0)
        return res.status(404).json({ message: "address not found" });

      // verify if all products exists and have enough stock
      const products: ProductModel[] = [];
      let errorProduct: string | undefined;

      for (let i = 0; i < body.products_id.length; i++) {
        const product = await ProductModel.findOne(body.products_id[i]);

        if (product == null) {
          errorProduct = "product id " + body.products_id[i] + " not found";
          break;
        }

        if (product.quantity_stock < body.quantity_buyed[i]) {
          errorProduct =
            "product id " + body.products_id[i] + " dont have enough stock";
          break;
        }

        products.push(product);
      }

      if (errorProduct) return res.status(400).json({ message: errorProduct });

      // calculates total price
      let total_price = 0;
      for (let i = 0; i < products.length; i++) {
        total_price +=
          Number(products[i].finalPrice) * Number(body.quantity_buyed[i]);
      }

      // create order
      const order = OrderModel.create({
        user_id: id,
        freight_name: body.freight_name,
        freight_price: Number(Number(body.freight_price).toFixed(2)),
        total_price: Number(total_price.toFixed(2)),
        address_id: body.address_id,
      });

      await transactionalEntityManager.save(order);

      // add products to order and subtract from stock
      for (let i = 0; i < products.length; i++) {
        const orderProduct = OrderProductModel.create({
          product: products[i],
          order,
          quantity_buyed: body.quantity_buyed[i],
          product_price: Number(products[i].price),
          product_discount_percent: products[i].isOnSale
            ? products[i].discount_percent
            : 0,
        });

        await transactionalEntityManager.save(orderProduct);

        products[i].quantity_sold += body.quantity_buyed[i];
        products[i].quantity_stock -= body.quantity_buyed[i];

        await transactionalEntityManager.save(products[i]);
      }

      try {
        socketIo.emitNewOrder(order);

        const template = buyOrderTemplate(
          products,
          body.quantity_buyed,
          body.freight_price,
          total_price
        );

        await sendEmailQueue.add({
          from: "donotreply@companyname.com",
          to: user.email,
          subject: "E-Commerce - Confirmação de compra",
          template,
        });
      } catch (error) {
        console.log(error);
      }

      return res.status(201).json(order);
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "internal error" });
  }
}
