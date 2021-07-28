import supertest from 'supertest';

import app from '../../../app';

describe('installmentsController Test Suit', () => {

    it('should calc installments', async () => {

        const response = await supertest(app).post('/installments').send({
            amount: 149.90,
        });

        expect(response.status).toBe(200);
        expect(response.body.installments.length).toBe(response.body.maxInstallments);
    });
});