import supertest from "supertest";

import typeormConnection from "../../../databases/typeorm/connection";
import sonicConnection from "../../../databases/sonic/connection";
import truncate from "../../../testUtils/truncateTypeorm";
import app from "../../../app";
import UserModel from "../../../models/UserModel";
import AddressModel from "../../../models/AddressModel";
import OrderModel from "../../../models/OrderModel";
import {
  fakeUser,
  fakeAddress,
  fakeOrder,
  fakeCpfs,
} from "../../../testUtils/fakeData";

describe("orderController Show Test Suit", () => {
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

  it("should show an specific order authenticated user", async () => {
    const user = UserModel.create(fakeUser);
    await user.save();
    const token = user.generateJwt();

    const address = AddressModel.create({ ...fakeAddress, user_id: user.id });
    await address.save();

    const order = OrderModel.create({
      ...fakeOrder,
      user_id: user.id,
      address_id: address.id,
    });
    await order.save();

    const response = await supertest(app)
      .get(`/orders/${order.id}`)
      .set("authorization", "Bearer " + token);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id");
  });

  it("should return code 400 for 'Buy order not found'", async () => {
    const user = UserModel.create(fakeUser);
    await user.save();
    const token = user.generateJwt();

    const address = AddressModel.create({ ...fakeAddress, user_id: user.id });
    await address.save();

    const response = await supertest(app)
      .get(`/orders/1`)
      .set("authorization", "Bearer " + token);

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Buy order not found");
  });

  it("should return code 403 for 'Not allowed'", async () => {
    const user = UserModel.create(fakeUser);
    await user.save();

    const address = AddressModel.create({ ...fakeAddress, user_id: user.id });
    await address.save();

    const order = OrderModel.create({
      ...fakeOrder,
      user_id: user.id,
      address_id: address.id,
    });
    await order.save();

    const otherUser = UserModel.create({
      ...fakeUser,
      email: "whatever@tes.t",
      cpf: fakeCpfs[1],
    });
    await otherUser.save();
    const token = otherUser.generateJwt();

    const response = await supertest(app)
      .get(`/orders/${order.id}`)
      .set("authorization", "Bearer " + token);

    expect(response.status).toBe(403);
    expect(response.body.message).toBe("Not allowed");
  });
});
