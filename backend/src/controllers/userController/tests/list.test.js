const supertest = require("supertest");
const { promisify } = require("util");
const exec = promisify(require("child_process").exec);

//const truncate = require("../../../testUtils/truncate");
const factories = require("../../../testUtils/factories");
const app = require("../../../app");

describe("userController List Test Suit", () => {
  beforeEach(async () => {
    await exec("sequelize db:migrate:undo:all");

    return exec("sequelize db:migrate");
    //return truncate();
  });

  it("should list all users on db", async () => {
    const user = await factories.create("User");
    user.admin = true;
    const token = user.generateToken();

    const cpfs = ["71314297082", "30581023056", "97938138061"];

    for (let i = 0; i < 3; i++) {
      await factories.create("User", {
        email: `email${i}@teste.com`,
        cpf: cpfs[i],
      });
    }

    const response = await supertest(app)
      .get("/users")
      .set("authorization", "Bearer " + token);
    expect(response.status).toBe(200);
    expect(Object.keys(response.body).length).toBe(4);
  });
});
