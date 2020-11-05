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

    it('should erase an product on db', async () => {

        const user = await factories.create('User');
        user.admin = true;
        const token = user.generateToken();

        const category = await factories.create('Category');
        const product = await factories.create('Product', { category_id: category.id });

        const response = await supertest(app).delete(`/products/${product.id}`)
            .set('authorization', 'Bearer ' + token);

        expect(response.status).toBe(200);
    });
    
    it('should return code 400 for "product not found"', async () => {

        const user = await factories.create('User');
        user.admin = true;
        const token = user.generateToken();

        const response = await supertest(app).delete(`/products/50`)
            .set('authorization', 'Bearer ' + token);

        expect(response.status).toBe(400);
        expect(response.body.message).toBe("product not found");
    });
});