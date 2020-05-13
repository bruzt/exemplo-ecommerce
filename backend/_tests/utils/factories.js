const { factory } = require('factory-girl');
const faker = require('faker');

const autoRequireAll = require('../../src/util/autoRequireAll');

const models = autoRequireAll(__dirname, '../../src/models');

factory.define('User', models.UserModel, {
    name: faker.name.findName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    admin: true,
});

factory.define('Address', models.AddressModel, {
    zipcode: faker.address.zipCode(),
    street: faker.address.streetName(),
    number: faker.random.number(),
    district: faker.address.secondaryAddress(),
    city: faker.address.city(),
    state: faker.address.state()
});

factory.define('Category', models.CategoryModel, {
    name: faker.commerce.department(),
    parent: null
});

factory.define('Product', models.ProductModel, {
    name: faker.commerce.productName(),
    description: faker.commerce.product(),
    price: faker.commerce.price(),
    quantity_stock: faker.random.number({ min: 10, max: 50 }),
    discount_percent: faker.random.number(90)
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