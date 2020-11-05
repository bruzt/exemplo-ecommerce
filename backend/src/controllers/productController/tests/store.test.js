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

    it('should store an product on db', async () => {

        const user = await factories.create('User');
        user.admin = true;
        const token = user.generateToken();

        const category = await factories.create('Category');

        const response = await supertest(app).post(`/products`)
            .set('authorization', 'Bearer ' + token)
            .send({
                category_id: category.id,
                title: 'prod test',
                description: 'llalal lal lal al alala',
                price: 1.99,
                quantity_stock: 0,
                tangible: true,
                weight: "0,500",
                length: 15,
                height: 15,
                width: 15,
            });

        expect(response.status).toBe(200);
        expect(response.body.title).toBe('prod test');
    });

    it('should return code 400 for "category not found"', async () => {

        const user = await factories.create('User');
        user.admin = true;
        const token = user.generateToken();

        const response = await supertest(app).post(`/products`)
            .set('authorization', 'Bearer ' + token)
            .send({
                category_id: 10,
                title: 'prod test',
                description: 'llalal lal lal al alala',
                price: 1.99,
                quantity_stock: 0,
                tangible: true,
                weight: "0,500",
                length: 15,
                height: 15,
                width: 15,
            });

        expect(response.status).toBe(400);
        expect(response.body.message).toBe('category not found');
    });
});