import supertest from "supertest";

import typeormConnection from "../../../databases/typeorm/connection";
import sonicConnection from "../../../databases/sonic/connection";
import truncate from "../../../testUtils/truncateTypeorm";
import app from "../../../app";
import UserModel from "../../../models/UserModel";
import AddressModel from "../../../models/AddressModel";
import OrderModel from "../../../models/OrderModel";
import CategoryModel from "../../../models/CategoryModel";
import ProductModel from "../../../models/ProductModel";
import OrderProductModel from "../../../models/OrderProductModel";
import {
  fakeUser,
  fakeAddress,
  fakeCreditCard,
  fakeBoleto,
  fakeCpfs,
  fakeCategory,
  fakeProduct,
} from "../../../testUtils/fakeData";

describe("orderPaymentController Store Test Suit", () => {
  beforeAll(() => {
    return typeormConnection;
  });

  beforeEach(() => {
    return truncate();
  });

  afterAll(async () => {
    await sonicConnection.search.close();
    await sonicConnection.ingest.close();

    return (await typeormConnection).close();
  });

  it("should pay an order with credit_card", async () => {
    const user = UserModel.create(fakeUser);
    await user.save();
    const token = user.generateJwt();

    const address = AddressModel.create({ ...fakeAddress, user_id: user.id });
    await address.save();

    const order = OrderModel.create({
      user_id: user.id,
      address_id: address.id,
      freight_name: "sedex",
      freight_price: 9.9,
      total_price: 29.77,
    });
    await order.save();

    const category = CategoryModel.create(fakeCategory);
    await category.save();

    const product = ProductModel.create({
      ...fakeProduct,
      category_id: category.id,
    });
    await product.save();

    const orderProduct = OrderProductModel.create({
      order_id: order.id,
      product_id: product.id,
      product_price: 111.1,
      quantity_buyed: 2,
      product_discount_percent: 0,
    });
    await orderProduct.save();

    const response = await supertest(app)
      .post(`/orders/${order.id}/payment`)
      .set("authorization", "Bearer " + token)
      .send({
        credit_card: fakeCreditCard,
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("order");
    expect(response.body).toHaveProperty("pagarme");
  });

  it("should add an order paid by boleto", async () => {
    const user = UserModel.create(fakeUser);
    await user.save();
    const token = user.generateJwt();

    const address = AddressModel.create({ ...fakeAddress, user_id: user.id });
    await address.save();

    const order = OrderModel.create({
      user_id: user.id,
      address_id: address.id,
      freight_name: "sedex",
      freight_price: 9.9,
      total_price: 29.77,
    });
    await order.save();

    const category = CategoryModel.create(fakeCategory);
    await category.save();

    const product = ProductModel.create({
      ...fakeProduct,
      category_id: category.id,
    });
    await product.save();

    const orderProduct = OrderProductModel.create({
      order_id: order.id,
      product_id: product.id,
      product_price: 111.1,
      quantity_buyed: 2,
      product_discount_percent: 0,
    });
    await orderProduct.save();

    const response = await supertest(app)
      .post(`/orders/${order.id}/payment`)
      .set("authorization", "Bearer " + token)
      .send({
        boleto: fakeBoleto,
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("order");
    expect(response.body).toHaveProperty("pagarme");
  });

  it("should return code 400 for 'Order not found'", async () => {
    const user = UserModel.create(fakeUser);
    await user.save();
    const token = user.generateJwt();

    const address = AddressModel.create({ ...fakeAddress, user_id: user.id });
    await address.save();

    const response = await supertest(app)
      .post(`/orders/1/payment`)
      .set("authorization", "Bearer " + token)
      .send({
        boleto: fakeBoleto,
      });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toBe("Order not found");
  });

  it("should return code 400 for 'Not allowed'", async () => {
    const user = UserModel.create(fakeUser);
    await user.save();

    const address = AddressModel.create({ ...fakeAddress, user_id: user.id });
    await address.save();

    const order = OrderModel.create({
      user_id: user.id,
      address_id: address.id,
      freight_name: "sedex",
      freight_price: 9.9,
      total_price: 29.77,
    });
    await order.save();

    const otherUser = UserModel.create({
      name: "other fake user",
      cpf: fakeCpfs[0],
      email: "otherfake@admin.com",
      password: "123456",
    });
    await user.save();
    const token = otherUser.generateJwt();

    const response = await supertest(app)
      .post(`/orders/${order.id}/payment`)
      .set("authorization", "Bearer " + token)
      .send({
        credit_card: fakeCreditCard,
      });

    expect(response.status).toBe(403);
    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toBe("Not allowed");
  });
});
