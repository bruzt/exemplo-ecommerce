const supertest = require('supertest');

const truncate = require('../../utils/truncate');
const factories = require('../../utils/factories');
const app = require('../../../src/app');
const UserModel = require('../../../src/models/UserModel');

describe('userController Test Suit', () => {

    beforeEach( () => {
              
        return truncate();
    });

    it('should show all users on db', async () => {

        for(let i=0; i < 3; i++){

            await factories.create('User', {
                email: `email${i}@teste.com`
            });
        }

        const response = await supertest(app).get('/users')
        
        expect(response.status).toBe(200);
        expect(Object.keys(response.body).length).toBe(3);
    });

    it('should show a specific user on db', async () => {

        const user = await factories.create('User');
        
        const response = await supertest(app).get(`/users/${user.id}`);

        expect(response.status).toBe(200);
        expect(user.id).toBe(response.body.id);
    });

    it('should return code 400 for "user not found" - show', async () => {
        
        const response = await supertest(app).get(`/users/22`);

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty("error");
    });

    it('should return code 400 for "id must be a number" - show', async () => {
        
        const response = await supertest(app).get(`/users/j`);

        expect(response.status).toBe(400);
        expect(response.body.validation.keys[0]).toBe("id");
    });

    it('should add a user on db', async () => {

        const response = await supertest(app).post('/users').send({
            name: 'teste',
            email: 'teste@teste.com',
            password: 'bla123'
        });

        expect(response.status).toBe(200);
        expect(response.body.name).toBe('teste');
    });

    it('should not add a user with same email on db', async () => {

        await factories.create('User', {
            email: 'teste@teste.com'
        })

        const response = await supertest(app).post('/users').send({
            name: 'teste',
            email: 'teste@teste.com',
            password: 'bla123'
        });

        expect(response.status).toBe(400);
        expect(response.body.error).toBe('email already in use');
    });

    it('should update a user on db', async () => {

        const user = await factories.create('User');
        const token = user.generateToken();

        const response = await supertest(app).put('/users')
        .set('authorization', 'Bearer ' + token)
        .send({
            name: 'test'
        });
        
        expect(response.status).toBe(200);
    });

    it('should return code 400 for "user not found" - update', async () => {

        const user = await factories.create('User');
        const token = user.generateToken();
        await user.destroy({ where: { id: user.id }});

        const response = await supertest(app).put('/users')
        .set('authorization', 'Bearer ' + token)
        .send({
            name: 'test'
        });
        
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty("error");
    });

    it('should erase a user from db', async () => {

        const user = await factories.create('User');
        const token = user.generateToken();

        const response = await supertest(app).delete('/users')
        .set('authorization', 'Bearer ' + token);
        
        expect(response.status).toBe(200);
    });

    it('should return code 400 for "user not found" - delete', async () => {

        const user = await factories.create('User');
        const token = user.generateToken();
        await user.destroy({ where: { id: user.id }});

        const response = await supertest(app).delete('/users')
        .set('authorization', 'Bearer ' + token);
        
        expect(response.status).toBe(400);
    });
});