const supertest = require('supertest');

const truncate = require('../../../testUtils/truncate');
const factories = require('../../../testUtils/factories');
const app = require('../../../app');

describe('addressController Test Suit', () => {

    beforeEach( () => {
       
        return truncate();
    });

    it('should show all categories', async () => {

        for(let i = 0; i < 3; i++){
            
            await factories.create('Category', {
                name: 'a' + i
            });
        }

        const response = await supertest(app).get(`/categories`);
        
        expect(response.status).toBe(200);
        expect(response.body.length).toBe(3);
    });
});