const supertest = require('supertest');

const app = require('../../../app');

describe('freightController Test Suit', () => {

    it('should show pac and sedex freight', async () => {

        const response = await supertest(app).post(`/freight`)
            .send({
                destZipCode: "13491150",
                weight: "0,300",
                length: 10,
                height: 10,
                width: 10,
            });
        
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("pac");
        expect(response.body).toHaveProperty("sedex");
    });
});