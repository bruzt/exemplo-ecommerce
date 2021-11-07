import supertest from "supertest";

import typeormConnection from "../../../databases/typeorm/connection";
import sonicConnection from "../../../databases/sonic/connection";
import truncate from "../../../testUtils/truncateTypeorm";
import app from "../../../app";
import UserModel from "../../../models/UserModel";
import AddressModel from "../../../models/AddressModel";
import CategoryModel from "../../../models/CategoryModel";
import ProductModel from "../../../models/ProductModel";
import {
  fakeUser,
  fakeAddress,
  fakeCategory,
  fakeProduct,
} from "../../../testUtils/fakeData";

describe("orderController Store Test Suit", () => {
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

  it("should create an buy order", async () => {
    const user = UserModel.create(fakeUser);
    await user.save();
    const token = user.generateJwt();

    const address = AddressModel.create({ ...fakeAddress, user_id: user.id });
    await address.save();

    const category = CategoryModel.create(fakeCategory);
    await category.save();

    const product = ProductModel.create({
      ...fakeProduct,
      category_id: category.id,
    });
    await product.save();

    const response = await supertest(app)
      .post(`/orders`)
      .set("authorization", "Bearer " + token)
      .send({
        freight_name: "sedex",
        freight_price: 30.77,
        quantity_buyed: [2],
        products_id: [product.id],
        address_id: address.id,
      });
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
  });

  it('should return error for "user not found" - store', async () => {
    const user = UserModel.create(fakeUser);
    await user.save();
    const token = user.generateJwt();

    const address = AddressModel.create({ ...fakeAddress, user_id: user.id });
    await address.save();

    const category = CategoryModel.create(fakeCategory);
    await category.save();

    const product = ProductModel.create({
      ...fakeProduct,
      category_id: category.id,
    });
    await product.save();

    await user.softRemove();

    const response = await supertest(app)
      .post(`/orders`)
      .set("authorization", "Bearer " + token)
      .send({
        freight_name: "sedex",
        freight_price: 3077,
        quantity_buyed: [2],
        products_id: [product.id],
        address_id: address.id,
      });
    expect(response.status).toBe(404);
    expect(response.body.message).toBe("user not found");
  });

  it('should return error for "address not found" - store', async () => {
    const user = UserModel.create(fakeUser);
    await user.save();
    const token = user.generateJwt();

    const category = CategoryModel.create(fakeCategory);
    await category.save();

    const product = ProductModel.create({
      ...fakeProduct,
      category_id: category.id,
    });
    await product.save();

    const response = await supertest(app)
      .post(`/orders`)
      .set("authorization", "Bearer " + token)
      .send({
        freight_name: "sedex",
        freight_price: 3077,
        quantity_buyed: [2],
        products_id: [product.id],
        address_id: 11,
      });

    expect(response.status).toBe(404);
    expect(response.body.message).toBe("address not found");
  });

  it('should return error for "must have at least one product" - store', async () => {
    const user = UserModel.create(fakeUser);
    await user.save();
    const token = user.generateJwt();

    const address = AddressModel.create({ ...fakeAddress, user_id: user.id });
    await address.save();

    const response = await supertest(app)
      .post(`/orders`)
      .set("authorization", "Bearer " + token)
      .send({
        freight_name: "sedex",
        freight_price: 3077,
        quantity_buyed: [2],
        products_id: [],
        address_id: address.id,
      });

    expect(response.status).toBe(400);
    expect(response.body.message[0]).toBe(
      '"products_id" does not contain 1 required value(s)'
    );
  });

  it('should return error for "product id not found" - store', async () => {
    const user = UserModel.create(fakeUser);
    await user.save();
    const token = user.generateJwt();

    const address = AddressModel.create({ ...fakeAddress, user_id: user.id });
    await address.save();

    const response = await supertest(app)
      .post(`/orders`)
      .set("authorization", "Bearer " + token)
      .send({
        freight_name: "sedex",
        freight_price: 3077,
        quantity_buyed: [2],
        products_id: [15],
        address_id: address.id,
      });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("product id 15 not found");
  });

  it('should return error for "product dont have enough stock" - store', async () => {
    const user = UserModel.create(fakeUser);
    await user.save();
    const token = user.generateJwt();

    const address = AddressModel.create({ ...fakeAddress, user_id: user.id });
    await address.save();

    const category = CategoryModel.create(fakeCategory);
    await category.save();

    const product = ProductModel.create({
      ...fakeProduct,
      category_id: category.id,
      quantity_stock: 2,
    });
    await product.save();

    const response = await supertest(app)
      .post(`/orders`)
      .set("authorization", "Bearer " + token)
      .send({
        freight_name: "sedex",
        freight_price: 3077,
        quantity_buyed: [5],
        products_id: [product.id],
        address_id: address.id,
      });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe(
      `product id ${product.id} dont have enough stock`
    );
  });
});
