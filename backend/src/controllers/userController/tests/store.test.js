const supertest = require("supertest");
const { promisify } = require("util");
const exec = promisify(require("child_process").exec);

//const truncate = require("../../../testUtils/truncate");
const sonicConnection = require("../../../database/sonic/connection");
const factories = require("../../../testUtils/factories");
const { fakeCpfs } = require("../../../testUtils/fakeData");
const app = require("../../../app");

describe("userController Store Test Suit", () => {
  beforeEach(async () => {
    await exec("sequelize db:migrate:undo:all");

    return exec("sequelize db:migrate");
    //return truncate();
  });

  afterAll(async () => {
    app.close();

    await sonicConnection.search.close();
    return sonicConnection.ingest.close();
  });

  it("should add a user to db", async () => {
    const response = await supertest(app).post("/users").send({
      name: "teste",
      email: "teste123@teste.com",
      cpf: fakeCpfs[1],
      password: "bla123",
    });

    expect(response.status).toBe(200);
    expect(response.body.user.name).toBe("teste");
  });

  it("should not add a user with same email on db", async () => {
    await factories.create("User", {
      email: "teste@teste.com",
    });

    const response = await supertest(app).post("/users").send({
      name: "teste",
      email: "teste@teste.com",
      cpf: "71314297082",
      password: "bla123",
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("email already in use");
  });

  it("should not add a user with invalid cpf", async () => {
    const response = await supertest(app).post("/users").send({
      name: "teste",
      email: "teste@teste.com",
      cpf: "71314297081",
      password: "bla123",
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("invalid cpf");
  });
});
