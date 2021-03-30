import supertest from 'supertest';

import typeormConnection from '../../../databases/typeorm/connection';
import sonicConnection from '../../../databases/sonic/connection';
import truncate from '../../../testUtils/truncateTypeorm';
import app from '../../../app';
import UserModel from '../../../models/UserModel';
import AddressModel from '../../../models/AddressModel';
import CategoryModel from '../../../models/CategoryModel';
import ProductModel from '../../../models/ProductModel';

const fakeUser = {
    name: "fake user",
    cpf: "61311682023",
    email: "fake@admin.com",
    password: "123456"
}

const fakeAddress = {
    street: 'rua lala',
    number: '11',
    neighborhood: 'bairro haha',
    city: 'kakanopolis',
    state: 'fp',
    zipcode: '73214596024'
}

const fakeCategory = {
    name: 'fake category',
}

const fakeProduct = {
    title: 'fake product',
    description: 'bla bla bla',
    html_body: '<p>vai</p>',
    price: "10.50",
    quantity_stock: 100,
    tangible: true,
    weight: "5",
    length: 15,
    height: 15,
    width: 15,
}

const credit_card = {
    "installments": 2,
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
            "neighborhood": "bairro haha",
            "city": "cordeirópolis",
            "state": "sp",
            "zipcode": "13490000",
            "country": "br",
        }
    },
    "shipping": {
        "name": "Jajau Lalau",
        "address": {
            "street": "rau lalau",
            "street_number": "55a",
            "neighborhood": "bairro haha",
            "city": "cordeirópolis",
            "state": "sp",
            "zipcode": "13490000",
            "country": "br",
        }
    },
};

const boleto = {
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
    "shipping": {
        "name": "Jajau Lalau",
        "address": {
            "street": "rau lalau",
            "street_number": "55a",
            "neighborhood": "bairro haha",
            "city": "cordeirópolis",
            "state": "sp",
            "zipcode": "13490000",
            "country": "br",
        }
    },
};

describe('orderController Store Test Suit', () => {

    beforeAll( () => {

        return typeormConnection;
    });

    beforeEach( () => {
              
        return truncate();
    });

    afterAll( async () => {

        await sonicConnection.search.close();
        await sonicConnection.ingest.close();

        return (await typeormConnection).close();
    });

    it('should add an order paid by credit_card', async () => {

        const user = UserModel.create(fakeUser);
        await user.save();
        const token = user.generateJwt();

        const address = AddressModel.create({ ...fakeAddress, user_id: user.id });
        await address.save();

        const category = CategoryModel.create(fakeCategory);
        await category.save();

        const product = ProductModel.create({ ...fakeProduct, category_id: category.id });
        await product.save();

        const response = await supertest(app).post(`/orders`)
            .set('authorization', 'Bearer ' + token)
            .send({
                freight_name: 'sedex',
                freight_price: 30.77,
                quantity_buyed: [2],
                products_id: [product.id],
                address_id: address.id,
                credit_card
            })
        ;

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('order');
        expect(response.body).toHaveProperty('pagarme');
    });

    it('should add an order paid by boleto', async () => {

        const user = UserModel.create(fakeUser);
        await user.save();
        const token = user.generateJwt();

        const address = AddressModel.create({ ...fakeAddress, user_id: user.id });
        await address.save();

        const category = CategoryModel.create(fakeCategory);
        await category.save();

        const product = ProductModel.create({ ...fakeProduct, category_id: category.id });
        await product.save();

        const response = await supertest(app).post(`/orders`)
            .set('authorization', 'Bearer ' + token)
            .send({
                freight_name: 'sedex',
                freight_price: 30.77,
                quantity_buyed: [2],
                products_id: [product.id],
                address_id: address.id,
                boleto
            })
        ;

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('order');
        expect(response.body).toHaveProperty('pagarme');
    });

    it('should return error for "user not found" - store', async () => {

        const user = UserModel.create(fakeUser);
        await user.save();
        const token = user.generateJwt();

        const address = AddressModel.create({ ...fakeAddress, user_id: user.id });
        await address.save();

        const category = CategoryModel.create(fakeCategory);
        await category.save();

        const product = ProductModel.create({ ...fakeProduct, category_id: category.id });
        await product.save();

        await user.softRemove();

        const response = await supertest(app).post(`/orders`)
            .set('authorization', 'Bearer ' + token)
            .send({
                freight_name: 'sedex',
                freight_price: 3077,
                quantity_buyed: [2],
                products_id: [product.id],
                address_id: address.id,
                credit_card
            })
        ;

        expect(response.status).toBe(404);
        expect(response.body.message).toBe("user not found");
    });

    it('should return erroe for "address not found" - store', async () => {

        const user = UserModel.create(fakeUser);
        await user.save();
        const token = user.generateJwt();

        const category = CategoryModel.create(fakeCategory);
        await category.save();

        const product = ProductModel.create({ ...fakeProduct, category_id: category.id });
        await product.save();

        const response = await supertest(app).post(`/orders`)
            .set('authorization', 'Bearer ' + token)
            .send({
                freight_name: 'sedex',
                freight_price: 3077,
                quantity_buyed: [2],
                products_id: [product.id],
                address_id: 11,
                credit_card
            })
        ;

        expect(response.status).toBe(404);
        expect(response.body.message).toBe("address not found");
    });

    it('should return error for "must have at least one product" - store', async () => {

        const user = UserModel.create(fakeUser);
        await user.save();
        const token = user.generateJwt();

        const address = AddressModel.create({ ...fakeAddress, user_id: user.id });
        await address.save();

        const response = await supertest(app).post(`/orders`)
            .set('authorization', 'Bearer ' + token)
            .send({
                freight_name: 'sedex',
                freight_price: 3077,
                quantity_buyed: [2],
                products_id: [],
                address_id: address.id,
                credit_card
            })
        ;

        expect(response.status).toBe(400);
        expect(response.body.message[0]).toBe("\"products_id\" does not contain 1 required value(s)");
    });

    it('should return error for "product id not found" - store', async () => {

        const user = UserModel.create(fakeUser);
        await user.save();
        const token = user.generateJwt();

        const address = AddressModel.create({ ...fakeAddress, user_id: user.id });
        await address.save();

        const response = await supertest(app).post(`/orders`)
            .set('authorization', 'Bearer ' + token)
            .send({
                freight_name: 'sedex',
                freight_price: 3077,
                quantity_buyed: [2],
                products_id: [15],
                address_id: address.id,
                credit_card
            })
        ;

        expect(response.status).toBe(400);
        expect(response.body.message).toBe("product id 15 not found");
    });

    it('should return error for "product dont have enough stock" - store', async () => {

        const user = UserModel.create(fakeUser);
        await user.save();
        const token = user.generateJwt();

        const address = AddressModel.create({ ...fakeAddress, user_id: user.id });
        await address.save();

        const category = CategoryModel.create(fakeCategory);
        await category.save();

        const product = ProductModel.create({ ...fakeProduct, category_id: category.id, quantity_stock: 2 });
        await product.save();

        const response = await supertest(app).post(`/orders`)
            .set('authorization', 'Bearer ' + token)
            .send({
                freight_name: 'sedex',
                freight_price: 3077,
                quantity_buyed: [5],
                products_id: [product.id],
                address_id: address.id,
                credit_card
            });

        expect(response.status).toBe(400);
        expect(response.body.message).toBe(`product id ${product.id} dont have enough stock`);
    });
});
