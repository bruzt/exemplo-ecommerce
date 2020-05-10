const supertest = require('supertest');

const truncate = require('../../utils/truncate');
const factories = require('../../utils/factories');
const app = require('../../../src/app');

describe('addressController Test Suit', () => {

    beforeEach( () => {
       
        return truncate();
    });

    it('should show all address of a user', async () => {

        const user = await factories.create('User');
        const token = user.generateToken();
        
        await factories.create('Address', {
            user_id: user.id
        });

        const response = await supertest(app).get(`/addresses`)
        .set('authorization', 'Bearer ' + token);
        
        expect(response.status).toBe(200);
        expect(response.body[0].user_id).toBe(user.id);
    });

    it('should return code 400 for "authorization is required" - index', async () => {

        const response = await supertest(app).get(`/addresses`)
        
        expect(response.status).toBe(400);
        expect(response.body.validation.keys[0]).toBe("authorization");
    });

    it('should return code 400 for "user not found" - index', async () => {

        const user = await factories.create('User');
        const token = user.generateToken();
        await user.destroy({ where: { id: user.id }});
        
        const response = await supertest(app).get(`/addresses`)
        .set('authorization', 'Bearer ' + token);

        expect(response.status).toBe(400);
        expect(response.body.error).toBe("user not found");
    });

    it('should add a address to an user', async () => {

        const user = await factories.create('User');
        const token = user.generateToken();
        
        const response = await supertest(app).post(`/addresses`)
        .set('authorization', 'Bearer ' + token)
        .send({
            zipcode: '21119624',
            street: 'rua tal do tal',
            number: '15'
        });

        expect(response.status).toBe(200);
        expect(parseInt(response.body.user_id)).toBe(user.id);
    });

    it('should return code 400 for "authorization is required" - store', async () => {
        
        const response = await supertest(app).post(`/addresses`)
        .send({
            zipcode: '21119624',
            street: 'rua tal do tal',
            number: '15'
        });

        expect(response.status).toBe(400);
        expect(response.body.validation.keys[0]).toBe("authorization");
    });

    it('should return code 400 for "user not found" - store', async () => {

        const user = await factories.create('User');
        const token = user.generateToken();
        await user.destroy({ where: { id: user.id }});
        
        const response = await supertest(app).post(`/addresses`)
        .set('authorization', 'Bearer ' + token)
        .send({
            zipcode: "447484",
            street: "hahaha ha",
            number: "55"
        });

        expect(response.status).toBe(400);
        expect(response.body.error).toBe("user not found");
    });

    it('should update a address', async () => {

        const user = await factories.create('User');
        const token = user.generateToken();

        const userAddr = await factories.create('Address', {
            user_id: user.id
        });

        const response = await supertest(app).put(`/addresses/${userAddr.id}`)
        .set('authorization', 'Bearer ' + token)
        .send({
            street: 'rua test'
        });

        expect(response.status).toBe(200);
    });

    it('should return code 400 for "authorization is required" - update', async () => {

        const response = await supertest(app).put(`/addresses/5`)
        .send({
            street: 'rua test'
        });

        expect(response.status).toBe(400);
        expect(response.body.validation.keys[0]).toBe("authorization");
    });

    it('should return code 400 for "user not found" - update', async () => {

        const user = await factories.create('User');
        const token = user.generateToken();
        await user.destroy({ where: { id: user.id }});
        
        const response = await supertest(app).put(`/addresses/2`)
        .set('authorization', 'Bearer ' + token)
        .send({
            number: "55"
        });

        expect(response.status).toBe(400);
        expect(response.body.error).toBe("user not found");
    });

    it('should return code 400 for "address not found" - update', async () => {

        const user = await factories.create('User');
        const token = user.generateToken();

        const response = await supertest(app).put(`/addresses/5`)
        .set('authorization', 'Bearer ' + token)
        .send({
            street: 'rua test'
        });

        expect(response.status).toBe(400);
        expect(response.body.error).toBe("address not found");
    });

    it('should erase a address from a user', async () => {

        const user = await factories.create('User');
        const token = user.generateToken();

        const userAddr = await factories.create('Address', {
            user_id: user.id
        });

        const response = await supertest(app).delete(`/addresses/${userAddr.id}`)
        .set('authorization', 'Bearer ' + token);
        
        expect(response.status).toBe(200);
    });

    it('should return code 400 for "authorization is required" - destroy', async () => {

        const response = await supertest(app).delete(`/addresses/1`);
        
        expect(response.status).toBe(400);
        expect(response.body.validation.keys[0]).toBe("authorization");
    });

    it('should return code 400 for "user not found" - destroy', async () => {

        const user = await factories.create('User');
        const token = user.generateToken();
        await user.destroy({ where: { id: user.id }});
        
        const response = await supertest(app).delete(`/addresses/2`)
        .set('authorization', 'Bearer ' + token);

        expect(response.status).toBe(400);
        expect(response.body.error).toBe("user not found");
    });

    it('should return code 400 for "address not found" - delete', async () => {

        const user = await factories.create('User');
        const token = user.generateToken();

        const response = await supertest(app).delete(`/addresses/2`)
        .set('authorization', 'Bearer ' + token);
        
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty("error");
    });
});