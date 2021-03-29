import supertest from 'supertest';

import typeormConnection from '../../../databases/typeorm/connection';
import sonicConnection from '../../../databases/sonic/connection';
import app from '../../../app';

describe('freightController Store Test Suit', () => {

    afterAll( async () => {

        await sonicConnection.search.close();
        await sonicConnection.ingest.close();

        return (await typeormConnection).close();
    });

    it('should show pac and sedex freight', async () => {

        const response = await supertest(app).post(`/freight`)
            .send({
                destZipCode: "13490000",
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
