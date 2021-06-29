const supertest = require('supertest');
const { promisify } = require('util');
const exec = promisify(require('child_process').exec);

const factories = require('../../../testUtils/factories');
const app = require('../../../app');

describe('productController Test Suit', () => {

    beforeEach( async () => {

        await exec('sequelize db:migrate:undo:all');

        return exec('sequelize db:migrate');
    
        //return truncate();
    });

    it('should update an product on db', async () => {

        const user = await factories.create('User');
        user.admin = true;
        const token = user.generateToken();

        const category1 = await factories.create('Category');
        const category2 = await factories.create('Category', { name: 'testee' });
        const product = await factories.create('Product', { category_id: category1.id });

        const response = await supertest(app).put(`/products/${product.id}`)
            .set('authorization', 'Bearer ' + token)
            .send({
                title: 'prod teste 2',
                description: 'teste desc',
                html_body: '<h1>teste html</h1>',
                price: 10.99,
                quantity_stock: 3,
                category_id: category2.id,
                discount_percent: 20,
                tangible: true,
                weight: "1",
                length: 30,
                height: 15,
                width: 10,
            })
        ;

        expect(response.status).toBe(200);
    });

    it('should return code 400 for "no update has been made"', async () => {

        const user = await factories.create('User');
        user.admin = true;
        const token = user.generateToken();

        const response = await supertest(app).put(`/products/33`)
            .set('authorization', 'Bearer ' + token)
            .send({
                title: "xablau"
            });

        expect(response.status).toBe(400);
        expect(response.body.message).toBe('no update has been made');
    });
});