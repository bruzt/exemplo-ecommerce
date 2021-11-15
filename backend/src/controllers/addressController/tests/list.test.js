const supertest = require("supertest");
const { promisify } = require("util");
const exec = promisify(require("child_process").exec);

//const truncate = require('../../../testUtils/truncate');
const factories = require("../../../testUtils/factories");
const app = require("../../../app");

describe("addressController Test Suit", () => {
  beforeEach(async () => {
    await exec("sequelize db:migrate:undo:all");

    return exec("sequelize db:migrate");
    //return truncate();
  });

  it("should show all address of a user", async () => {
    const user = await factories.create("User");
    const token = user.generateToken();

    await factories.create("Address", {
      user_id: user.id,
    });

    const response = await supertest(app)
      .get(`/addresses`)
      .set("authorization", "Bearer " + token);

    expect(response.status).toBe(200);
    expect(response.body[0].user_id).toBe(user.id);
  });

  it('should return code 400 for "authorization is required"', async () => {
    const response = await supertest(app).get(`/addresses`);

    expect(response.status).toBe(400);
    expect(response.body.validation.keys[0]).toBe("authorization");
  });

  it('should return code 400 for "user not found"', async () => {
    const user = await factories.create("User");
    const token = user.generateToken();
    await user.destroy({ where: { id: user.id } });

    const response = await supertest(app)
      .get(`/addresses`)
      .set("authorization", "Bearer " + token);

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("user not found");
  });
});
