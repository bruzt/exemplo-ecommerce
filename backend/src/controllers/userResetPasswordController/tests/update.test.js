const supertest = require("supertest");
const { promisify } = require("util");
const exec = promisify(require("child_process").exec);

//const truncate = require("../../../testUtils/truncate");
const factories = require("../../../testUtils/factories");
const app = require("../../../app");

describe("userResetPasswordController Test Suit", () => {
  beforeEach(async () => {
    await exec("sequelize db:migrate:undo:all");

    return exec("sequelize db:migrate");
    //return truncate();
  });

  it("should change the password with valid token", async () => {
    const user = await factories.create("User");

    const token = "testetoken";
    user.reset_password_token = token;

    const date = new Date();
    date.setHours(date.getHours() + 1);
    user.reset_password_expires = date;

    await user.save();

    const response = await supertest(app)
      .put("/reset-password")
      .send({
        token: user.id + "$" + token,
        password: "123456",
      });

    expect(response.status).toBe(200);
  });

  it('should return code 400 for "user not found" - update', async () => {
    const response = await supertest(app).put("/reset-password").send({
      token: "2$df95h495df4h9dh",
      password: "123456",
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("user not found");
  });

  it('should return code 400 for "invalid token"', async () => {
    const user = await factories.create("User");

    const token = "testetoken";
    user.reset_password_token = token;

    const date = new Date();
    date.setHours(date.getHours() + 1);
    user.reset_password_expires = date;

    await user.save();

    const response = await supertest(app)
      .put("/reset-password")
      .send({
        token: user.id + "$df4gd54g",
        password: "123456",
      });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("invalid token");
  });

  it('should return code 400 for "invalid token" (invalid id)', async () => {
    const response = await supertest(app).put("/reset-password").send({
      token: "a$df4gd54g",
      password: "123456",
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("invalid token");
  });

  it('should return code 400 for "token expired"', async () => {
    const user = await factories.create("User");

    const token = "testetoken";
    user.reset_password_token = token;

    const date = new Date();
    date.setHours(date.getHours() - 1);
    user.reset_password_expires = date;

    await user.save();

    const response = await supertest(app)
      .put("/reset-password")
      .send({
        token: user.id + "$" + token,
        password: "123456",
      });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("token expired");
  });
});
