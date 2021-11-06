const { factory } = require("factory-girl");
const faker = require("faker");

const autoRequireAll = require("../util/autoRequireAll");

const models = autoRequireAll(__dirname, "../models");

factory.define("User", models.UserModel, {
  name: faker.name.findName(),
  email: faker.internet.email(),
  cpf: "88819141078",
  password: faker.internet.password(),
});

factory.define("Address", models.AddressModel, {
  zipcode: faker.address.zipCode(),
  street: faker.address.streetName(),
  number: faker.random.number(),
  neighborhood: faker.address.secondaryAddress(),
  city: faker.address.city(),
  state: faker.address.state(),
});

factory.define("Category", models.CategoryModel, {
  name: faker.commerce.department(),
  parent_id: null,
});

factory.define("Product", models.ProductModel, {
  title: faker.commerce.productName(),
  description: faker.commerce.product(),
  price: faker.commerce.price(),
  quantity_stock: faker.random.number({ min: 10, max: 50 }),
  tangible: faker.random.boolean(),
  weight: "0," + String(Math.random() * 1000),
  length: faker.random.number({ min: 15, max: 30 }),
  height: faker.random.number({ min: 5, max: 30 }),
  width: faker.random.number({ min: 5, max: 30 }),
});

factory.define("Image", models.ImageModel, {
  url: faker.image.imageUrl(),
});

factory.define("Order", models.OrderModel, {
  freight_name: "pac",
  freight_price: faker.commerce.price(10, 99),
  payment_method: "credit_card",
  total_price: faker.commerce.price(),
  status: "paid",
});

factory.define("OrdersProducts", models.OrdersProductsModel, {
  quantity_buyed: faker.random.number({ min: 1, max: 5 }),
  product_price: faker.commerce.price(),
  product_discount_percent: faker.random.number({ min: 0, max: 15 }),
});

module.exports = factory;
