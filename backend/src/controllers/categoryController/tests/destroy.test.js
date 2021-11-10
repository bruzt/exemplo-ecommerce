const supertest = require("supertest");
const { promisify } = require("util");
const exec = promisify(require("child_process").exec);

//const truncate = require('../../../testUtils/truncate');
const factories = require("../../../testUtils/factories");
const app = require("../../../app");

const ProductModel = require("../../../models/ProductModel");

describe("categoryController Destroy Test Suit", () => {
  beforeEach(async () => {
    await exec("sequelize db:migrate:undo:all");

    return exec("sequelize db:migrate");
    //return truncate();
  });

  it("should delete a category", async () => {
    const user = await factories.create("User");
    user.admin = true;
    const token = user.generateToken();

    const category1 = await factories.create("Category", {
      name: "categoria 1",
    });
    const category2 = await factories.create("Category", {
      name: "categoria 2",
    });
    const product = await factories.create("Product", {
      category_id: category1.id,
    });

    const response = await supertest(app)
      .delete(`/categories/${category1.id}`)
      .set("authorization", `Bearer ${token}`)
      .send({
        transferToId: category2.id,
      });
    const productAfter = await ProductModel.findByPk(product.id);

    expect(response.status).toBe(204);
    expect(productAfter.category_id).toBe(category2.id);
  });

  it('should return error 400 for "id and transferToId cannot be the same"', async () => {
    const user = await factories.create("User");
    user.admin = true;
    const token = user.generateToken();

    const response = await supertest(app)
      .delete(`/categories/1`)
      .set("authorization", `Bearer ${token}`)
      .send({
        transferToId: 1,
      });
    expect(response.status).toBe(400);
    expect(response.body.message).toBe(
      "id and transferToId cannot be the same"
    );
  });

  it('should return error 400 for "Category not found"', async () => {
    const user = await factories.create("User");
    user.admin = true;
    const token = user.generateToken();

    const response = await supertest(app)
      .delete(`/categories/1`)
      .set("authorization", `Bearer ${token}`)
      .send({
        transferToId: 2,
      });
    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Category not found");
  });

  it('should return error 400 for "Category to transfer not found"', async () => {
    const user = await factories.create("User");
    user.admin = true;
    const token = user.generateToken();

    const category = await factories.create("Category");

    const response = await supertest(app)
      .delete(`/categories/${category.id}`)
      .set("authorization", `Bearer ${token}`)
      .send({
        transferToId: 2,
      });
    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Category to transfer not found");
  });

  it('should return error 400 for "Category to delete must not have childrens"', async () => {
    const user = await factories.create("User");
    user.admin = true;
    const token = user.generateToken();

    const category1 = await factories.create("Category");
    await factories.create("Category", {
      name: "teste2",
      parent_id: category1.id,
    });
    await factories.create("Category", { name: "teste3" });

    const response = await supertest(app)
      .delete(`/categories/${category1.id}`)
      .set("authorization", `Bearer ${token}`)
      .send({
        transferToId: 3,
      });
    expect(response.status).toBe(400);
    expect(response.body.message).toBe(
      "Category to delete must not have childrens"
    );
  });
});
