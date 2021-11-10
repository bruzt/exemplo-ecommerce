const supertest = require("supertest");
const path = require("path");
const fs = require("fs");
const { promisify } = require("util");
const exec = promisify(require("child_process").exec);

//const truncate = require('../../../testUtils/truncate');
const factories = require("../../../testUtils/factories");
const app = require("../../../app");

const unlinkAsync = promisify(fs.unlink);
const filePath = path.resolve(
  __dirname,
  "../../../testUtils/files/test-img.png"
);

describe("imageController Test Suit", () => {
  beforeEach(async () => {
    await exec("sequelize db:migrate:undo:all");

    return exec("sequelize db:migrate");
    //return truncate();
  });

  it("should add an image to a product", async () => {
    const user = await factories.create("User");
    const category = await factories.create("Category");
    const product = await factories.create("Product", {
      category_id: category.id,
    });

    user.admin = true;
    const token = user.generateToken();

    const response = await supertest(app)
      .post(`/products/${product.id}/images`)
      .set("authorization", "Bearer " + token)
      .attach("file", filePath);

    await unlinkAsync(response.body[0].url);

    expect(response.status).toBe(200);
  });

  it('should return code 400 for "product not found"', async () => {
    const user = await factories.create("User");
    user.admin = true;
    const token = user.generateToken();

    const response = await supertest(app)
      .post(`/products/40/images`)
      .set("authorization", "Bearer " + token)
      .attach("file", filePath);

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("product not found");
  });
});
