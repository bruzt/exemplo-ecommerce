const supertest = require("supertest");
const { promisify } = require("util");
const exec = promisify(require("child_process").exec);

//const truncate = require('../../utils/truncate');
const factories = require("../../../testUtils/factories");
const app = require("../../../app");
const { fakeCpfs } = require("../../../testUtils/fakeData");

const credit_card = {
  installments: 2,
  card_number: "4111111111111111",
  card_cvv: "546",
  card_expiration_date: "1025",
  card_holder_name: "Jajau Lalau",
  customer: {
    external_id: "1",
    name: "Jajau Lalau",
    email: "teste1@teste.com",
    type: "individual",
    country: "br",
    phone_numbers: ["+5519999999999"],
    documents: [
      {
        type: "cpf",
        number: "99999999999",
      },
    ],
  },
  billing: {
    name: "Jajau Lalau",
    address: {
      street: "rau lalau",
      street_number: "55a",
      neighborhood: "bairro haha",
      city: "cordeirópolis",
      state: "sp",
      zipcode: "13490000",
      country: "br",
    },
  },
  shipping: {
    name: "Jajau Lalau",
    address: {
      street: "rau lalau",
      street_number: "55a",
      neighborhood: "bairro haha",
      city: "cordeirópolis",
      state: "sp",
      zipcode: "13490000",
      country: "br",
    },
  },
};

const boleto = {
  customer: {
    external_id: "1",
    name: "Jajau Lalau",
    email: "teste1@teste.com",
    type: "individual",
    country: "br",
    phone_numbers: ["+5519999999999"],
    documents: [
      {
        type: "cpf",
        number: "99999999999",
      },
    ],
  },
  shipping: {
    name: "Jajau Lalau",
    address: {
      street: "rau lalau",
      street_number: "55a",
      neighborhood: "bairro haha",
      city: "cordeirópolis",
      state: "sp",
      zipcode: "13490000",
      country: "br",
    },
  },
};

describe("orderPaymentController Test Suit", () => {
  beforeEach(async () => {
    await exec("sequelize db:migrate:undo:all");

    return exec("sequelize db:migrate");
    //return truncate();
  });

  it("should pay and order with credit_card", async () => {
    const user = await factories.create("User");
    const address = await factories.create("Address", { user_id: user.id });
    const token = user.generateToken();

    const order = await factories.create("Order", {
      user_id: user.id,
      address_id: address.id,
    });

    const response = await supertest(app)
      .post(`/orders/${order.id}/payment`)
      .set("authorization", "Bearer " + token)
      .send({
        credit_card,
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("order");
    expect(response.body).toHaveProperty("pagarme");
  });

  it("should pay and order with boleto", async () => {
    const user = await factories.create("User");
    const address = await factories.create("Address", { user_id: user.id });
    const token = user.generateToken();

    const order = await factories.create("Order", {
      user_id: user.id,
      address_id: address.id,
    });

    const response = await supertest(app)
      .post(`/orders/${order.id}/payment`)
      .set("authorization", "Bearer " + token)
      .send({
        boleto,
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("order");
    expect(response.body).toHaveProperty("pagarme");
  });

  it("should return code 400 for 'Order not found'", async () => {
    const user = await factories.create("User");
    const token = user.generateToken();

    const response = await supertest(app)
      .post(`/orders/1/payment`)
      .set("authorization", "Bearer " + token)
      .send({
        credit_card,
      });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toBe("Order not found");
  });

  it("should return code 403 for 'Not allowed'", async () => {
    const user = await factories.create("User");
    const address = await factories.create("Address", { user_id: user.id });

    const order = await factories.create("Order", {
      user_id: user.id,
      address_id: address.id,
    });

    const otherUser = await factories.create("User", {
      email: "gg@gg.com",
      cpf: fakeCpfs[0],
    });
    const token = otherUser.generateToken();

    const response = await supertest(app)
      .post(`/orders/${order.id}/payment`)
      .set("authorization", "Bearer " + token)
      .send({
        credit_card,
      });

    expect(response.status).toBe(403);
    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toBe("Not allowed");
  });
});
