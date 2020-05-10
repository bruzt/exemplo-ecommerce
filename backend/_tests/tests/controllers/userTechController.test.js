const supertest = require('supertest');

const truncate = require('../../utils/truncate');
const factories = require('../../utils/factories');
const app = require('../../../src/app');

describe('userTechController Test Suit', () => {

    beforeEach( () => {
       
        return truncate();
    });

    it('should show all techs from an user', async () => {

        const user = await factories.create('User');
        const token = user.generateToken();

        const tech1 = await factories.create('Tech');
        const tech2 = await factories.create('Tech');

        await user.addTech(tech1);
        await user.addTech(tech2);
        
        const response = await supertest(app).get(`/users-techs`)
        .set('authorization', 'Bearer ' + token);

        expect(response.status).toBe(200);
        expect(response.body.length).toBe(2);
    });

    it('should return code 400 for  "authorization is required" - index', async () => {
        
        const response = await supertest(app).get(`/users-techs`);

        expect(response.status).toBe(400);
        expect(response.body.validation.keys[0]).toBe("authorization");
    });

    it('should return code 400 for "user not found" - index', async () => {

        const user = await factories.create('User');
        const token = user.generateToken();
        await user.destroy({ where: { id: user.id }});
        
        const response = await supertest(app).get(`/users-techs`)
        .set('authorization', 'Bearer ' + token);

        expect(response.status).toBe(400);
        expect(response.body.error).toBe("user not found");
    });

    it('should link a tech to an user', async () => {

        const user = await factories.create('User');
        const token = user.generateToken();
        const tech = await factories.create('Tech');
        
        const response = await supertest(app).post(`/users-techs/${tech.id}`)
        .set('authorization', 'Bearer ' + token);
    
        expect(response.status).toBe(200);
    });

    it('should return code 400 for "id must be a number" - store', async () => {
        
        const user = await factories.create('User');
        const token = user.generateToken();

        const response = await supertest(app).post(`/users-techs/j`)
        .set('authorization', 'Bearer ' + token);

        expect(response.status).toBe(400);
        expect(response.body.validation.source).toBe("params");
        expect(response.body.validation.keys[0]).toBe("id");
    });

    it('should return code 400 for "user not found" - store', async () => {

        const user = await factories.create('User');
        const token = user.generateToken();
        await user.destroy({ where: { id: user.id }});
        
        const response = await supertest(app).post(`/users-techs/2`)
        .set('authorization', 'Bearer ' + token);

        expect(response.status).toBe(400);
        expect(response.body.error).toBe("user not found");
    });

    it('should return code 400 for "tech not found" - store', async () => {

        const user = await factories.create('User');
        const token = user.generateToken();
        
        const response = await supertest(app).post(`/users-techs/2`)
        .set('authorization', 'Bearer ' + token);

        expect(response.status).toBe(400);
        expect(response.body.error).toBe("tech not found");
    });

    it('should unlink a tech of an user', async () => {

        const user = await factories.create('User');
        const token = user.generateToken();
        const tech = await factories.create('Tech');

        await user.addTech(tech);

        const response = await supertest(app).delete(`/users-techs/${tech.id}`)
        .set('authorization', 'Bearer ' + token);

        expect(response.status).toBe(200);
    });

    it('should return code 400 for "id must be a number" - delete', async () => {
        
        const user = await factories.create('User');
        const token = user.generateToken();

        const response = await supertest(app).delete(`/users-techs/j`)
        .set('authorization', 'Bearer ' + token);

        expect(response.status).toBe(400);
        expect(response.body.validation.source).toBe("params");
        expect(response.body.validation.keys[0]).toBe("id");
    });

    it('should return code 400 for "user not found" - delete', async () => {

        const user = await factories.create('User');
        const token = user.generateToken();
        await user.destroy({ where: { id: user.id }});

        const response = await supertest(app).delete(`/users-techs/2`)
        .set('authorization', 'Bearer ' + token);

        expect(response.status).toBe(400);
    });

    it('should return code 400 for "tech not found" - delete', async () => {

        const user = await factories.create('User');
        const token = user.generateToken();

        const response = await supertest(app).delete(`/users-techs/2`)
        .set('authorization', 'Bearer ' + token);

        expect(response.status).toBe(400);
        expect(response.body.error).toBe("tech not found");
    });
});