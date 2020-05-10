const supertest = require('supertest');

const truncate = require('../../utils/truncate');
const factories = require('../../utils/factories');
const app = require('../../../src/app');

describe('userTechController Test Suit', () => {

    beforeEach( () => {
       
        return truncate();
    });

    it('should show all techs', async () => {

        const response = await supertest(app).get('/techs');

        expect(response.status).toBe(200);
    });

    it('should show a specific tech', async () => {

        const tech = await factories.create('Tech');

        const response = await supertest(app).get(`/techs/${tech.id}`);

        expect(response.status).toBe(200);
        expect(response.body.id).toBe(tech.id);
    });

    it('should return code 400 for "tech not found"', async () => {

        const response = await supertest(app).get(`/techs/1`);

        expect(response.status).toBe(400);
        expect(response.body.error  ).toBe('tech not found');
    });

    it('should create a new tech', async () => {

        const user = await factories.create('User');
        user.access_level = 2;
        const token = user.generateToken();

        const response = await supertest(app).post(`/techs`)
        .set('authorization', 'Bearer ' + token)
        .send({
            name: 'test'
        });

        expect(response.status).toBe(200);
        expect(response.body.name).toBe('test');
    });

    it('should not create a new tech for "user not allowed" - store', async () => {

        const user = await factories.create('User');
        const token = user.generateToken();

        const response = await supertest(app).post(`/techs`)
        .set('authorization', 'Bearer ' + token)
        .send({
            name: 'test'
        });

        expect(response.status).toBe(400);
        expect(response.body.error).toBe('user not allowed');
    });

    it('should update a tech', async () => {

        const user = await factories.create('User');
        user.access_level = 2;
        const token = user.generateToken();

        const tech = await factories.create('Tech');

        const response = await supertest(app).put(`/techs/${tech.id}`)
        .set('authorization', 'Bearer ' + token)
        .send({
            name: 'test'
        });

        expect(response.status).toBe(200);
    });

    it('should not create a new tech for "user not allowed" - update', async () => {

        const user = await factories.create('User');
        const token = user.generateToken();

        const response = await supertest(app).put(`/techs/3`)
        .set('authorization', 'Bearer ' + token)
        .send({
            name: 'test'
        });

        expect(response.status).toBe(400);
        expect(response.body.error).toBe('user not allowed');
    });

    it('should return code 400 for "tech not found" - update', async () => {

        const user = await factories.create('User');
        user.access_level = 2;
        const token = user.generateToken();

        const response = await supertest(app).put(`/techs/6`)
        .set('authorization', 'Bearer ' + token)
        .send({
            name: 'test'
        });

        expect(response.status).toBe(400);
        expect(response.body.error).toBe("tech not found");
    });

    it('should delete a tech', async () => {

        const user = await factories.create('User');
        user.access_level = 2;
        const token = user.generateToken();

        const tech = await factories.create('Tech');

        const response = await supertest(app).delete(`/techs/${tech.id}`)
        .set('authorization', 'Bearer ' + token);

        expect(response.status).toBe(200);
    });

    it('should not create a new tech for "user not allowed" - destroy', async () => {

        const user = await factories.create('User');
        const token = user.generateToken();

        const response = await supertest(app).delete(`/techs/3`)
        .set('authorization', 'Bearer ' + token)
        .send({
            name: 'test'
        });

        expect(response.status).toBe(400);
        expect(response.body.error).toBe('user not allowed');
    });

    it('should return code 400 for "tech not found" - delete', async () => {

        const user = await factories.create('User');
        user.access_level = 2;
        const token = user.generateToken();

        const response = await supertest(app).delete(`/techs/6`)
        .set('authorization', 'Bearer ' + token);

        expect(response.status).toBe(400);
        expect(response.body.error).toBe("tech not found");
    });
});