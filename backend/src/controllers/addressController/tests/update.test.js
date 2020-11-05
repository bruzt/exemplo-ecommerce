const supertest = require('supertest');

const truncate = require('../../../testUtils/truncate');
const factories = require('../../../testUtils/factories');
const app = require('../../../app');

describe('addressController Test Suit', () => {

    beforeEach( () => {
       
        return truncate();
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
                street: 'rua test',
                zipcode: '16516565151',
                number: '96494988958',
                neighborhood: 'ggwegweg',
                city: 'afafsaf asf',
                state: 'faasasf sa'
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
        expect(response.body.message).toBe("user not found");
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
        expect(response.body.message).toBe("address not found");
    });
});