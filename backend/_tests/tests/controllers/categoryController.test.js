const supertest = require('supertest');

const truncate = require('../../utils/truncate');
const factories = require('../../utils/factories');
const app = require('../../../src/app');

describe('categoryController Test Suit', () => {

    beforeEach( () => {
       
        return truncate();
    });

    it('should show all categories', async () => {

        for(let i = 0; i < 3; i++){
            
            await factories.create('Category');
        }

        const response = await supertest(app).get(`/categories`);
        
        expect(response.status).toBe(200);
        expect(response.body.length).toBe(3);
    });

    it('should add a category', async () => {

        const user = await factories.create('User');
        user.admin = true;
        const token = user.generateToken();

        const response = await supertest(app).post('/categories')
        .set('authorization', `Bearer ${token}`)
        .send({
            name: 'Eletronicos'
        })

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
            parent: category.id
        })

        expect(response.status).toBe(200);
        expect(response.body.parent).toBe(category.id);
    });

    it('should return code 400 for "parent category id not found"', async () => {

        const user = await factories.create('User');
        user.admin = true;
        const token = user.generateToken();

        const response = await supertest(app).post('/categories')
        .set('authorization', `Bearer ${token}`)
        .send({
            name: 'Eletronicos',
            parent: 5
        })

        expect(response.status).toBe(400);
        expect(response.body.message).toBe('parent category id not found');
    });

    it('should update a category', async () => {

        const user = await factories.create('User');
        user.admin = true;
        const token = user.generateToken();
        const category = await factories.create('Category');

        const response = await supertest(app).put(`/categories/${category.id}`)
        .set('authorization', `Bearer ${token}`)
        .send({
            name: 'Jogos'
        })

        expect(response.status).toBe(200);
    });

    it('should return code 400 for "no update has been made"', async () => {

        const user = await factories.create('User');
        user.admin = true;
        const token = user.generateToken();
        const category = await factories.create('Category');

        const response = await supertest(app).put(`/categories/${category.id}`)
        .set('authorization', `Bearer ${token}`);

        expect(response.status).toBe(400);
        expect(response.body.message).toBe('no update has been made');
    });

});