const supertest = require('supertest');

const truncate = require('../../../testUtils/truncate');
const factories = require('../../../testUtils/factories');
const app = require('../../../app');

describe('categoryController Store Test Suit', () => {

    beforeEach( () => {
       
        return truncate();
    });

    it('should add a category', async () => {

        const user = await factories.create('User');
        user.admin = true;
        const token = user.generateToken();

        const response = await supertest(app).post('/categories')
            .set('authorization', `Bearer ${token}`)
            .send({
                name: 'Eletronicos'
            });

        expect(response.status).toBe(200);
        expect(response.body.name).toBe('Eletronicos');
    });

    it('should add a category with a parent', async () => {

        const user = await factories.create('User');
        user.admin = true;
        const token = user.generateToken();
        const category = await factories.create('Category');

        const response = await supertest(app).post('/categories')
            .set('authorization', `Bearer ${token}`)
            .send({
                name: 'Eletronicos',
                parent_id: category.id
            });

        expect(response.status).toBe(200);
        expect(response.body.parent_id).toBe(category.id);
    });

    it('should return code 400 for "parent category id not found"', async () => {

        const user = await factories.create('User');
        user.admin = true;
        const token = user.generateToken();

        const response = await supertest(app).post('/categories')
            .set('authorization', `Bearer ${token}`)
            .send({
                name: 'Eletronicos',
                parent_id: 5
            });

        expect(response.status).toBe(400);
        expect(response.body.message).toBe('parent category id not found');
    });
});