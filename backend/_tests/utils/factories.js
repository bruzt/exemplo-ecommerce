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
    name: faker.commerce.product(),
    description: faker.commerce.productAdjective(),
    price: faker.commerce.price(),
    quantity: faker.random.number(),
    discount_percent: 0    
});

/*factory.define('Order', models.OrderModel, {
    total_price: faker.commerce.price(),
    description: faker.commerce.productAdjective(),
    price: faker.commerce.price(),
    quantity: faker.random.number(),
    discount_percent: 0    
});*/

module.exports = factory;