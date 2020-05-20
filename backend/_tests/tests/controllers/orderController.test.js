const supertest = require('supertest');
const { promisify } = require('util');
const exec = promisify(require('child_process').exec);

//const truncate = require('../../utils/truncate');
const factories = require('../../utils/factories');
const app = require('../../../src/app');

const credit_card = {
    "amount": 2400,
    "card_number": "4111111111111111",
    "card_cvv": "546",
    "card_expiration_date": "1025",
    "card_holder_name": "Jajau Lalau",
    "customer": {
        "external_id": "1",
        "name": "Jajau Lalau",
        "email": "teste1@teste.com",
        "type": "individual",
        "country": "br",
        "phone_numbers": ["+5519999999999"],
        "documents": [
    {
      "type": "cpf",
      "number": "99999999999"
    }
  ]
    },
    "billing": {
        "name": "Jajau Lalau",
        "address": {
            "street": "rau lalau",
            "street_number": "55a",
            "zipcode": "13490000",
            "country": "br",
            "state": "sp",
            "city": "cordeirópolis"
        }
    },
    "shipping": {
        "name": "Jajau Lalau",
        "fee": 2000,
        "address": {
            "street": "rau lalau",
            "street_number": "55a",
            "zipcode": "13490000",
            "country": "br",
            "state": "sp",
            "city": "cordeirópolis"
        }
    },
    "items": [
        {
            "id": "5",
            "title": "placa pai",
            "unit_price": 1400,
            "quantity": 1,
            "tangible": true
        }
    ]
}

describe('orderController Test Suit', () => {

    beforeEach( async () => {
       
        await exec('sequelize db:migrate:undo:all');

        return exec('sequelize db:migrate');
        //return truncate();
    });

    it('should show all orders from authenticated user', async () => {

        const user = await factories.create('User');
        const address = await factories.create('Address', { user_id: user.id });
        
        const token = user.generateToken();

        for(let i = 0; i < 2; i++){

            await factories.create('Order', {
                user_id: user.id,
                address_id: address.id
            });
        }

        const response = await supertest(app).get(`/orders`)
            .set('authorization', 'Bearer ' + token);

        expect(response.status).toBe(200);
        expect(response.body.length).toBe(2);
    });

    it('should return code 400 for "user not found" - index', async () => {

        const user = await factories.create('User');
        const token = user.generateToken();
        await user.destroy();

        const response = await supertest(app).get(`/orders`)
            .set('authorization', 'Bearer ' + token);

        expect(response.status).toBe(400);
        expect(response.body.message).toBe('user not found');
    });

    it('should add an order', async () => {

        const user = await factories.create('User');
        const address = await factories.create('Address', { user_id: user.id });
        const category = await factories.create('Category');
        const product = await factories.create('Product', { category_id: category.id });
        const token = user.generateToken();

        const response = await supertest(app).post(`/orders`)
            .set('authorization', 'Bearer ' + token)
            .send({
                address_id: address.id,
                status: "awaiting payment",
                products_id: [product.id],
                quantity_buyed: [2],
                credit_card
            });

        expect(response.status).toBe(200);
        expect(response.body.user_id).toBe(user.id);
    });

    it('should return code 400 for "user not found" - store', async () => {

        const user = await factories.create('User');
        const token = user.generateToken();
        //const address = await factories.create('Address', { user_id: user.id });
        await user.destroy();
        const category = await factories.create('Category');
        const product = await factories.create('Product', { category_id: category.id });

        const response = await supertest(app).post(`/orders`)
            .set('authorization', 'Bearer ' + token)
            .send({
                address_id: 1,
                status: "awaiting payment",
                products_id: [product.id],
                quantity_buyed: [2],
                credit_card
            });

        expect(response.status).toBe(400);
        expect(response.body.message).toBe("user not found");
    });

    it('should return code 400 for "address not found" - store', async () => {

        const user = await factories.create('User');
        const token = user.generateToken();
        
        const category = await factories.create('Category');
        const product = await factories.create('Product', { category_id: category.id });

        const response = await supertest(app).post(`/orders`)
            .set('authorization', 'Bearer ' + token)
            .send({
                address_id: 1,
                status: "awaiting payment",
                products_id: [product.id],
                quantity_buyed: [2],
                credit_card
            });

        expect(response.status).toBe(400);
        expect(response.body.message).toBe("address not found");
    });

    it('should return code 400 for "must have at least one product"', async () => {

        const user = await factories.create('User');
        const address = await factories.create('Address', { user_id: user.id });
        const token = user.generateToken();

        const response = await supertest(app).post(`/orders`)
            .set('authorization', 'Bearer ' + token)
            .send({
                address_id: address.id,
                status: "awaiting payment",
                products_id: [],
                quantity_buyed: [2],
                credit_card
            });

        expect(response.status).toBe(400);
        expect(response.body.message).toBe("\"products_id\" does not contain 1 required value(s)");
    });

    it('should return code 400 for "product id not found" - store', async () => {

        const user = await factories.create('User');
        const token = user.generateToken();
        const address = await factories.create('Address', { user_id: user.id });

        const response = await supertest(app).post(`/orders`)
            .set('authorization', 'Bearer ' + token)
            .send({
                address_id: address.id,
                status: "awaiting payment",
                products_id: [1],
                quantity_buyed: [2],
                credit_card
            });

        expect(response.status).toBe(400);
        expect(response.body.message).toBe("product id 1 not found");
    });

    it('should return code 400 for "product id not found" - store', async () => {

        const user = await factories.create('User');
        const token = user.generateToken();
        const address = await factories.create('Address', { user_id: user.id });

        const category = await factories.create('Category');
        const product = await factories.create('Product', { category_id: category.id, quantity_stock: 2 });

        const response = await supertest(app).post(`/orders`)
            .set('authorization', 'Bearer ' + token)
            .send({
                address_id: address.id,
                status: "awaiting payment",
                products_id: [1],
                quantity_buyed: [5],
                credit_card
            });

        expect(response.status).toBe(400);
        expect(response.body.message).toBe(`product id ${product.id} dont have enough stock`);
    });

    it('should update an order', async () => {

        const user = await factories.create('User');
        const address = await factories.create('Address', { user_id: user.id });
        const category = await factories.create('Category');
        const product = await factories.create('Product', { category_id: category.id });
        const order = await factories.create('Order', { 
            user_id: user.id, 
            address_id: address.id, 
            products_id: [product.id]  
        });

        user.admin = true;
        const token = user.generateToken();

        const response = await supertest(app).put(`/orders/${order.id}`)
            .set('authorization', 'Bearer ' + token)
            .send({ status: "payment confirmed" });

        expect(response.status).toBe(200);
    });
    
    it('should return code 400 for "no update has been made"', async () => {

        const user = await factories.create('User');
        user.admin = true;
        const token = user.generateToken();

        const response = await supertest(app).put(`/orders/1`)
            .set('authorization', 'Bearer ' + token)
            .send({ status: "payment confirmed" });

        expect(response.status).toBe(400);
        expect(response.body.message).toBe("no update has been made");
    });

    it('should erase an order', async () => {

        const user = await factories.create('User');
        const address = await factories.create('Address', { user_id: user.id });
        const category = await factories.create('Category');
        const product = await factories.create('Product', { category_id: category.id });
        const order = await factories.create('Order', { 
            user_id: user.id, 
            address_id: address.id, 
            products_id: [product.id]  
        });

        user.admin = true;
        const token = user.generateToken();

        const response = await supertest(app).delete(`/orders/${order.id}`)
            .set('authorization', 'Bearer ' + token)
    
        expect(response.status).toBe(200);
    });

    it('should return code 400 for "order not found"', async () => {

        const user = await factories.create('User');
        user.admin = true;
        const token = user.generateToken();

        const response = await supertest(app).delete(`/orders/5`)
            .set('authorization', 'Bearer ' + token)
    
        expect(response.status).toBe(400);
        expect(response.body.message).toBe("order not found");
    });
});