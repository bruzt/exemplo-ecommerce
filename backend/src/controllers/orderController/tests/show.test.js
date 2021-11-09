const supertest = require("supertest");
const { promisify } = require("util");
const exec = promisify(require("child_process").exec);

//const truncate = require('../../utils/truncate');
const factories = require("../../../testUtils/factories");
const { fakeCpfs } = require("../../../testUtils/fakeData");
const app = require("../../../app");

describe("orderController Show Test Suit", () => {
  beforeEach(async () => {
    await exec("sequelize db:migrate:undo:all");

    return exec("sequelize db:migrate");
    //return truncate();
  });

  it("should show one specific order from authenticated user", async () => {
    const user = await factories.create("User");

    const address = await factories.create("Address", { user_id: user.id });

    const token = user.generateToken();

    const order = await factories.create("Order", {
      user_id: user.id,
      address_id: address.id,
    });

    const response = await supertest(app)
      .get(`/orders/${order.id}`)
      .set("authorization", "Bearer " + token);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id");
  });

  it("should return code 400 for 'Buy order not found'", async () => {
    const user = await factories.create("User");
    const token = user.generateToken();

    const response = await supertest(app)
      .get(`/orders/1`)
      .set("authorization", "Bearer " + token);

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Buy order not found");
  });

  it("should return code 403 for 'Not allowed'", async () => {
    const user = await factories.create("User");
    const address = await factories.create("Address", { user_id: user.id });

    const order = await factories.create("Order", {
      user_id: user.id,
      address_id: address.id,
    });

    const otherUser = await factories.create("User", {
      email: "outro email",
      cpf: fakeCpfs[0],
    });
    const token = otherUser.generateToken();

    const response = await supertest(app)
      .get(`/orders/${order.id}`)
      .set("authorization", "Bearer " + token);

    expect(response.status).toBe(403);
    expect(response.body.message).toBe("Not allowed");
  });
});
