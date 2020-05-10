const supertest = require('supertest');

const truncate = require('../../utils/truncate');
const factories = require('../../utils/factories');
const app = require('../../../src/app');

describe('reportController Test Suit', () => {

    beforeEach( () => {
              
        return truncate();
    });

    it('should show all users, its addresses and, if have it, its techs', async () => {

        const user = await factories.create('User');

        await factories.create('Address', { user_id: user.id });
        await factories.create('Address', { user_id: user.id });
        
        const tech1 = await factories.create('Tech');
        const tech2 = await factories.create('Tech');
        const tech3 = await factories.create('Tech');

        await user.addTech(tech1);
        await user.addTech(tech2);
        await user.addTech(tech3);

        const response = await supertest(app).get('/report')
        .set(
            'authorization', `Bearer ${user.generateToken()}`
        ).send({
            email: '*',
            street: '*',
            tech: '*',
        });

        expect(response.status).toBe(200);
        expect(response.body[0].addresses.length).toBe(2);
        expect(response.body[0].techs.length).toBe(3);
    });

    it('should not allow access without JWT token', async () => {

        const response = await supertest(app).get('/report');
        
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty("error");
    });

    it('should not allow access if token is bad formatted', async () => {

        const user = await factories.create('User');

        const response = await supertest(app).get('/report').set(
            'authorization', user.generateToken()
        );
        
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty("error");
    });

    it('should not allow access if token is wrong', async () => {

        const response = await supertest(app).get('/report').set(
            'authorization', `Bearer re1se59rh9st1h91`
        );
        
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty("error");
    });

});