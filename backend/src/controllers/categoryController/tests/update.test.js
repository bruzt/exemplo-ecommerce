const supertest = require('supertest');

const truncate = require('../../../testUtils/truncate');
const factories = require('../../../testUtils/factories');
const app = require('../../../app');

describe('categoryController Update Test Suit', () => {

    beforeEach( () => {
       
        return truncate();
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

        const response = await supertest(app).put(`/categories/44`)
            .set('authorization', `Bearer ${token}`)
            .send({
                name: 'testecat'
            });

        expect(response.status).toBe(400);
        expect(response.body.message).toBe('no update has been made');
    });
});