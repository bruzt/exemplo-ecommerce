const supertest = require("supertest");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { promisify } = require("util");
const exec = promisify(require("child_process").exec);

//const truncate = require('../../../testUtils/truncate');
const factories = require("../../../testUtils/factories");
const app = require("../../../app");

describe("sessionController Test Suit", () => {
  beforeEach(async () => {
    await exec("sequelize db:migrate:undo:all");

    return exec("sequelize db:migrate");
    //return truncate();
  });

  it("should authenticated with valid credentials", async () => {
    const user = await factories.create("User", {
      email: "test@test.com",
      password: bcrypt.hashSync("passtest", 8),
    });

    const response = await supertest(app).post("/sessions").send({
      email: "test@test.com",
      password: "passtest",
    });

    const { id } = jwt.verify(response.body.token, process.env.APP_SECRET);

    expect(response.status).toBe(200);
    expect(user.id).toBe(id);
  });

  it('should return code 400 for "one or more fields are missing"', async () => {
    const response = await supertest(app).post("/sessions").send({
      email: "test@test.com",
    });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("error");
  });

  it("should not authenticated if user not exists", async () => {
    const response = await supertest(app).post("/sessions").send({
      email: "test@test.com",
      password: "passtest",
    });

    expect(response.status).toBe(400);
  });

  it("should not authenticated if password is incorrect", async () => {
    await factories.create("User", {
      email: "test@test.com",
      password: "passtest",
    });

    const response = await supertest(app).post("/sessions").send({
      email: "test@test.com",
      password: "testpass",
    });

    expect(response.status).toBe(400);
  });
});
