const { factory } = require('factory-girl');
const faker = require('faker');

const autoRequireAll = require('../../src/util/autoRequireAll');

const models = autoRequireAll(__dirname, '../../src/models');

factory.define('User', models.UserModel, {
    name: faker.name.findName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
});

factory.define('Address', models.AddressModel, {
    zipcode: faker.address.zipCode(),
    street: faker.address.streetName(),
    number: faker.random.number(),
    neighborhood: faker.address.secondaryAddress(),
    city: faker.address.city(),
    state: faker.address.state()
});

factory.define('Category', models.CategoryModel, {
    name: faker.commerce.department(),
    parent: null
});

factory.define('Product', models.ProductModel, {
    title: faker.commerce.productName(),
    description: faker.commerce.product(),
    price: faker.commerce.price(),
    quantity_stock: faker.random.number({ min: 10, max: 50 }),
    discount_percent: faker.random.number(90),
    tangible: faker.random.boolean(),
    weight: "0," + String(Math.random() * 1000),
    length: faker.random.number({ min: 15, max: 30 }),
    height: faker.random.number({ min: 5, max: 30 }),
    width: faker.random.number({ min: 5, max: 30 }),
});

factory.define('Image', models.ImageModel, {
    url: faker.image.imageUrl(),
});

factory.define('Order', models.OrderModel, {
    total_price: faker.commerce.price(),
    status: faker.commerce.color(), 
});

factory.define('OrdersProducts', models.OrdersProductsModel, {
    total_price: faker.commerce.price(),
    status: faker.commerce.color(), 
});

module.exports = factory;