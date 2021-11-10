const supertest = require("supertest");
const { promisify } = require("util");
const exec = promisify(require("child_process").exec);

//const truncate = require("../../../testUtils/truncate");
const factories = require("../../../testUtils/factories");
const app = require("../../../app");

describe("categoryController List Test Suit", () => {
  beforeEach(async () => {
    await exec("sequelize db:migrate:undo:all");

    return exec("sequelize db:migrate");
    //return truncate();
  });

  it("should show all categories", async () => {
    for (let i = 0; i < 3; i++) {
      await factories.create("Category", {
        name: "a" + i,
      });
    }

    const response = await supertest(app).get(`/categories`);

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(3);
  });
});
