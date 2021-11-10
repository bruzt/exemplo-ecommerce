const supertest = require("supertest");
const { promisify } = require("util");
const exec = promisify(require("child_process").exec);

//const truncate = require("../../../testUtils/truncate");
const factories = require("../../../testUtils/factories");
const app = require("../../../app");

describe("userController Update Test Suit", () => {
  beforeEach(async () => {
    await exec("sequelize db:migrate:undo:all");

    return exec("sequelize db:migrate");
    //return truncate();
  });

  it("should update a user on db", async () => {
    const newName = "test";

    const user = await factories.create("User");
    const token = user.generateToken();

    const response = await supertest(app)
      .put("/users")
      .set("authorization", "Bearer " + token)
      .send({
        name: newName,
      });

    expect(response.status).toBe(200);
    expect(response.body.name).toBe(newName);
  });

  it('should return code 400 for "user not found"', async () => {
    const user = await factories.create("User");
    const token = user.generateToken();
    await user.destroy({ where: { id: user.id } });

    const response = await supertest(app)
      .put("/users")
      .set("authorization", "Bearer " + token)
      .send({
        name: "test",
      });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("user not found");
  });
});
